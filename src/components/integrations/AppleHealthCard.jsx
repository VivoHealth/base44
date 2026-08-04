import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart, Footprints, Activity, Moon, ShieldCheck, RefreshCw, Unplug, Loader2, Apple
} from "lucide-react";

// HealthKit data types exposed in the permission sheet
const dataTypes = [
  { icon: Heart, label: "Širdies susitraukimų dažnis", key: "heartRate", sample: "72 dūž./min" },
  { icon: Activity, label: "Kraujospūdis", key: "bloodPressure", sample: "128/82 mmHg" },
  { icon: Footprints, label: "Žingsniai", key: "steps", sample: "8 432 žingsn." },
  { icon: Moon, label: "Miegas", key: "sleep", sample: "7 val. 12 min." },
];

export default function AppleHealthCard() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [grantedTypes, setGrantedTypes] = useState(dataTypes.map((d) => d.key));

  const toggleType = (key) => {
    setGrantedTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleConnect = () => setShowPermissions(true);

  const handleAuthorize = () => {
    setConnecting(true);
    // Simulate the native HealthKit authorization request + first sync
    setTimeout(() => {
      setConnecting(false);
      setShowPermissions(false);
      setConnected(true);
    }, 1800);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setGrantedTypes(dataTypes.map((d) => d.key));
  };

  return (
    <Card className="p-6 rounded-2xl border-slate-100">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center flex-shrink-0">
          <Apple className="w-7 h-7 text-white" fill="currentColor" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-slate-800">Apple Health</h3>
            <Badge className={connected ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500"}>
              {connected ? "Prijungta" : "Neprijungta"}
            </Badge>
            <Badge variant="outline" className="text-xs">Demo</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Sveikatos duomenys iš „iPhone" / „Apple Watch" per HealthKit
          </p>

          {connected ? (
            <div className="mt-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50/50">
                  <p className="text-xs text-slate-500">Paskutinė sinchronizacija</p>
                  <p className="text-sm font-medium text-slate-800">2026-08-04 08:12</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50/50">
                  <p className="text-xs text-slate-500">Sinchronizuoti duomenų tipai</p>
                  <p className="text-sm font-medium text-slate-800">{grantedTypes.length} iš {dataTypes.length}</p>
                </div>
              </div>

              <div className="space-y-2">
                {dataTypes.map((d) => {
                  const granted = grantedTypes.includes(d.key);
                  return (
                    <div key={d.key} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/40">
                      <d.icon className={`w-4 h-4 ${granted ? "text-rose-500" : "text-slate-300"}`} />
                      <span className="text-sm text-slate-700 flex-1">{d.label}</span>
                      <span className="text-xs text-slate-400">{granted ? d.sample : "—"}</span>
                      <button
                        onClick={() => toggleType(d.key)}
                        className={`w-9 h-5 rounded-full transition-colors relative ${granted ? "bg-emerald-500" : "bg-slate-200"}`}
                        aria-label={`Toggle ${d.label}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${granted ? "left-4" : "left-0.5"}`} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-1 text-xs text-amber-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                Duomenys persiunčiami tik jūsų gydytojui ir saugomi pagal BDPI
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm"><RefreshCw className="w-4 h-4 mr-1" /> Sinchronizuoti dabar</Button>
                <Button variant="outline" size="sm" className="border-rose-200 text-rose-600 hover:bg-rose-50" onClick={handleDisconnect}>
                  <Unplug className="w-4 h-4 mr-1" /> Atsijungti
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={handleConnect} className="mt-4 bg-black hover:bg-black/90">
              Prijungti per HealthKit
            </Button>
          )}
        </div>
      </div>

      {/* HealthKit-style permission sheet */}
      {showPermissions && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4" onClick={() => !connecting && setShowPermissions(false)}>
          <Card className="w-full max-w-md p-6 rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                <Apple className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">„vivo" prašo prieigos</h3>
                <p className="text-xs text-slate-500">Apple Health – duomenų privatumas</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Pasirinkite, kuriuos sveikatos duomenis programa „vivo" galės skaityti:
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {dataTypes.map((d) => (
                <label key={d.key} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={(e) => toggleType(d.key)}
                    className="w-4 h-4 rounded accent-emerald-500"
                  />
                  <d.icon className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-700 flex-1">{d.label}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <Button variant="outline" size="sm" className="flex-1" disabled={connecting} onClick={() => setShowPermissions(false)}>
                Atsisakyti
              </Button>
              <Button size="sm" className="flex-1 bg-black hover:bg-black/90" disabled={connecting} onClick={handleAuthorize}>
                {connecting ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Leidžiama...</> : "Leisti skaityti"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}