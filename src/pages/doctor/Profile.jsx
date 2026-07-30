import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User, GraduationCap, Award, Building2, Languages, Clock,
  Phone, Mail, MapPin, Shield, Stethoscope, Save, Loader2, Pencil, CheckCircle2
} from "lucide-react";

const initialProfile = {
  name: "Dr. Aistė Kazlauskienė",
  specialty: "Šeimos medicina",
  license: "L-LSM-47210",
  status: "Patvirtinta",
  experience: "12 metų",
  clinic: "Vilniaus šeimos sveikatos centras",
  address: "Gedimino pr. 12, Vilnius",
  phone: "+370 600 12345",
  email: "aiste.kazlauskiene@vivo.lt",
  languages: ["Lietuvių", "Anglų", "Rusų"],
  education: [
    { year: "2008", title: "Vilniaus universitetas, Medicinos diplomas (MD)" },
    { year: "2011", title: "Rezidentūra, Šeimos medicina, Vilniaus universitetas" },
    { year: "2019", title: "Sertifikatas, Lėtinių ligų valdymas" },
  ],
  qualifications: [
    "Lietuvos gydytojų sąjungos narė",
    "Sertifikacija – kardiologinių rizikos veiksnių vertinimas",
    "Sertifikacija – antsvorio ir metabolinio sindromo valdymas",
  ],
  bio: "Šeimos gydytoja su daugiau nei 12 metų patirtimi, specializuojanti lėtinių ligų (hipertenzija, cukrinis diabetas, metabolinis sindromas) stebėjime ir valdyme. Tiki nuolatiniu paciento įsitraukimu bei skaitmeninės sveikatos galimybėmis.",
  hours: "Pirm.–Pen. 8:00–18:00",
  consultationTypes: ["Vaizdo konsultacija", "Sūnus vizitas", "Nuotolinis stebėjimas"],
};

export default function DoctorProfile() {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (field) => (e) => {
    setProfile({ ...profile, [field]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Profesinis profilis</h1>
          <p className="text-slate-500 mt-1">Jūsų gydytojo registracijos ir kvalifikacijos duomenys</p>
        </div>
        {saved && (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Išsaugota
          </Badge>
        )}
        <Button
          variant={editing ? "default" : "outline"}
          onClick={() => editing ? handleSave() : setEditing(true)}
          disabled={saving}
        >
          {editing ? (
            saving ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Išsaugoma...</>
            ) : (
              <><Save className="w-4 h-4 mr-2" /> Išsaugoti</>
            )
          ) : (
            <><Pencil className="w-4 h-4 mr-2" /> Redaguoti</>
          )}
        </Button>
      </div>

      {/* Verification banner */}
      <Card className="p-5 rounded-2xl border-emerald-100 bg-emerald-50/30 flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-800">Paskyra patvirtinta</p>
          <p className="text-sm text-slate-500">Licencija patikrinta • galioja iki 2027-01-15</p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Aktyvi</Badge>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal info */}
        <Card className="p-6 rounded-2xl border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
              <User className="w-4 h-4 text-sky-600" />
            </div>
            <h3 className="font-bold text-slate-800">Asmeninė informacija</h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-slate-500">Vardas, pavardė</Label>
              {editing ? (
                <Input value={profile.name} onChange={handleChange("name")} className="h-10" />
              ) : (
                <p className="text-sm font-medium text-slate-800">{profile.name}</p>
              )}
            </div>
            <div>
              <Label className="text-xs text-slate-500">Telefonas</Label>
              {editing ? (
                <Input value={profile.phone} onChange={handleChange("phone")} className="h-10" />
              ) : (
                <p className="text-sm font-medium text-slate-800">{profile.phone}</p>
              )}
            </div>
            <div>
              <Label className="text-xs text-slate-500">El. paštas</Label>
              {editing ? (
                <Input value={profile.email} onChange={handleChange("email")} className="h-10" />
              ) : (
                <p className="text-sm font-medium text-slate-800">{profile.email}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Professional info */}
        <Card className="p-6 rounded-2xl border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-800">Profesiniai duomenys</h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-slate-500">Specialybė</Label>
              {editing ? (
                <Input value={profile.specialty} onChange={handleChange("specialty")} className="h-10" />
              ) : (
                <p className="text-sm font-medium text-slate-800">{profile.specialty}</p>
              )}
            </div>
            <div>
              <Label className="text-xs text-slate-500">Licencijos Nr.</Label>
              <p className="text-sm font-medium text-slate-800">{profile.license}</p>
            </div>
            <div>
              <Label className="text-xs text-slate-500">Patirtis</Label>
              <p className="text-sm font-medium text-slate-800">{profile.experience}</p>
            </div>
          </div>
        </Card>

        {/* Clinic */}
        <Card className="p-6 rounded-2xl border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-violet-600" />
            </div>
            <h3 className="font-bold text-slate-800">Darbovietė</h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-slate-500">Įstaiga</Label>
              {editing ? (
                <Input value={profile.clinic} onChange={handleChange("clinic")} className="h-10" />
              ) : (
                <p className="text-sm font-medium text-slate-800">{profile.clinic}</p>
              )}
            </div>
            <div>
              <Label className="text-xs text-slate-500">Adresas</Label>
              {editing ? (
                <Input value={profile.address} onChange={handleChange("address")} className="h-10" />
              ) : (
                <p className="text-sm font-medium text-slate-800">{profile.address}</p>
              )}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">{profile.hours}</span>
            </div>
          </div>
        </Card>

        {/* Languages */}
        <Card className="p-6 rounded-2xl border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Languages className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-800">Kalbos</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="bg-slate-100 text-slate-700">
                {lang}
              </Badge>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50">
            <Label className="text-xs text-slate-500 mb-2 block">Konsultacijų tipai</Label>
            <div className="flex flex-wrap gap-2">
              {profile.consultationTypes.map((type) => (
                <Badge key={type} className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Education */}
      <Card className="p-6 rounded-2xl border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="font-bold text-slate-800">Išsilavinimas ir mokymai</h3>
        </div>
        <div className="space-y-3">
          {profile.education.map((edu, i) => (
            <div key={i} className="flex items-start gap-4 py-2 border-b border-slate-50 last:border-0">
              <Badge variant="outline" className="bg-slate-50 text-slate-600 font-mono">{edu.year}</Badge>
              <p className="text-sm font-medium text-slate-800 pt-0.5">{edu.title}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Qualifications */}
      <Card className="p-6 rounded-2xl border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center">
            <Award className="w-4 h-4 text-rose-600" />
          </div>
          <h3 className="font-bold text-slate-800">Kvalifikacijos ir sertifikatai</h3>
        </div>
        <div className="space-y-2">
          {profile.qualifications.map((q, i) => (
            <div key={i} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">{q}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Bio */}
      <Card className="p-6 rounded-2xl border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
            <User className="w-4 h-4 text-teal-600" />
          </div>
          <h3 className="font-bold text-slate-800">Apie gydytoją</h3>
        </div>
        {editing ? (
          <Textarea value={profile.bio} onChange={handleChange("bio")} rows={4} />
        ) : (
          <p className="text-sm text-slate-600 leading-relaxed">{profile.bio}</p>
        )}
      </Card>
    </div>
  );
}