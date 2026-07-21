import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { patientProfile } from "@/lib/demoData";
import { User, Heart, Activity, AlertCircle, FileText, Pill, Scissors, Users, Cigarette, Wine, Footprints, Moon, Phone } from "lucide-react";

export default function HealthProfile() {
  const sections = [
    { icon: User, title: "Asmeninė informacija", items: [
      { label: "Vardas, pavardė", value: patientProfile.name },
      { label: "Amžius", value: `${patientProfile.age} metai` },
      { label: "Lytis", value: patientProfile.gender },
      { label: "Kraujo grupė", value: patientProfile.bloodType },
      { label: "Miestas", value: patientProfile.city },
      { label: "Telefonas", value: patientProfile.phone },
    ]},
    { icon: Activity, title: "Ūgis ir svoris", items: [
      { label: "Ūgis", value: `${patientProfile.height} cm` },
      { label: "Svoris", value: `${patientProfile.weight} kg` },
      { label: "KMI", value: patientProfile.bmi },
      { label: "KMI vertinimas", value: "Antsvoris (25–30)" },
    ]},
    { icon: AlertCircle, title: "Alergijos", items: patientProfile.allergies.map(a => ({ label: "Alergenas", value: a })) },
    { icon: FileText, title: "Diagnozės", items: patientProfile.diagnoses.map(d => ({ label: "Diagnozė", value: d })) },
    { icon: Pill, title: "Aktyvūs vaistai", items: [
      { label: "Lisinoprilis", value: "10 mg, 1×/d." },
      { label: "Atorvastatinas", value: "20 mg, 1×/d." },
    ]},
    { icon: Scissors, title: "Ankstesnės operacijos", items: patientProfile.surgeries.map(s => ({ label: "Operacija", value: s })) },
    { icon: Users, title: "Šeimos anamnezė", items: [{ label: "Šeimos istorija", value: patientProfile.familyHistory }] },
    { icon: Footprints, title: "Gyvensena", items: [
      { label: "Rūkymas", value: patientProfile.smoking },
      { label: "Alkoholis", value: patientProfile.alcohol },
      { label: "Fizinis aktyvumas", value: patientProfile.activity },
      { label: "Miegas", value: patientProfile.sleep },
    ]},
    { icon: Phone, title: "Skubiojo kontakto informacija", items: [{ label: "Kontaktas", value: patientProfile.emergencyContact }] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sveikatos profilis</h1>
        <p className="text-slate-500 mt-1">Visų jūsų sveikatos duomenų santrauka</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {sections.map((s, i) => (
          <Card key={i} className="p-6 rounded-2xl border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-sky-600" />
              </div>
              <h3 className="font-bold text-slate-800">{s.title}</h3>
            </div>
            <div className="space-y-2">
              {s.items.map((item, j) => (
                <div key={j} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500">{item.label}</span>
                  <span className="text-sm font-medium text-slate-800 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}