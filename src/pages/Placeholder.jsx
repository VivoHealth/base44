import React from "react";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function Placeholder({ title, description }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {description && <p className="text-slate-500 mt-1">{description}</p>}
      </div>
      <Card className="p-12 rounded-2xl border-slate-100 text-center">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center mx-auto mb-4">
          <Construction className="w-8 h-8 text-sky-500" />
        </div>
        <h3 className="font-bold text-slate-800">Sekcija ruošiama</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Ši funkcija yra prototipo ruošimo etape ir greitai bus prieinama. Galite naršyti kitas platformos sekcijas.
        </p>
      </Card>
    </div>
  );
}