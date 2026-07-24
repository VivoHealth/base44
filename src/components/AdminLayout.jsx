import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import {
  LayoutDashboard, Stethoscope, Users, CreditCard, Wallet,
  ShieldAlert, Plug, FileText, Settings, Heart, LogOut, Menu, X, Bell,
} from "lucide-react";

const navItems = [
  { label: "Apžvalga", path: "/admin", icon: LayoutDashboard },
  { label: "Gydytojai", path: "/admin/gydytojai", icon: Stethoscope },
  { label: "Pacientai", path: "/admin/pacientai", icon: Users },
  { label: "Prenumeratos", path: "/admin/prenumeratos", icon: CreditCard },
  { label: "Mokėjimai", path: "/admin/mokejimai", icon: Wallet },
  { label: "Saugumas", path: "/admin/saugumas", icon: ShieldAlert },
  { label: "Integracijos", path: "/admin/integracijos", icon: Plug },
  { label: "Turinys", path: "/admin/turinys", icon: FileText },
  { label: "Nustatymai", path: "/admin/nustatymai", icon: Settings },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    await base44.auth.logout();
    window.location.href = "/login";
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-52 h-16" />
        </Link>
      </div>
      <div className="px-4 mb-4">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-500">Administratorius</p>
          <p className="text-sm font-semibold text-slate-800">Sistemos valdyba</p>
          <p className="text-xs text-slate-400">Pilna prieiga</p>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? "bg-slate-100 text-slate-800" : "text-slate-600 hover:bg-slate-50"
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
          <LogOut className="w-4 h-4 mr-2" /> Atsijungti
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
          <div className="ml-2 w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-sm font-semibold">
            AD
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}