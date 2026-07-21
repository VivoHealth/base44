import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import {
  Heart, Stethoscope, Calendar, FlaskConical, Pill, Clock,
  AlertTriangle, FileText, Bot, CreditCard, Activity, TrendingUp, ChevronRight,
} from "lucide-react";
import { patientProfile, bloodPressureData, alerts, healthTimeline, medications } from "@/lib/demoData";

const bpChart = bloodPressureData.slice(-14).map(r => ({
  date: r.date.slice(5),
  sistolinis: r.systolic,
  diastolinis: r.diastolic,
}));

const alertColors = {
  urgent: "bg-rose-50 text-rose-700 border-rose-200",
  priority: "bg-amber-50 text-amber-700 border-amber-200",
  review: "bg-sky-50 text-sky-700 border-sky-200",
  info: "bg-slate-50 text-slate-600 border-slate-200",
};

const alertLabels = { urgent: "Skubus", priority: "Prioritetinis", review: "Peržiūrėti", info: "Informacinis" };

export default function PatientOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sveiki, Jonai 👋</h1>
        <p className="text-slate-500 mt-1">Štai jūsų sveikatos apžvalga šiandien, {new Date().toLocaleDateString("lt-LT", { day: "numeric", month: "long", year: "numeric" })}</p>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center"><Activity className="w-4 h-4 text-emerald-600" /></div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Stabilus</Badge>
          </div>
          <p className="text-xs text-slate-500">Sveikatos būsena</p>
          <p className="text-sm font-semibold text-slate-800">Prižiūrima</p>
        </Card>
        <Card className="p-4 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center"><Stethoscope className="w-4 h-4 text-sky-600" /></div>
          </div>
          <p className="text-xs text-slate-500">Pasirinktas gydytojas</p>
          <p className="text-sm font-semibold text-slate-800 truncate">{patientProfile.selectedDoctor}</p>
        </Card>
        <Card className="p-4 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center"><Calendar className="w-4 h-4 text-amber-600" /></div>
          </div>
          <p className="text-xs text-slate-500">Kitama peržiūra</p>
          <p className="text-sm font-semibold text-slate-800">2026-08-19</p>
        </Card>
        <Card className="p-4 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center"><Heart className="w-4 h-4 text-rose-500" fill="currentColor" /></div>
          </div>
          <p className="text-xs text-slate-500">Paskutinis kraujospūdis</p>
          <p className="text-sm font-semibold text-slate-800">142/91 mmHg</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center"><FlaskConical className="w-4 h-4 text-sky-600" /></div>
          </div>
          <p className="text-xs text-slate-500">Paskutinis laboratorinis</p>
          <p className="text-sm font-semibold text-slate-800">2026-07-15</p>
        </Card>
        <Card className="p-4 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center"><Pill className="w-4 h-4 text-violet-600" /></div>
          </div>
          <p className="text-xs text-slate-500">Aktyvūs vaistai</p>
          <p className="text-sm font-semibold text-slate-800">{medications.filter(m => m.active).length} vaistai</p>
        </Card>
        <Card className="p-4 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center"><Clock className="w-4 h-4 text-amber-600" /></div>
          </div>
          <p className="text-xs text-slate-500">Laukiami veiksmai</p>
          <p className="text-sm font-semibold text-slate-800">3 veiksmai</p>
        </Card>
        <Card className="p-4 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center"><CreditCard className="w-4 h-4 text-emerald-600" /></div>
          </div>
          <p className="text-xs text-slate-500">Prenumerata</p>
          <p className="text-sm font-semibold text-slate-800">€39/mėn</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* BP Chart */}
        <Card className="lg:col-span-2 p-6 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Kraujospūdžio tendencija</h3>
              <p className="text-sm text-slate-500">Paskutinės 14 dienų</p>
            </div>
            <Link to="/pacientas/matavimai"><Button variant="outline" size="sm">Peržiūrėti <ChevronRight className="w-4 h-4" /></Button></Link>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={bpChart}>
              <defs>
                <linearGradient id="sist" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" domain={[60, 150]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Area type="monotone" dataKey="sistolinis" stroke="#0ea5e9" strokeWidth={2} fill="url(#sist)" name="Sistolinis" />
              <Area type="monotone" dataKey="diastolinis" stroke="#10b981" strokeWidth={2} fill="none" name="Diastolinis" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Alerts */}
        <Card className="p-6 rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Įspėjimai</h3>
            <Badge className="bg-rose-50 text-rose-700 border-rose-200">{alerts.length}</Badge>
          </div>
          <div className="space-y-3">
            {alerts.slice(0, 3).map((a) => (
              <div key={a.id} className={`p-3 rounded-xl border ${alertColors[a.level]}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{alertLabels[a.level]}</span>
                  <span className="text-xs opacity-60">{a.date.slice(5)}</span>
                </div>
                <p className="text-sm font-semibold">{a.title}</p>
                <p className="text-xs mt-1 opacity-80">{a.message.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
          {alerts[0]?.level === "urgent" && (
            <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              <AlertTriangle className="w-3.5 h-3.5 inline mr-1" />
              Ši informacija gali reikalauti skubaus medicininio dėmesio. ManoSveikata nėra skubiosios pagalbos tarnyba. Kreipkitės į pagalbos tarnybas, kai reikalinga neatidėliotina pagalba.
            </div>
          )}
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Summary teaser */}
        <Card className="p-6 rounded-2xl border-slate-100 bg-gradient-to-br from-sky-50/50 to-emerald-50/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">AI Sveikatos Asistentas</h3>
              <p className="text-xs text-slate-500">Savaitės santrauka paruošta</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Jūsų savaitės santrauka paruošta. Vidutinis kraujospūdis pakilo 3 mmHg. Cholesterolis viršijo normą.
          </p>
          <Link to="/pacientas/ai"><Button className="bg-sky-600 hover:bg-sky-700" size="sm">Paklausti AI <ChevronRight className="w-4 h-4" /></Button></Link>
        </Card>

        {/* Pending actions */}
        <Card className="p-6 rounded-2xl border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Laukiami veiksmai</h3>
          <div className="space-y-2">
            {[
              { text: "Pažymėti Atorvastatino dozę", icon: Pill, color: "violet" },
              { text: "Peržiūrėti laboratorinius rezultatus", icon: FlaskConical, color: "sky" },
              { text: "Patvirtinti AI išskleistus duomenis", icon: FileText, color: "emerald" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  a.color === "violet" ? "bg-violet-50 text-violet-600" :
                  a.color === "sky" ? "bg-sky-50 text-sky-600" : "bg-emerald-50 text-emerald-600"
                }`}>
                  <a.icon className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-600 flex-1">{a.text}</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="p-6 rounded-2xl border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Sveikatos įvykių laiko juosta</h3>
        <div className="space-y-4">
          {healthTimeline.map((e) => (
            <div key={e.id} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                {e.type === "bp" && <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />}
                {e.type === "alert" && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                {e.type === "summary" && <Bot className="w-4 h-4 text-sky-500" />}
                {e.type === "review" && <Stethoscope className="w-4 h-4 text-emerald-500" />}
                {e.type === "lab" && <FlaskConical className="w-4 h-4 text-sky-500" />}
                {e.type === "medication" && <Pill className="w-4 h-4 text-violet-500" />}
              </div>
              <div className="flex-1 pb-4 border-b border-slate-50 last:border-0">
                <p className="text-sm font-medium text-slate-800">{e.title}</p>
                <p className="text-xs text-slate-500">{e.desc}</p>
                <p className="text-xs text-slate-400 mt-1">{e.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}