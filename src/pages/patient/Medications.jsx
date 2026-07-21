import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, Check, Clock, Plus, User } from "lucide-react";
import { medications } from "@/lib/demoData";

export default function Medications() {
  const [meds, setMeds] = useState(medications);

  const toggleTaken = (id) => {
    setMeds(meds.map(m => m.id === id ? { ...m, takenToday: !m.takenToday } : m));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Vaistai</h1>
          <p className="text-slate-500 mt-1">Jūsų aktyvūs vaistai ir priminimai</p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700"><Plus className="w-4 h-4 mr-1" /> Pridėti vaistą</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-4 rounded-2xl border-slate-100">
          <p className="text-xs text-slate-500">Aktyvūs vaistai</p>
          <p className="text-2xl font-bold text-slate-800">{meds.filter(m => m.active).length}</p>
        </Card>
        <Card className="p-4 rounded-2xl border-slate-100">
          <p className="text-xs text-slate-500">Išgerta šiandien</p>
          <p className="text-2xl font-bold text-emerald-600">{meds.filter(m => m.takenToday).length}/{meds.length}</p>
        </Card>
        <Card className="p-4 rounded-2xl border-slate-100">
          <p className="text-xs text-slate-500">Praleistos dozės (mėn.)</p>
          <p className="text-2xl font-bold text-amber-600">3</p>
        </Card>
      </div>

      <div className="space-y-4">
        {meds.map((med) => (
          <Card key={med.id} className="p-5 rounded-2xl border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                <Pill className="w-6 h-6 text-violet-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800">{med.name}</h3>
                  <Badge className="bg-violet-50 text-violet-700 border-violet-200">{med.dose}</Badge>
                  {med.active ? (
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Aktyvus</Badge>
                  ) : (
                    <Badge className="bg-slate-50 text-slate-500 border-slate-200">Nutrauktas</Badge>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-1">{med.frequency}</p>
                <p className="text-sm text-slate-400 mt-1">{med.instructions}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Priminimas: {med.reminder}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {med.doctor}</span>
                  <span>Nuo: {med.startDate}</span>
                </div>
              </div>
              <Button
                onClick={() => toggleTaken(med.id)}
                variant={med.takenToday ? "default" : "outline"}
                className={med.takenToday ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                size="sm"
              >
                {med.takenToday ? <><Check className="w-4 h-4 mr-1" /> Išgerta</> : "Pažymėti išgertą"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}