import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { labResults } from "@/lib/demoData";
import { TrendingUp, TrendingDown, Minus, FlaskConical } from "lucide-react";

const statusConfig = {
  within: { label: "In range", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  above: { label: "Above range", color: "bg-rose-50 text-rose-700 border-rose-200" },
  below: { label: "Below range", color: "bg-amber-50 text-amber-700 border-amber-200" },
  review: { label: "Needs review", color: "bg-sky-50 text-sky-700 border-sky-200" },
};

export default function LabResultsEn() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Lab results</h1>
          <p className="text-slate-500 mt-1">Biochemical markers and lipid panel • 2026-07-15</p>
        </div>
        <Badge className="bg-sky-50 text-sky-700 border-sky-200"><FlaskConical className="w-3 h-3 mr-1" /> 12 markers</Badge>
      </div>

      <Card className="p-3 sm:p-4 rounded-2xl border-amber-100 bg-amber-50/30">
        <p className="text-sm text-slate-600 px-2">
          ⚠️ These results are not an automatic diagnosis. All laboratory markers must be evaluated by a qualified healthcare professional.
        </p>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {labResults.map((r, i) => {
          const status = statusConfig[r.status];
          const isOutOfRange = r.status !== "within";
          return (
            <Card key={i} className={`p-5 rounded-2xl ${isOutOfRange ? "border-amber-200" : "border-slate-100"}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{r.marker}</p>
                  <p className="text-xs text-slate-400">{r.date}</p>
                </div>
                <Badge className={status.color}>{status.label}</Badge>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className={`text-2xl font-bold ${isOutOfRange ? "text-amber-600" : "text-slate-800"}`}>{r.value}</span>
                <span className="text-sm text-slate-400">{r.unit}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Range: {r.refLow}–{r.refHigh}</span>
                <div className="flex items-center gap-1">
                  {r.trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-rose-500" />}
                  {r.trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-sky-500" />}
                  {r.trend === "stable" && <Minus className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="text-slate-400">
                    {r.trend === "up" ? "rising" : r.trend === "down" ? "falling" : "stable"}
                  </span>
                </div>
              </div>
              {/* Range bar */}
              <div className="mt-3 relative h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-emerald-200 rounded-full" style={{
                  width: `${Math.min(100, ((r.refHigh - r.refLow) / (r.refHigh * 1.3)) * 100)}%`,
                }} />
                <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${isOutOfRange ? "bg-amber-500" : "bg-emerald-500"}`}
                  style={{ left: `calc(${Math.min(95, (r.value / (r.refHigh * 1.2)) * 100)}% - 4px)` }} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}