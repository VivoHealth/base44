import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";
import {
  Heart, Activity, FileText, ShieldCheck, Bell, Stethoscope, Brain,
  CheckCircle2, Clock, ArrowRight, Smartphone, Watch, FlaskConical,
  FilePlus, Edit3, Lock, AlertTriangle, Users, TrendingUp, MessageSquare,
  Calendar, BadgeCheck, ChevronRight,
} from "lucide-react";
import { bloodPressureData } from "@/lib/demoData";
import Logo from "@/components/Logo";
import { useAuth } from "@/lib/AuthContext";
import { trackVisit, trackRegistration } from "@/lib/pmfTracking";

const bpChartData = bloodPressureData.slice(-14).map(r => ({
  date: r.date.slice(5),
  sistolinis: r.systolic,
  diastolinis: r.diastolic,
}));

export default function Landing() {
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    trackVisit();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      trackRegistration(user.email);
    }
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold text-slate-800">MyHealthPilot</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#kaip-veikia" className="hover:text-sky-600 transition-colors">Kaip veikia</a>
            <a href="#nauda" className="hover:text-sky-600 transition-colors">Nauda</a>
            <a href="#integracijos" className="hover:text-sky-600 transition-colors">Integracijos</a>
            <a href="#kainos" className="hover:text-sky-600 transition-colors">Kainos</a>
            <a href="#gydytojams" className="hover:text-sky-600 transition-colors">Gydytojams</a>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <Link to={user?.role === "admin" ? "/admin" : "/pacientas"}>
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700">Skydelis</Button>
                </Link>
                <span className="text-sm text-slate-500 hidden sm:inline max-w-[160px] truncate">{user?.email}</span>
                <Button variant="ghost" size="sm" onClick={() => logout()}>Atsijungti</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-white" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-6 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
              <ShieldCheck className="w-3 h-3 mr-1" /> AI stebėjimas + gydytojo priežiūra
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight tracking-tight">
              Jūsų sveikata stebima AI ir prižiūrima jūsų pasirinkto gydytojo
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              MyHealthPilot sujungia jūsų medicininius įrašus, matavimus, simptomus ir sveikatos prietaisus į vieną asmeninę sveikatos profilį. AI asistentas stebi pokyčius ir paruošia aiškias santraukas jūsų pasirinktam gydytojui.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/register?type=user"><Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-base px-8">
                Sukurti sveikatos profilį <ArrowRight className="w-4 h-4 ml-2" />
              </Button></Link>
              <Link to="/register?type=doctor"><Button size="lg" variant="outline" className="text-base px-8 border-slate-200">
                Prisijungti kaip gydytojas <Stethoscope className="w-4 h-4 ml-2" />
              </Button></Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Lock className="w-4 h-4" /> GDPR atitiktis</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Saugus duomenų saugojimas</div>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-sky-200/30 to-emerald-200/30 rounded-3xl blur-2xl" />
            <Card className="relative p-6 shadow-2xl border-slate-100 rounded-3xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm text-slate-500">Sveikatos stebėjimo skydelis</p>
                  <p className="text-lg font-bold text-slate-800">Jonas Petrauskas</p>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Stebima</Badge>
              </div>

              {/* BP chart */}
              <div className="mb-4 p-4 bg-sky-50/50 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
                    <span className="text-sm font-medium text-slate-700">Kraujospūdžio tendencija</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">132/84</span>
                </div>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={bpChartData}>
                    <defs>
                      <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="sistolinis" stroke="#0ea5e9" strokeWidth={2} fill="url(#bpGrad)" />
                    <Line type="monotone" dataKey="diastolinis" stroke="#10b981" strokeWidth={2} dot={false} />
                    <XAxis dataKey="date" hide />
                    <YAxis hide domain={[60, 150]} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-3.5 h-3.5 text-sky-500" />
                    <span className="text-xs text-slate-500">Naujausia santrauka</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700">Savaitės ataskaita</p>
                  <p className="text-xs text-slate-400">Paruošta liepos 20 d.</p>
                </div>
                <div className="p-3 bg-white border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs text-slate-500">Gydytojo priežiūra</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700">Dr. A. Kazlauskienė</p>
                  <p className="text-xs text-emerald-600">Aktyvi</p>
                </div>
                <div className="p-3 bg-white border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Bell className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs text-slate-500">Priminimai</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700">Atorvastatinas</p>
                  <p className="text-xs text-amber-600">Šiandien 21:00</p>
                </div>
                <div className="p-3 bg-white border border-rose-100 rounded-2xl bg-rose-50/30">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-xs text-slate-500">Įspėjimai</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700">Aukštas kraujospūdis</p>
                  <p className="text-xs text-rose-600">Reikia dėmesio</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="kaip-veikia" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-sky-50 text-sky-600 border-sky-100">Kaip veikia</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Keturi žingsniai iki nuolatinės sveikatos priežiūros</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FilePlus, title: "Sukurkite sveikatos profilį", desc: "Įveskite asmeninę informaciją, diagnozes, vaistus ir alergijas.", color: "sky" },
              { icon: Smartphone, title: "Prijunkite prietaisus ir įkelkite įrašus", desc: "OMRON, Apple Health, laboratoriniai rezultatai ir dokumentai vienoje vietoje.", color: "emerald" },
              { icon: Stethoscope, title: "Pasirinkite prižiūrintį gydytoją", desc: "Raskite specialistą, kuris pažįsta jūsų sveikatos istoriją.", color: "sky" },
              { icon: Activity, title: "Gaukite nuolatinį stebėjimą", desc: "AI stebi pokyčius, gydytojas peržiūri santraukas ir teikia atsiliepimus.", color: "emerald" },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="p-6 rounded-3xl border border-slate-100 hover:border-sky-200 hover:shadow-lg transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    step.color === "sky" ? "bg-sky-50 text-sky-600" : "bg-emerald-50 text-emerald-600"
                  } group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-slate-300 mb-2">0{i + 1}</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="nauda" className="py-20 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-emerald-50 text-emerald-600 border-emerald-100">Pagrindinė nauda</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Sukurta pacientams ir gydytojams</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 rounded-3xl border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Pacientams</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Viena išsami sveikatos istorija",
                  "Suprantami AI paaiškinimai",
                  "Nuolatinis stebėjimas tarp vizitų",
                  "Gydytojas, kuris jau pažįsta jūsų istoriją",
                  "Ankstyvas svarbių pokyčių atpažinimas",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-8 rounded-3xl border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Gydytojams</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Pasikartojantys mėnesiniai pajamai",
                  "AI paruoštos pacientų santraukos",
                  "Mažiau laiko peržiūrint žalius duomenis",
                  "Aiškus pacientų prioritetizavimas",
                  "Kontrolė pacientų skaičiui ir planams",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integracijos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-sky-50 text-sky-600 border-sky-100">Palaikomi sveikatos duomenys</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Visi jūsų sveikatos duomenys vienoje vietoje</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "OMRON", desc: "Kraujospūdžio monitoriai", status: "Prijungta", color: "emerald", icon: Heart },
              { name: "Apple Health", desc: "Sveikatos duomenys iš iPhone", status: "Galima", color: "sky", icon: Smartphone },
              { name: "Android Health Connect", desc: "Sveikatos duomenys iš Android", status: "Galima", color: "sky", icon: Smartphone },
              { name: "Garmin", desc: "Fizinio aktyvumo stebėjimas", status: "Greitai", color: "amber", icon: Watch },
              { name: "Fitbit", desc: "Aktyvumo ir miego stebėjimas", status: "Greitai", color: "amber", icon: Watch },
              { name: "Oura", desc: "Miego ir sveikatos žiedas", status: "Greitai", color: "amber", icon: Watch },
              { name: "Laboratoriniai rezultatai", desc: "PDF ataskaitų įkėlimas", status: "Galima", color: "sky", icon: FlaskConical },
              { name: "Medicininiai dokumentai", desc: "Ataskaitų ir išrašų saugojimas", status: "Galima", color: "sky", icon: FileText },
              { name: "Rankiniai matavimai", desc: "Rankinis duomenų įvedimas", status: "Prijungta", color: "emerald", icon: Edit3 },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
                    item.color === "amber" ? "bg-amber-50 text-amber-600" : "bg-sky-50 text-sky-600"
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <Badge className={
                    item.status === "Prijungta" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    item.status === "Greitai" ? "bg-amber-50 text-amber-700 border-amber-200" :
                    "bg-slate-50 text-slate-600 border-slate-200"
                  }>{item.status}</Badge>
                </div>
                <h3 className="font-semibold text-slate-800">{item.name}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="kainos" className="py-20 bg-gradient-to-b from-white to-sky-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-emerald-50 text-emerald-600 border-emerald-100">Kainos</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Pasirinkite savo planą</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Tikslios paslaugos priklauso nuo pasirinkto gydytojo plano.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "AI Sveikata", price: 9, color: "slate",
                features: ["Asmeninis sveikatos profilis", "AI sveikatos asistentas", "Dokumentų įkėlimas", "Sveikatos stebėjimas", "Mėnesinė AI santrauka"],
                highlighted: false,
              },
              {
                name: "Gydytojo Priežiūra", price: 39, color: "sky",
                features: ["Viskas iš AI Sveikata plano", "Pasirinktas prižiūrintis gydytojas", "Mėnesinė gydytojo peržiūra", "Gydytojo atsiliepimas", "Svarbių pokyčių įspėjimai", "Saugus susirašinėjimas"],
                highlighted: true,
              },
              {
                name: "Aktyvi Priežiūra", price: 79, color: "emerald",
                features: ["Viskas iš Gydytojo Priežiūros", "Dvi gydytojo peržiūros per mėn.", "Prioritetinis susirašinėjimas", "Vieno vaizdo konsultacija per mėn.", "Personalizuotos stebėjimo ribos"],
                highlighted: false,
              },
            ].map((plan) => (
              <Card key={plan.name} className={`p-8 rounded-3xl relative ${
                plan.highlighted ? "border-sky-300 shadow-xl shadow-sky-100 lg:scale-105" : "border-slate-100"
              }`}>
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white">Populiariausias</Badge>
                )}
                <h3 className="text-lg font-bold text-slate-800 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-800">€{plan.price}</span>
                  <span className="text-slate-500">/mėn.</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.color === "sky" ? "text-sky-500" : plan.color === "emerald" ? "text-emerald-500" : "text-slate-400"
                      }`} />
                      <span className="text-sm text-slate-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="block">
                  <Button className={`w-full ${
                    plan.highlighted ? "bg-sky-600 hover:bg-sky-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}>Pasirinkti planą</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor CTA */}
      <section id="gydytojams" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Card className="overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-sky-600 to-emerald-600">
            <div className="p-8 sm:p-12 text-center text-white">
              <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Sukurkite prenumeratos ryšį su savo pacientais</h2>
              <p className="text-lg text-sky-50 max-w-2xl mx-auto mb-8">
                Gydytojai gali skelbti priežiūros planus, nustatyti pacientų ribas, gauti AI sugeneruotas santraukas ir valdyti pasikartojančius pacientus.
              </p>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-base px-8 bg-white text-sky-700 hover:bg-sky-50">
                  Sukurti gydytojo profilį <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Safety disclaimer */}
      <section className="py-12 bg-amber-50/50 border-y border-amber-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-1">Saugumo pranešimas</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              MyHealthPilot nepakeičia skubiosios medicinos pagalbos. Esant kritinei situacijai, nedelsdami kreipkitės į vietinius pagalbos tarnybų numerius. AI sugeneruota informacija yra mokomojo pobūdžio ir turi būti peržiūrėta kvalifikuoto sveikatos priežiūros specialisto.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo className="w-8 h-8" />
                <span className="text-lg font-bold text-slate-800">MyHealthPilot</span>
              </div>
              <p className="text-sm text-slate-500">Jūsų sveikata, stebima AI ir prižiūrima patikimo gydytojo.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-3 text-sm">Produktas</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#kaip-veikia" className="hover:text-sky-600">Kaip veikia</a></li>
                <li><a href="#kainos" className="hover:text-sky-600">Kainos</a></li>
                <li><a href="#integracijos" className="hover:text-sky-600">Integracijos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-3 text-sm">Paskyros</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/register" className="hover:text-sky-600">Registruotis kaip pacientas</Link></li>
                <li><Link to="/register" className="hover:text-sky-600">Registruotis kaip gydytojas</Link></li>
                <li><Link to="/login" className="hover:text-sky-600">Prisijungti</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-3 text-sm">Teisinė informacija</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-1"><Lock className="w-3 h-3" /> GDPR atitiktis</li>
                <li className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Privatumo politika</li>
                <li className="flex items-center gap-1"><FileText className="w-3 h-3" /> Paslaugų sąlygos</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
            © 2026 MyHealthPilot. Visos teisės saugomos. Ne skubiosios pagalbos paslauga.
          </div>
        </div>
      </footer>
    </div>
  );
}