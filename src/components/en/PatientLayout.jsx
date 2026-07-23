import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import {
  LayoutDashboard, Bot, User, Activity, FlaskConical, FileText,
  Pill, Stethoscope, MessageSquare, CreditCard, Plug, Settings,
  LogOut, Menu, X, Bell,
} from "lucide-react";

const navItems = [
  { label: "Overview", path: "/en/patient", icon: LayoutDashboard },
  { label: "AI Assistant", path: "/en/patient/ai", icon: Bot },
  { label: "Health Profile", path: "/en/patient/profile", icon: User },
  { label: "Measurements", path: "/en/patient/measurements", icon: Activity },
  { label: "Lab Results", path: "/en/patient/lab", icon: FlaskConical },
  { label: "Documents", path: "/en/patient/documents", icon: FileText },
  { label: "Medications", path: "/en/patient/medications", icon: Pill },
  { label: "My Doctor", path: "/en/patient/doctor", icon: Stethoscope },
  { label: "Messages", path: "/en/patient/messages", icon: MessageSquare },
  { label: "Subscription", path: "/en/patient/subscription", icon: CreditCard },
  { label: "Integrations", path: "/en/patient/integrations", icon: Plug },
  { label: "Settings", path: "/en/patient/settings", icon: Settings },
];

export default function PatientLayoutEn() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    await base44.auth.logout();
    window.location.href = "/en/login";
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Link to="/en" className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-bold text-slate-800">MyHealthPilot</span>
        </Link>
      </div>
      <div className="px-4 mb-4">
        <div className="p-3 rounded-2xl bg-sky-50/50 border border-sky-100">
          <p className="text-xs text-slate-500">Patient</p>
          <p className="text-sm font-semibold text-slate-800">John Barter</p>
          <p className="text-xs text-sky-600">Under doctor's care</p>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-slate-50"
              }`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-100">
        <Button variant="ghost" size="sm" className="w-full justify-start text-slate-500" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" /> Log out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-100 fixed h-screen">
        <SidebarContent />
      </aside>
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-white border-r border-slate-100 h-full">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/20" onClick={() => setOpen(false)} />
        </div>
      )}
      <div className="flex-1 lg:ml-64">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex-1" />
          <button className="relative p-2 rounded-xl hover:bg-slate-50">
            <Bell className="w-5 h-5 text-slate-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <div className="ml-2 w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-white text-sm font-semibold">
            JB
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}