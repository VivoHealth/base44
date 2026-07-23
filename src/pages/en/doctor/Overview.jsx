import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Users, AlertTriangle, ClipboardCheck, Wallet, TrendingUp, ChevronRight, Activity } from "lucide-react";
import { doctorPatients } from "@/lib/demoDataEn";

const revenueData = [
  { month: "Feb", revenue: 420 },
  { month: "Mar", revenue: 460 },
  { month: "Apr", revenue: 500 },
  { month: "May", revenue: 540 },
  { month: "Jun", revenue: 560 },
  { month: "Jul", revenue: 546 },
];

export default function DoctorOverviewEn() {
  const needsAttention = doctorPatients.filter(p => p.alert === "urgent" || p.alert === "priority").length;
  const reviewDue = doctorPatients.filter(p => p.alert === "review").length;
  const stable = doctorPatients.filter(p => p.alert === "none").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hello, Dr. Aistė 👋</h1>
        <p className="text-slate-500 mt-1">Your patient care overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-5 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center"><Users className="w-4 h-4 text-emerald-600" /></div>
          </div>
          <p className="text-xs text-slate-500">Active patients</p>
          <p className="text-2xl font-bold text-slate-800">14<span className="text-sm font-normal text-slate-400">/25</span></p>
        </Card>
        <Card className="p-5 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-rose-600" /></div>
          </div>
          <p className="text-xs text-slate-500">Needs attention</p>
          <p className="text-2xl font-bold text-slate-800">{needsAttention}</p>
        </Card>
        <Card className="p-5 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center"><ClipboardCheck className="w-4 h-4 text-amber-600" /></div>
          </div>
          <p className="text-xs text-slate-500">Reviews this week</p>
          <p className="text-2xl font-bold text-slate-800">3</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2 p-6 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Monthly revenue</h3>
              <p className="text-sm text-slate-500">Last 6 months</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-800">€546</p>
              <p className="text-xs text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +2.5%</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Patient prioritization */}
        <Card className="p-6 rounded-2xl border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Patient priority</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-sm text-slate-700">Needs attention</span>
              </div>
              <span className="font-bold text-slate-800">{needsAttention}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-700">Review due</span>
              </div>
              <span className="font-bold text-slate-800">{reviewDue}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm text-slate-700">Stable</span>
              </div>
              <span className="font-bold text-slate-800">{stable}</span>
            </div>
          </div>
          <Link to="/en/doctor/patients">
            <Button variant="outline" size="sm" className="w-full mt-4">View patients <ChevronRight className="w-4 h-4" /></Button>
          </Link>
        </Card>
      </div>

      {/* Urgent patients */}
      <Card className="p-6 rounded-2xl border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Patients needing attention</h3>
          <Link to="/en/doctor/patients"><Button variant="outline" size="sm">All patients</Button></Link>
        </div>
        <div className="space-y-2">
          {doctorPatients.filter(p => p.alert !== "none").slice(0, 5).map(p => (
            <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
              <div className={`w-2 h-10 rounded-full ${p.alert === "urgent" ? "bg-rose-500" : p.alert === "priority" ? "bg-amber-500" : "bg-sky-500"}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{p.name}</p>
                <p className="text-xs text-slate-500">{p.condition} • {p.age} y</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-700">{p.bp}</p>
                <p className="text-xs text-slate-400">BP</p>
              </div>
              <Badge className={
                p.alert === "urgent" ? "bg-rose-50 text-rose-700 border-rose-200" :
                p.alert === "priority" ? "bg-amber-50 text-amber-700 border-amber-200" :
                "bg-sky-50 text-sky-700 border-sky-200"
              }>
                {p.alert === "urgent" ? "Urgent" : p.alert === "priority" ? "Priority" : "Review"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}