import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getSortedHistory, getStatus, getTrend, statusConfig } from "@/lib/labTests";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("lt-LT", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function LabTrendDialog({ test, open, onOpenChange }) {
  if (!test) return null;
  const history = getSortedHistory(test);
  const chartData = history.map((h) => ({ date: formatDate(h.date), value: h.value }));
  const trend = getTrend(test);
  const TrendIcon = trend.direction === "stable" ? Minus : trend.delta > 0 ? TrendingUp : TrendingDown;
  const trendColor =
    trend.direction === "improving"
      ? "text-emerald-500"
      : trend.direction === "worsening"
      ? "text-rose-500"
      : "text-slate-400";
  const trendLabel =
    trend.direction === "improving" ? "Gerėja" : trend.direction === "worsening" ? "Blogėja" : "Stabili";
  const refLine = test.direction === "lower" ? test.refHigh : test.refLow;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-slate-800">{test.name} – pokyčių eiga</DialogTitle>
          <DialogDescription>
            Norma: {test.refLabel} {test.unit} • {history.length} matavimų
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 mb-2">
          <Badge className={statusConfig[getStatus(test, history[history.length - 1]?.value)].color}>
            {statusConfig[getStatus(test, history[history.length - 1]?.value)].label}
          </Badge>
          {trend.hasData && (
            <div className="flex items-center gap-1 text-sm">
              <TrendIcon className={`w-4 h-4 ${trendColor}`} />
              <span className={trendColor}>{trendLabel}</span>
              {Math.abs(trend.delta) >= 0.01 && (
                <span className="text-slate-400">
                  ({trend.delta > 0 ? "+" : ""}{trend.delta.toFixed(2)} {test.unit})
                </span>
              )}
            </div>
          )}
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 15, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                formatter={(v) => [`${v} ${test.unit}`, test.name]}
              />
              <ReferenceLine
                y={refLine}
                stroke="#10b981"
                strokeDasharray="4 4"
                label={{ value: `Norma ${test.refLabel}`, fontSize: 10, fill: "#10b981", position: "insideTopRight" }}
              />
              <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* History table */}
        <div className="mt-2">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Matavimų istorija</h4>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs">
                <tr>
                  <th className="text-left font-medium px-4 py-2">Data</th>
                  <th className="text-right font-medium px-4 py-2">Reikšmė</th>
                  <th className="text-right font-medium px-4 py-2">Pokytis</th>
                  <th className="text-right font-medium px-4 py-2">Statusas</th>
                </tr>
              </thead>
              <tbody>
                {history
                  .slice()
                  .reverse()
                  .map((h, i, arr) => {
                    const prev = arr[i + 1];
                    const delta = prev ? h.value - prev.value : null;
                    const status = getStatus(test, h.value);
                    return (
                      <tr key={h.date + i} className="border-t border-slate-50">
                        <td className="px-4 py-2 text-slate-700">{formatDate(h.date)}</td>
                        <td className="px-4 py-2 text-right font-medium text-slate-800">
                          {h.value} <span className="text-slate-400 text-xs">{test.unit}</span>
                        </td>
                        <td className="px-4 py-2 text-right text-slate-500">
                          {delta == null ? (
                            "—"
                          ) : (
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