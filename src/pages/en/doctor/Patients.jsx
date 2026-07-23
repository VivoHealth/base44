import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight } from "lucide-react";
import { doctorPatients } from "@/lib/demoDataEn";

const alertConfig = {
  urgent: { label: "Urgent", color: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" },
  priority: { label: "Priority", color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  review: { label: "Review", color: "bg-sky-50 text-sky-700 border-sky-200", dot: "bg-sky-500" },
  none: { label: "Stable", color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
};

export default function DoctorPatientsEn() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = doctorPatients.filter(p =>
    (filter === "all" || p.alert === filter || (filter === "stable" && p.alert === "none")) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Patients</h1>
        <p className="text-slate-500 mt-1">All your subscription patients ({doctorPatients.length})</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {[
            { key: "all", label: "All" },
            { key: "urgent", label: "Urgent" },
            { key: "review", label: "Review" },
            { key: "stable", label: "Stable" },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${filter === f.key ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card className="rounded-2xl border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-400">
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium">Age</th>
                <th className="px-4 py-3 font-medium">Condition</th>
                <th className="px-4 py-3 font-medium">Blood pressure</th>
                <th className="px-4 py-3 font-medium">Last review</th>
                <th className="px-4 py-3 font-medium">Next review</th>
                <th className="px-4 py-3 font-medium">Alert</th>
                <th className="px-4 py-3 font-medium">Plan</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const cfg = alertConfig[p.alert];
                return (
                  <tr key={p.id} className="border-t border-slate-50 hover:bg-slate-50/50 cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                        <span className="font-medium text-slate-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{p.age}</td>
                    <td className="px-4 py-3 text-slate-600">{p.condition}</td>
                    <td className="px-4 py-3 text-slate-600">{p.bp}</td>
                    <td className="px-4 py-3 text-slate-600">{p.lastReview}</td>
                    <td className="px-4 py-3 text-slate-600">{p.nextReview}</td>
                    <td className="px-4 py-3"><Badge className={cfg.color}>{cfg.label}</Badge></td>
                    <td className="px-4 py-3 text-slate-600">{p.plan}</td>
                    <td className="px-4 py-3"><ChevronRight className="w-4 h-4 text-slate-300" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}