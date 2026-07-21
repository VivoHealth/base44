import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Smartphone, Watch, FlaskConical, FileText, Edit3, CheckCircle2, RefreshCw, Unplug } from "lucide-react";
import { integrations } from "@/lib/demoData";

const iconMap = { heart: Heart, apple: Smartphone, phone: Smartphone, watch: Watch, flask: FlaskConical, file: FileText, edit: Edit3 };

const statusConfig = {
  connected: { label: "Prijungta", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  available: { label: "Galima", color: "bg-sky-50 text-sky-700 border-sky-200" },
  "coming-soon": { label: "Greitai", color: "bg-amber-50 text-amber-700 border-amber-200" },
};

export default function Integrations() {
  const [omronConnected, setOmronConnected] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setOmronConnected(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Integracijos</h1>
        <p className="text-slate-500 mt-1">Prijunkite savo sveikatos prietaisus ir programas</p>
      </div>

      {/* OMRON featured card */}
      <Card className="p-6 rounded-2xl border-slate-100">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center flex-shrink-0">
            <Heart className="w-7 h-7 text-rose-500" fill="currentColor" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800">OMRON</h3>
              <Badge className={omronConnected ? statusConfig.connected.color : "bg-slate-100 text-slate-500"}>
                {omronConnected ? "Prijungta" : "Neprijungta"}
              </Badge>
              {omronConnected && <Badge variant="outline" className="text-xs">Demo</Badge>}
            </div>
            <p className="text-sm text-slate-500 mt-1">Kraujospūdžio monitoriai – automatinis matavimų importavimas</p>

            {omronConnected ? (
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-50/50">
                  <p className="text-xs text-slate-500">Paskutinė sinchronizacija</p>
                  <p className="text-sm font-medium text-slate-800">2026-07-20 19:45</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50/50">
                  <p className="text-xs text-slate-500">Įrenginio modelis</p>
                  <p className="text-sm font-medium text-slate-800">OMRON M7 Intelli IT</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50/50">
                  <p className="text-xs text-slate-500">Importuota matavimų</p>
                  <p className="text-sm font-medium text-slate-800">48 matavimai</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50/50">
                  <p className="text-xs text-slate-500">Paskyra</p>
                  <p className="text-sm font-medium text-slate-800">jonas.petrauskas@email.lt</p>
                </div>
                <Button variant="outline" size="sm" className="sm:col-span-1"><RefreshCw className="w-4 h-4 mr-1" /> Sinchronizuoti dabar</Button>
                <Button variant="outline" size="sm" className="border-rose-200 text-rose-600 hover:bg-rose-50" onClick={() => setOmronConnected(false)}>
                  <Unplug className="w-4 h-4 mr-1" /> Atsijungti
                </Button>
              </div>
            ) : (
              <Button onClick={handleConnect} disabled={connecting} className="mt-4 bg-sky-600 hover:bg-sky-700">
                {connecting ? "Jungiama..." : "Prijungti OMRON paskyrą"}
              </Button>
            )}
            {connecting && (
              <p className="text-xs text-slate-400 mt-2">Simuliuojamas OAuth prisijungimas (demo)...</p>
            )}
          </div>
        </div>
      </Card>

      {/* Other integrations */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.slice(1).map((int, i) => {
          const Icon = iconMap[int.icon] || Heart;
          const cfg = statusConfig[int.status] || statusConfig.available;
          return (
            <Card key={i} className="p-5 rounded-2xl border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-slate-500" />
                </div>
                <Badge className={cfg.color}>{cfg.label}</Badge>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">{int.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{int.desc}</p>
              {int.status === "available" && (
                <Button variant="outline" size="sm" className="w-full mt-3 text-xs">Prijungti</Button>
              )}
              {int.status === "connected" && (
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-3">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Aktyvi
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}