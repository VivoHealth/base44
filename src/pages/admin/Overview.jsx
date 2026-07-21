import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Users, Stethoscope, BadgeCheck, Clock, CreditCard, Wallet, ShieldAlert, Activity, TrendingUp } from "lucide-react";

const platformData = [
  { month: "Vas", revenue: 3200 },
  { month: "Kov", revenue: 3800 },
  { month: "Bal", revenue: 4500 },
  { month: "Geg", revenue: 5200 },
  { month: "Bir", revenue: 5800 },
  { month: "Lie", revenue: 6200 },
];

const pendingDoctors = [
  { name: "Dr. Vardenis Pavardenis", spec: "Kardiologija", date: "2026-07-19", country: "Lietuva" },
  { name: "Dr. Jonas Jonaitis", spec: "Endokrinologija", date: "2026-07-18", country: "Latvija" },
  { name: "Dr. Petras Petraitis", spec: "Šeimos medicina", date: "2026-07-17", country: "Estija" },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Administravimo apžvalga</h1>
        <p className="text-slate-500 mt-1">Platformos veiklos stebėjimas ir valdymas</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Pacientai iš viso", value: "1,248", color: "sky" },
          { icon: Stethoscope, label: "Gydytojai iš viso", value: "87", color: "emerald" },
          { icon: BadgeCheck, label: "Patvirtinti gydytojai", value: "84", color: "emerald" },
          { icon: Clock, label: "Laukia patvirtinimo", value: "3", color: "amber" },
        ].map((s, i) => (
          <Card key={i} className="p-5 rounded-2xl border-slate-100">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${
              s.color === "sky" ? "bg-sky-50 text-sky-600" : s.color === "emerald" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
            }`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="text-2xl font-bold text-slate-800">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: CreditCard, label: "Aktyvios prenumeratos", value: "1,156", color: "sky" },
          { icon: Wallet, label: "Mėnesio pajamos (MRR)", value: "€6,200", color: "emerald" },
          { icon: TrendingUp, label: "Platformos komisinis", value: "€1,240", color: "emerald" },
          { icon: ShieldAlert, label: "Atviri saugumo pranešimai", value: "2", color: "rose" },
        ].map((s, i) => (
          <Card key={i} className="p-5 rounded-2xl border-slate-100">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${
              s.color === "sky" ? "bg-sky-50 text-sky-600" : s.color === "emerald" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            }`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="text-2xl font-bold text-slate-800">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Platformos pajamos</h3>
              <p className="text-sm text-slate-500">Mėnesio pasikartojančios pajamos (MRR)</p>
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200"><TrendingUp className="w-3 h-3 mr-1" /> +6.9%</Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 rounded-2xl border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Laukiantys gydytojai</h3>
          <div className="space-y-3">
            {pendingDoctors.map((d, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-800">{d.name}</p>
                <p className="text-xs text-slate-500">{d.spec} • {d.country}</p>
                <p className="text-xs text-slate-400 mt-1">Pateikta: {d.date}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-7 text-xs">Patvirtinti</Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs border-rose-200 text-rose-600 hover:bg-rose-50">Atmesti</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 rounded-2xl border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Integracijų būsena</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "OMRON", status: "Aktyvi", color: "emerald" },
            { name: "Apple Health", status: "Aktyvi", color: "emerald" },
            { name: "Android Health Connect", status: "Aktyvi", color: "emerald" },
            { name: "Garmin", status: "Planuojama", color: "amber" },
            { name: "Fitbit", status: "Planuojama", color: "amber" },
            { name: "Oura", status: "Planuojama", color: "amber" },
          ].map((int, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">{int.name}</span>
              </div>
              <Badge className={int.color === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}>
                {int.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}