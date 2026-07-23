import React from "react";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function PlaceholderEn({ title, description }) {
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
        <h3 className="font-bold text-slate-800">Section in progress</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          This feature is in the prototyping stage and will be available soon. You can browse other sections of the platform.
        </p>
      </Card>
    </div>
  );
}