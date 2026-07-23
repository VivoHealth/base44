import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Star, MapPin, Languages, Clock, BadgeCheck, Filter, Search, Stethoscope } from "lucide-react";
import { doctors } from "@/lib/demoData";

const specializations = ["All", "Family Medicine", "Cardiology", "Endocrinology", "Internal Medicine", "Preventive Medicine", "Lifestyle Medicine"];

export default function MarketplaceEn() {
  const [spec, setSpec] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = doctors.filter(d =>
    (spec === "All" || d.specialization === spec) &&
    (search === "" || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Find your doctor</h1>
        <p className="text-slate-500 mt-1">Choose a supervising doctor for continuous health care</p>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialization..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {specializations.map(s => (
            <button key={s} onClick={() => setSpec(s)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${spec === s ? "bg-sky-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => (
          <Card key={doc.id} className="overflow-hidden rounded-2xl border-slate-100 hover:shadow-lg transition-all">
            <div className="p-5">
              <div className="flex items-start gap-4">
                <Image src={doc.photo} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover" fittingType="fill" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-slate-800 truncate">{doc.name}</h3>
                    {doc.verified && <BadgeCheck className="w-4 h-4 text-sky-500 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-sky-600">{doc.specialization}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                    <span className="text-sm font-medium text-slate-700">{doc.rating}</span>
                    <span className="text-xs text-slate-400">({doc.reviews})</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-3 line-clamp-2">{doc.bio}</p>
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5" /> {doc.experience} yrs experience
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5" /> {doc.country}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Languages className="w-3.5 h-3.5" /> {doc.languages.join(", ")}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Stethoscope className="w-3.5 h-3.5" /> {doc.activePatients}/{doc.capacity} patients
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                <div>
                  <p className="text-xs text-slate-400">From</p>
                  <p className="text-lg font-bold text-slate-800">€{doc.price}<span className="text-xs font-normal text-slate-400">/mo</span></p>
                </div>
                {doc.available ? (
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700">Select</Button>
                ) : (
                  <Badge className="bg-slate-100 text-slate-500 border-slate-200">Not available</Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}