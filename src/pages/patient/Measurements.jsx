import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Heart, Activity, Scale, Droplet, Thermometer, Moon, Footprints, Filter } from "lucide-react";
import { bloodPressureData } from "@/lib/demoData";

const ranges = {
  "7d": 14, "30d": 60, "90d": 60, "1y": 60,
};

const sources = ["Visi", "OMRON", "Rankinis įvedimas"];

export default function Measurements() {
  const [range, setRange] = useState("7d");
  const [source, setSource] = useState("Visi");

  const filtered = bloodPressureData.slice(-ranges[range]).filter(r =>
    source === "Visi" || r.source === source
  );

  const chartData = filtered.map(r => ({
    date: `${r.date.slice(8)}/${r.date.slice(5, 7)}`,
    time: r.time,
    sistolinis: r.systolic,
    diastolinis: r.diastolic,
    pulsas: r.pulse,
  }));

  const avgSys = Math.round(filtered.reduce((a, b) => a + b.systolic, 0) / filtered.length);
  const avgDia = Math.round(filtered.reduce((a, b) => a + b.diastolic, 0) / filtered.length);
  const avgPulse = Math.round(filtered.reduce((a, b) => a + b.pulse, 0) / filtered.length);
  const latest = filtered[filtered.length - 1];

  const metrics = [
    { icon: Heart, label: "Kraujospūdis", value: `${latest?.systolic}/${latest?.diastolic}`, unit: "mmHg", color: "rose", active: true },
    { icon: Activity, label: "Pulsas", value: avgPulse, unit: "bpm", color: "sky" },
    { icon: Scale, label: "Svoris", value: 86, unit: "kg", color: "violet" },
    { icon: Droplet, label: "Gliukozė", value: 5.6, unit: "mmol/L", color: "amber" },
    { icon: Activity, label: "O2 saturacija", value: 97, unit: "%", color: "emerald" },
    { icon: Thermometer, label: "Temperatūra", value: 36.6, unit: "°C", color: "orange" },
    { icon: Moon, label: "Miegas", value: 6.5, unit: "val.", color: "indigo" },
    { icon: Footprints, label: "Fizinis aktyvumas", value: 4231, unit: "žingsniai", color: "emerald" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Matavimai</h1>
        <p className="text-slate-500 mt-1">Jūsų sveikatos rodikliai ir tendencijos</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card key={i} className={`p-4 rounded-2xl ${m.active ? "border-rose-200 bg-rose-50/30" : "border-slate-100"}`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                m.color === "rose" ? "bg-rose-50 text-rose-500" :
                m.color === "sky" ? "bg-sky-50 text-sky-500" :
                m.color === "violet" ? "bg-violet-50 text-violet-500" :
                m.color === "amber" ? "bg-amber-50 text-amber-500" :
                m.color === "emerald" ? "bg-emerald-50 text-emerald-500" :
                m.color === "orange" ? "bg-orange-50 text-orange-500" :
                m.color === "indigo" ? "bg-indigo-50 text-indigo-500" : ""
              }`}>
                <m.icon className="w-4 h-4" />
              </div>
              {m.active && <Badge className="bg-rose-50 text-rose-700 border-rose-200">Aktyvus</Badge>}
            </div>
            <p className="text-xs text-slate-500">{m.label}</p>
            <p className="text-xl font-bold text-slate-800">{m.value} <span className="text-sm font-normal text-slate-400">{m.unit}</span></p>
          </Card>
        ))}
      </div>

      {/* BP chart */}
      <Card className="p-6 rounded-2xl border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-bold text-slate-800">Kraujospūdžio grafikas</h3>
            <div className="flex gap-4 mt-1 text-sm text-slate-500">
              <span>Vid. sistolinis: <strong className="text-slate-700">{avgSys}</strong></span>
              <span>Vid. diastolinis: <strong className="text-slate-700">{avgDia}</strong></span>
              <span>Vid. pulsas: <strong className="text-slate-700">{avgPulse}</strong></span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["7d", "30d", "90d", "1y"].map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${range === r ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {r === "7d" ? "7 d." : r === "30d" ? "30 d." : r === "90d" ? "90 d." : "1 metai"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-slate-400" />
          {sources.map(s => (
            <button key={s} onClick={() => setSource(s)}
              className={`px-3 py-1 rounded-full text-xs ${source === s ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"}`}>
              {s}
            </button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="sysGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" domain={[60, 160]} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Area type="monotone" dataKey="sistolinis" stroke="#0ea5e9" strokeWidth={2} fill="url(#sysGrad)" name="Sistolinis" />
            <Line type="monotone" dataKey="diastolinis" stroke="#10b981" strokeWidth={2} dot={false} name="Diastolinis" />
            <Line type="monotone" dataKey="pulsas" stroke="#8b5cf6" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Pulsas" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent readings */}
      <Card className="p-6 rounded-2xl border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Paskutiniai matavimai</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100">
                <th className="pb-3 font-medium">Data</th>
                <th className="pb-3 font-medium">Laikas</th>
                <th className="pb-3 font-medium">Sistolinis</th>
                <th className="pb-3 font-medium">Diastolinis</th>
                <th className="pb-3 font-medium">Pulsas</th>
                <th className="pb-3 font-medium">Šaltinis</th>
                <th className="pb-3 font-medium">Pozicija</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(-10).reverse().map((r, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 text-slate-600">{r.date}</td>
                  <td className="py-3 text-slate-600">{r.time}</td>
                  <td className="py-3">
                    <span className={r.systolic > 140 ? "text-rose-600 font-semibold" : "text-slate-600"}>{r.systolic}</span>
                  </td>
                  <td className="py-3">
                    <span className={r.diastolic > 90 ? "text-rose-600 font-semibold" : "text-slate-600"}>{r.diastolic}</span>
                  </td>
                  <td className="py-3 text-slate-600">{r.pulse}</td>
                  <td className="py-3"><Badge variant="outline" className="text-xs">{r.source}</Badge></td>
                  <td className="py-3 text-slate-600">{r.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}