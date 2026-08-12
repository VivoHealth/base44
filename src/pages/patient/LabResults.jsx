import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlaskConical, Plus, LayoutGrid, ListOrdered, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  labGroups, labTests as initialTests, getSortedHistory, getEntryStatus, isNoteEntry, statusConfig,
} from "@/lib/labTests";
import LabTestCard from "@/components/lab/LabTestCard";
import LabTrendDialog from "@/components/lab/LabTrendDialog";
import AddMeasurementDialog from "@/components/lab/AddMeasurementDialog";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("lt-LT", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function LabResults() {
  const [tests, setTests] = useState(initialTests);
  const [view, setView] = useState("cards");
  const [addOpen, setAddOpen] = useState(false);
  const [activeTest, setActiveTest] = useState(null);

  const handleAdd = (testId, date, value) => {
    setTests((prev) =>
      prev.map((t) =>
        t.id === testId
          ? { ...t, history: [...t.history, { date, value }] }
          : t
      )
    );
  };

  // Timeline: all entries across all tests
  const allEntries = tests
    .flatMap((t) =>
      getSortedHistory(t).map((h) => ({ test: t, entry: h, status: getEntryStatus(t, h) }))
    )
    .sort((a, b) => (b.entry.date || "").localeCompare(a.entry.date || ""));

  const latestDate = tests
    .flatMap((t) => t.history.map((h) => h.date))
    .filter(Boolean)
    .sort()
    .slice(-1)[0];

  const outOfRangeCount = tests.filter((t) => {
    const h = getSortedHistory(t);
    const s = getEntryStatus(t, h[h.length - 1]);
    return s === "above" || s === "below";
  }).length;

  const pendingCount = tests.filter((t) => {
    const h = getSortedHistory(t);
    return getEntryStatus(t, h[h.length - 1]) === "pending";
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laboratoriniai rezultatai</h1>
          <p className="text-slate-500 mt-1">
            Lipidograma, hormonai, medžiagų apykaita ir kūno matavimai • paskutinis {latestDate ? formatDate(latestDate) : "—"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-sky-50 text-sky-700 border-sky-200">
            <FlaskConical className="w-3 h-3 mr-1" /> {tests.length} rodikliai
          </Badge>
          {outOfRangeCount > 0 && (
            <Badge className="bg-amber-50 text-amber-700 border-amber-200">{outOfRangeCount} už normos</Badge>
          )}
          {pendingCount > 0 && (
            <Badge className="bg-slate-50 text-slate-500 border-slate-200">{pendingCount} laukia</Badge>
          )}
          <Button onClick={() => setAddOpen(true)} className="bg-sky-600 hover:bg-sky-700">
            <Plus className="w-4 h-4 mr-1" /> Pridėti matavimą
          </Button>
        </div>
      </div>

      <Card className="p-3 sm:p-4 rounded-2xl border-amber-100 bg-amber-50/30">
        <p className="text-sm text-slate-600 px-2">
          ⚠️ Šie rezultatai nėra automatinė diagnozė. Visi rodikliai turi būti vertinami kvalifikuoto sveikatos priežiūros specialisto.
        </p>
      </Card>

      {/* View toggle */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        <button
          onClick={() => setView("cards")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${view === "cards" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
        >
          <LayoutGrid className="w-4 h-4" /> Kortelės
        </button>
        <button
          onClick={() => setView("timeline")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${view === "timeline" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
        >
          <ListOrdered className="w-4 h-4" /> Laiko eiga
        </button>
      </div>

      {view === "cards" ? (
        <div className="space-y-8">
          {labGroups.map((g) => {
            const groupTests = tests.filter((t) => t.group === g.id);
            if (!groupTests.length) return null;
            return (
              <div key={g.id}>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{g.label}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {groupTests.map((t) => (
                    <LabTestCard key={t.id} test={t} onClick={() => setActiveTest(t)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="rounded-2xl border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs">
                <tr>
                  <th className="text-left font-medium px-4 py-3">Data</th>
                  <th className="text-left font-medium px-4 py-3">Rodiklis</th>
                  <th className="text-right font-medium px-4 py-3">Reikšmė</th>
                  <th className="text-right font-medium px-4 py-3">Norma</th>
                  <th className="text-right font-medium px-4 py-3">Statusas</th>
                  <th className="text-right font-medium px-4 py-3">Pokytis</th>
                </tr>
              </thead>
              <tbody>
                {allEntries.map((m, i) => {
                  const note = isNoteEntry(m.entry);
                  const sameTestSorted = getSortedHistory(m.test);
                  const idx = sameTestSorted.findIndex((h) => h.date === m.entry.date && (note ? h.note === m.entry.note : h.value === m.entry.value));
                  const older = idx > 0 ? sameTestSorted[idx - 1] : null;
                  const delta = !note && older && !isNoteEntry(older) ? m.entry.value - older.value : null;
                  return (
                    <tr key={`${m.test.id}-${i}`} className="border-t border-slate-50 hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{formatDate(m.entry.date)}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{m.test.name}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-800">
                        {note ? (m.entry.note || "—") : <>{m.entry.value} <span className="text-slate-400 text-xs">{m.test.unit}</span></>}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-500">{m.test.refLabel || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <Badge className={statusConfig[m.status].color}>{statusConfig[m.status].label}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {delta == null ? (
                          <span className="text-slate-300">—</span>
                        ) : (
                          <span className={`inline-flex items-center gap-1 ${Math.abs(delta) < 0.05 ? "text-slate-400" : delta > 0 ? "text-rose-500" : "text-emerald-500"}`}>
                            {Math.abs(delta) < 0.05 ? <Minus className="w-3 h-3" /> : delta > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {delta > 0 ? "+" : ""}{delta.toFixed(2)}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <LabTrendDialog test={activeTest} open={!!activeTest} onOpenChange={(o) => !o && setActiveTest(null)} />
      <AddMeasurementDialog tests={tests} open={addOpen} onOpenChange={setAddOpen} onAdd={handleAdd} />
    </div>
  );
}