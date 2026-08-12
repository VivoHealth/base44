import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, ChevronRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { getLatest, getSortedHistory, getStatus, getTrend, statusConfig } from "@/lib/labTests";

export default function LabTestCard({ test, onClick }) {
  const latest = getLatest(test);
  const status = getStatus(test, latest?.value);
  const statusCfg = statusConfig[status];
  const outOfRange = status !== "within";
  const trend = getTrend(test);
  const deltaUp = trend.delta > 0;
  const TrendIcon = trend.direction === "stable" ? Minus : deltaUp ? TrendingUp : TrendingDown;
  const trendColor =
    trend.direction === "improving"
      ? "text-emerald-500"
      : trend.direction === "worsening"
      ? "text-rose-500"
      : "text-slate-400";
  const trendLabel =
    trend.direction === "improving"
      ? "gerėja"
      : trend.direction === "worsening"
      ? "blogėja"
      : "stabili";

  const history = getSortedHistory(test);
  const chartData = history.map((h) => ({ date: h.date, value: h.value }));

  // Range bar
  const ref = test.direction === "lower" ? test.refHigh : test.refLow;
  const maxScale = test.direction === "lower" ? ref * 1.4 : ref * 1.6;
  const minScale = test.direction === "lower" ? 0 : ref * 0.5;
  const valuePct = latest
    ? Math.min(100, Math.max(0, ((latest.value - minScale) / (maxScale - minScale)) * 100))
    : 0;
  const greenPct =
    test.direction === "lower"
      ? ((ref - minScale) / (maxScale - minScale)) * 100
      : ((maxScale - ref) / (maxScale - minScale)) * 100;
  const greenLeft = test.direction === "lower" ? 0 : ((ref - minScale) / (maxScale - minScale)) * 100;

  return (
    <Card
      className={`p-5 rounded-2xl cursor-pointer hover:shadow-md transition-shadow ${outOfRange ? "border-amber-200" : "border-slate-100"}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-slate-800 text-sm">{test.name}</p>
          <p className="text-xs text-slate-400">{latest ? latest.date : "—"}</p>
        </div>
        <Badge className={statusCfg.color}>{statusCfg.label}</Badge>
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <span className={`text-2xl font-bold ${outOfRange ? "text-amber-600" : "text-slate-800"}`}>
          {latest ? latest.value : "—"}
        </span>
        <span className="text-sm text-slate-400">{test.unit}</span>
      </div>

      {/* Mini sparkline */}
      {chartData.length > 1 && (
        <div className="h-10 -mx-1 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
              <YAxis domain={["auto", "auto"]} hide />
              <Line
                type="monotone"
                dataKey="value"
                stroke={outOfRange ? "#f59e0b" : "#10b981"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">Norma: {test.refLabel}</span>
        {trend.hasData && (
          <div className="flex items-center gap-1">
            <TrendIcon className={`w-3.5 h-3.5 ${trendColor}`} />
            <span className={trendColor}>{trendLabel}</span>
          </div>
        )}
      </div>

      {/* Range bar */}
      <div className="mt-3 relative h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 bg-emerald-200 rounded-full"
          style={{ left: `${greenLeft}%`, width: `${greenPct}%` }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${outOfRange ? "bg-amber-500" : "bg-emerald-500"}`}
          style={{ left: `calc(${valuePct}% - 4px)` }}
        />
      </div>

      <div className="flex items-center justify-end mt-3 text-xs text-slate-400">
        Peržiūrėti eigą <ChevronRight className="w-3 h-3" />
      </div>
    </Card>
  );
}