import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { patientProfile } from "@/lib/demoDataEn";
import { User, Heart, Activity, AlertCircle, FileText, Pill, Scissors, Users, Cigarette, Wine, Footprints, Moon, Phone } from "lucide-react";

export default function HealthProfileEn() {
  const sections = [
    { icon: User, title: "Personal information", items: [
      { label: "Full name", value: patientProfile.name },
      { label: "Age", value: `${patientProfile.age} years` },
      { label: "Gender", value: patientProfile.gender },
      { label: "Blood type", value: patientProfile.bloodType },
      { label: "City", value: patientProfile.city },
      { label: "Phone", value: patientProfile.phone },
    ]},
    { icon: Activity, title: "Height and weight", items: [
      { label: "Height", value: `${patientProfile.height} cm` },
      { label: "Weight", value: `${patientProfile.weight} kg` },
      { label: "BMI", value: patientProfile.bmi },
      { label: "BMI assessment", value: "Overweight (25–30)" },
    ]},
    { icon: AlertCircle, title: "Allergies", items: patientProfile.allergies.map(a => ({ label: "Allergen", value: a })) },
    { icon: FileText, title: "Diagnoses", items: patientProfile.diagnoses.map(d => ({ label: "Diagnosis", value: d })) },
    { icon: Pill, title: "Active medications", items: [
      { label: "Lisinopril", value: "10 mg, 1×/day" },
      { label: "Atorvastatin", value: "20 mg, 1×/day" },
    ]},
    { icon: Scissors, title: "Previous surgeries", items: patientProfile.surgeries.map(s => ({ label: "Surgery", value: s })) },
    { icon: Users, title: "Family history", items: [{ label: "Family history", value: patientProfile.familyHistory }] },
    { icon: Footprints, title: "Lifestyle", items: [
      { label: "Smoking", value: patientProfile.smoking },
      { label: "Alcohol", value: patientProfile.alcohol },
      { label: "Physical activity", value: patientProfile.activity },
      { label: "Sleep", value: patientProfile.sleep },
    ]},
    { icon: Phone, title: "Emergency contact", items: [{ label: "Contact", value: patientProfile.emergencyContact }] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Health profile</h1>
        <p className="text-slate-500 mt-1">Summary of all your health data</p>
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