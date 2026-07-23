import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Users, Stethoscope, BadgeCheck, Clock, CreditCard, Wallet, ShieldAlert, Activity, TrendingUp } from "lucide-react";

const platformData = [
  { month: "Feb", revenue: 3200 },
  { month: "Mar", revenue: 3800 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 5200 },
  { month: "Jun", revenue: 5800 },
  { month: "Jul", revenue: 6200 },
];

const pendingDoctors = [
  { name: "Dr. John Smith", spec: "Cardiology", date: "2026-07-19", country: "Lithuania" },
  { name: "Dr. James Brown", spec: "Endocrinology", date: "2026-07-18", country: "Latvia" },
  { name: "Dr. Peter Jones", spec: "Family Medicine", date: "2026-07-17", country: "Estonia" },
];

export default function AdminOverviewEn() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin overview</h1>
        <p className="text-slate-500 mt-1">Platform activity monitoring and management</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total patients", value: "1,248", color: "sky" },
          { icon: Stethoscope, label: "Total doctors", value: "87", color: "emerald" },
          { icon: BadgeCheck, label: "Verified doctors", value: "84", color: "emerald" },
          { icon: Clock, label: "Pending approval", value: "3", color: "amber" },
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
          { icon: CreditCard, label: "Active subscriptions", value: "1,156", color: "sky" },
          { icon: Wallet, label: "Monthly revenue (MRR)", value: "€6,200", color: "emerald" },
          { icon: TrendingUp, label: "Platform commission", value: "€1,240", color: "emerald" },
          { icon: ShieldAlert, label: "Open security reports", value: "2", color: "rose" },
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
              <h3 className="font-bold text-slate-800">Platform revenue</h3>
              <p className="text-sm text-slate-500">Monthly recurring revenue (MRR)</p>
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
          <h3 className="font-bold text-slate-800 mb-4">Pending doctors</h3>
          <div className="space-y-3">
            {pendingDoctors.map((d, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-800">{d.name}</p>
                <p className="text-xs text-slate-500">{d.spec} • {d.country}</p>
                <p className="text-xs text-slate-400 mt-1">Submitted: {d.date}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-7 text-xs">Approve</Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs border-rose-200 text-rose-600 hover:bg-rose-50">Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 rounded-2xl border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Integration status</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "OMRON", status: "Active", color: "emerald" },
            { name: "Apple Health", status: "Active", color: "emerald" },
            { name: "Android Health Connect", status: "Active", color: "emerald" },
            { name: "Garmin", status: "Planned", color: "amber" },
            { name: "Fitbit", status: "Planned", color: "amber" },
            { name: "Oura", status: "Planned", color: "amber" },
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