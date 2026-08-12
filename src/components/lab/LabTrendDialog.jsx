import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  getSortedHistory, getEntryStatus, getTrend, isNoteEntry, statusConfig,
} from "@/lib/labTests";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("lt-LT", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function LabTrendDialog({ test, open, onOpenChange }) {
  if (!test) return null;
  const history = getSortedHistory(test);
  const numeric = history.filter((h) => h.value != null);
  const chartData = numeric.map((h) => ({ date: formatDate(h.date), value: h.value }));
  const trend = getTrend(test);
  const TrendIcon = trend.direction === "stable" ? Minus : trend.delta > 0 ? TrendingUp : TrendingDown;
  const trendColor =
    trend.direction === "improving" ? "text-emerald-500"
    : trend.direction === "worsening" ? "text-rose-500"
    : "text-slate-400";
  const trendLabel =
    trend.direction === "improving" ? "Gerėja"
    : trend.direction === "worsening" ? "Blogėja"
    : "Stabili";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-slate-800">{test.name} – pokyčių eiga</DialogTitle>
          <DialogDescription>
            {test.direction && test.direction !== "info"
              ? `Norma: ${test.refLabel}${test.unit ? " " + test.unit : ""} • `
              : "Informacinis rodiklis • "}
            {history.length} įrašų
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 mb-2">
          <Badge className={statusConfig[getEntryStatus(test, history[history.length - 1])].color}>
            {statusConfig[getEntryStatus(test, history[history.length - 1])].label}
          </Badge>
          {trend.hasData && (
            <div className="flex items-center gap-1 text-sm">
              <TrendIcon className={`w-4 h-4 ${trendColor}`} />
              <span className={trendColor}>{trendLabel}</span>
              {Math.abs(trend.delta) >= 0.01 && (
                <span className="text-slate-400">
                  ({trend.delta > 0 ? "+" : ""}{trend.delta.toFixed(2)} {test.unit || ""})
                </span>
              )}
            </div>
          )}
        </div>

        {chartData.length > 1 ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 15, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                  formatter={(v) => [`${v} ${test.unit || ""}`, test.name]}
                />
                {test.direction === "range" ? (
                  <>
                    <ReferenceLine y={test.refLow} stroke="#10b981" strokeDasharray="4 4" label={{ value: `min ${test.refLow}`, fontSize: 10, fill: "#10b981", position: "insideBottomLeft" }} />
                    <ReferenceLine y={test.refHigh} stroke="#10b981" strokeDasharray="4 4" label={{ value: `max ${test.refHigh}`, fontSize: 10, fill: "#10b981", position: "insideTopRight" }} />
                  </>
                ) : test.direction === "lower" ? (
                  <ReferenceLine y={test.refHigh} stroke="#10b981" strokeDasharray="4 4" label={{ value: `norma ${test.refLabel}`, fontSize: 10, fill: "#10b981", position: "insideTopRight" }} />
                ) : test.direction === "higher" ? (
                  <ReferenceLine y={test.refLow} stroke="#10b981" strokeDasharray="4 4" label={{ value: `norma ${test.refLabel}`, fontSize: 10, fill: "#10b981", position: "insideBottomRight" }} />
                ) : null}
                <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl">
            {chartData.length === 1 ? "Tendencijai reikia bent 2 matavimų — pridėkite naują matavimą." : "Nėra skaitinių matavimų."}
          </div>
        )}

        {/* History table */}
        <div className="mt-2">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Matavimų istorija</h4>
          <div className="rounded-xl border border-slate-100 overflow-hidden max-h-60 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs sticky top-0">
                <tr>
                  <th className="text-left font-medium px-4 py-2">Data</th>
                  <th className="text-right font-medium px-4 py-2">Reikšmė</th>
                  <th className="text-right font-medium px-4 py-2">Pokytis</th>
                  <th className="text-right font-medium px-4 py-2">Statusas</th>
                </tr>
              </thead>
              <tbody>
                {history.slice().reverse().map((h, i, arr) => {
                  const note = isNoteEntry(h);
                  const prev = arr[i + 1];
                  const delta = !note && prev && !isNoteEntry(prev) ? h.value - prev.value : null;
                  const status = getEntryStatus(test, h);
                  return (
                    <tr key={i} className="border-t border-slate-50">
                      <td className="px-4 py-2 text-slate-700">{formatDate(h.date)}</td>
                      <td className="px-4 py-2 text-right font-medium text-slate-800">
                        {note ? (h.note || "—") : <>{h.value} <span className="text-slate-400 text-xs">{test.unit}</span></>}
                      </td>
                      <td className="px-4 py-2 text-right text-slate-500">
                        {delta == null ? "—" : (
                          <span className={Math.abs(delta) < 0.05 ? "text-slate-400" : delta > 0 ? "text-rose-500" : "text-emerald-500"}>
                            {delta > 0 ? "+" : ""}{delta.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Badge className={statusConfig[status].color}>{statusConfig[status].label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}