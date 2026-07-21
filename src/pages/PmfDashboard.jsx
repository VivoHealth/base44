import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import FlyDieBadge from "@/components/pmf/FlyDieBadge";
import MetricCard from "@/components/pmf/MetricCard";
import {
  Gauge, Eye, Users, Target, BarChart3, Settings, Download, Trash2,
  Database, Info, Loader2,
} from "lucide-react";

const USE_CASE_LABELS = {
  launch_project: "Launch project",
  find_contributors: "Find contributors",
  manage_tasks: "Manage tasks",
  build_community: "Build community",
  funding_equity: "Funding/equity",
  other: "Other",
};

const NEED_WHEN_LABELS = {
  today: "Right now",
  this_week: "This week",
  this_month: "This month",
  just_exploring: "Exploring",
};

const pct = (v) => `${(v * 100).toFixed(1)}%`;

export default function PmfDashboard() {
  const [range, setRange] = useState("30d");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [adsSpend, setAdsSpend] = useState("");
  const [adClicks, setAdClicks] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [visits, leadRecords, quals, settingsRecords] = await Promise.all([
        base44.entities.PmfVisit.list(),
        base44.entities.PmfLead.list("-created_date", 200),
        base44.entities.PmfQual.list(),
        base44.entities.PmfSettings.list(),
      ]);

      const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;
      const since = new Date();
      since.setDate(since.getDate() - days);
      const sinceStr = since.toISOString().slice(0, 10);

      const filteredVisits = (visits || []).filter((v) => v.day >= sinceStr);
      const visitors = filteredVisits.reduce((s, v) => s + (v.visits || 0), 0);
      const pageviews = filteredVisits.reduce((s, v) => s + (v.pageviews || 0), 0);

      const filteredLeads = (leadRecords || []).filter((l) => new Date(l.created_date) >= since);
      const signups = filteredLeads.length;

      const filteredQuals = (quals || []).filter((q) => new Date(q.created_date) >= since);
      const qualified = filteredQuals.length;

      const signupRate = visitors > 0 ? signups / visitors : 0;
      const qualRate = signups > 0 ? qualified / signups : 0;
      const qpv = visitors > 0 ? qualified / visitors : 0;
      const clamp01 = (v) => Math.max(0, Math.min(1, v));
      const flyDieScore = Math.round(100 * (0.6 * clamp01(signupRate / 0.08) + 0.4 * clamp01(qualRate / 0.35)));
      const flyDieLabel = flyDieScore >= 70 ? "FLY" : flyDieScore >= 40 ? "ITERATE" : "DIE";
      const qpvLabel = qpv > 0.015 ? "FLY" : qpv >= 0.005 ? "ITERATE" : "DIE";

      const s = settingsRecords?.[0] || null;
      const adsSpendVal = s?.adsSpend30d || 0;

      const qualsByLeadId = {};
      (quals || []).forEach((q) => { qualsByLeadId[q.leadId] = q; });
      const leadsWithQuals = (leadRecords || []).map((l) => ({ ...l, qual: qualsByLeadId[l.id] || null }));

      setStats({
        visitors, pageviews, signups, qualified,
        probabilities: { pSignupVisit: signupRate, pQualSignup: qualRate, pQualVisit: qpv },
        flyDie: { score: flyDieScore, label: flyDieLabel },
        qpvMetric: { value: qpv, label: qpvLabel },
        ads: { spend: adsSpendVal, cpaSignup: signups > 0 ? adsSpendVal / signups : 0 },
      });
      setLeads(leadsWithQuals);
      setSettings(s);
    } catch (err) {
      console.error("Failed to load PMF data:", err);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSeed = async () => {
    setActionLoading(true);
    try {
      const now = new Date();
      const visitData = [];
      for (let i = 30; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const v = Math.floor(20 + Math.random() * 40);
        visitData.push({ day: d.toISOString().slice(0, 10), visits: v, pageviews: v + Math.floor(Math.random() * 20) });
      }
      await base44.entities.PmfVisit.bulkCreate(visitData);

      const useCases = ["launch_project", "find_contributors", "manage_tasks", "build_community", "funding_equity", "other"];
      const needWhens = ["today", "this_week", "this_month", "just_exploring"];
      const leadData = [];
      for (let i = 0; i < 20; i++) {
        leadData.push({
          email: `seed-user-${i}@example.com`,
          landingPath: "/launch",
          referrer: i % 3 === 0 ? "https://google.com" : i % 3 === 1 ? "https://twitter.com" : null,
          utmSource: i % 4 === 0 ? "google" : i % 4 === 1 ? "twitter" : null,
          utmCampaign: i % 5 === 0 ? "launch-q1" : null,
          country: i % 2 === 0 ? "Lithuania" : "Estonia",
        });
      }
      const createdLeads = await base44.entities.PmfLead.bulkCreate(leadData);

      const qualData = createdLeads.slice(0, 7).map((lead, i) => ({
        leadId: lead.id,
        useCase: useCases[i % useCases.length],
        needWhen: needWhens[i % needWhens.length],
        companySite: i % 2 === 0 ? `https://company${i}.com` : null,
        demoInterest: i % 3 === 0,
        demoNote: i % 3 === 0 ? "Available weekday mornings" : null,
      }));
      if (qualData.length > 0) await base44.entities.PmfQual.bulkCreate(qualData);

      await loadData();
    } catch (err) {
      console.error("Seed failed:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleClearAll = async () => {
    setActionLoading(true);
    try {
      await base44.entities.PmfVisit.deleteMany({});
      await base44.entities.PmfQual.deleteMany({});
      await base44.entities.PmfLead.deleteMany({});
      await loadData();
    } catch (err) {
      console.error("Clear failed:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      await base44.entities.PmfLead.delete(id);
      await base44.entities.PmfQual.deleteMany({ leadId: id });
      await loadData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSaveSettings = async () => {
    try {
      if (settings?.id) {
        await base44.entities.PmfSettings.update(settings.id, {
          adsSpend30d: parseFloat(adsSpend) || 0,
          adClicks30d: parseInt(adClicks) || 0,
        });
      } else {
        await base44.entities.PmfSettings.create({
          adsSpend30d: parseFloat(adsSpend) || 0,
          adClicks30d: parseInt(adClicks) || 0,
        });
      }
      setShowSettings(false);
      await loadData();
    } catch (err) {
      console.error("Settings save failed:", err);
    }
  };

  const handleExportCsv = () => {
    const header = "created_at,email,country,use_case,need_when,company_site,demo_interest,demo_note,referrer,utm_source,utm_campaign";
    const esc = (v) => {
      if (v == null) return "";
      const s = String(v);
      return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = leads.map((l) => [
      l.created_date ? new Date(l.created_date).toISOString() : "",
      l.email, l.country,
      l.qual?.useCase, l.qual?.needWhen, l.qual?.companySite,
      l.qual?.demoInterest ? "yes" : "no", l.qual?.demoNote,
      l.referrer, l.utmSource, l.utmCampaign,
    ].map(esc).join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pmf-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  const s = stats || {};
  const flyDie = s.flyDie || { score: 0, label: "DIE" };
  const probs = s.probabilities || {};
  const ads = s.ads || {};

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">PMF Dashboard</h1>
            <p className="text-sm text-gray-500">Product-Market Fit signal tracking</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 days</SelectItem>
                <SelectItem value="30d">30 days</SelectItem>
                <SelectItem value="90d">90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => {
              setAdsSpend(String(settings?.adsSpend30d || "0"));
              setAdClicks(String(settings?.adClicks30d || 0));
              setShowSettings(true);
            }}>
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleExportCsv}>
              <Download className="w-4 h-4" />
              CSV
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleSeed} disabled={actionLoading}>
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
              Seed
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Clear Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all PMF data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This permanently deletes all leads, qualifications, and visit data. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAll}>
                    {actionLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    Yes, clear everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Fly/Die Score Card */}
        <div className="border border-gray-300 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Gauge className="w-8 h-8 text-gray-700" />
            <div>
              <div className="text-sm text-gray-500">Fly / Die Score</div>
              <div className="text-4xl font-bold text-gray-900">{flyDie.score}</div>
            </div>
            <FlyDieBadge label={flyDie.label} />
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="text-xs text-gray-500">QPV</div>
              <div className="font-semibold text-gray-900">{pct(s.qpvMetric?.value || 0)}</div>
              <FlyDieBadge label={s.qpvMetric?.label || "DIE"} />
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">P(signup|visit)</div>
              <div className="font-semibold text-gray-900">{pct(probs.pSignupVisit || 0)}</div>
              <div className="text-xs text-gray-500">target 8%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">P(qual|signup)</div>
              <div className="font-semibold text-gray-900">{pct(probs.pQualSignup || 0)}</div>
              <div className="text-xs text-gray-500">target 35%</div>
            </div>
          </div>
        </div>

        {/* Methodology Panel */}
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <h3 className="font-semibold text-gray-900">How Fly / Die is calculated</h3>
              <div className="space-y-1.5 text-gray-500">
                <p>
                  <span className="font-medium text-gray-900">Score = </span>
                  round(100 * (0.6 * clamp(signupRate / 0.08) + 0.4 * clamp(qualRate / 0.35)))
                </p>
                <p>
                  <span className="font-medium text-gray-900">signupRate</span> = signups / visitors &mdash; target: 8%
                </p>
                <p>
                  <span className="font-medium text-gray-900">qualRate</span> = qualified / signups &mdash; target: 35%
                </p>
                <p>clamp() caps each ratio at 1.0 so over-performing on one metric can't mask the other.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <FlyDieBadge label="FLY" />
                  <span className="text-gray-500">QPV &gt; 1.5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <FlyDieBadge label="ITERATE" />
                  <span className="text-gray-500">QPV 0.5% &ndash; 1.5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <FlyDieBadge label="DIE" />
                  <span className="text-gray-500">QPV &lt; 0.5%</span>
                </div>
              </div>
              <p className="text-gray-500 pt-1">
                <span className="font-medium text-gray-900">QPV</span> (Qualified Per Visit) = qualified / visitors &mdash; the single most important metric combining both conversion steps.
              </p>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard title="Visitors" value={s.visitors || 0} icon={Eye} subtitle={`${s.pageviews || 0} pageviews`} />
          <MetricCard title="Signups" value={s.signups || 0} icon={Users} subtitle={pct(probs.pSignupVisit || 0)} />
          <MetricCard title="Qualified" value={s.qualified || 0} icon={Target} subtitle={pct(probs.pQualSignup || 0)} />
          <MetricCard
            title="CPA (Signup)"
            value={ads.spend > 0 ? `€${ads.cpaSignup?.toFixed(2)}` : "n/a"}
            icon={BarChart3}
            subtitle={ads.spend > 0 ? `€${ads.spend} spent` : "No ad spend set"}
          />
        </div>

        {/* Recent Leads */}
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="font-semibold text-gray-900">Recent Leads</h3>
            <Badge className="bg-pink-100 text-pink-600 border-transparent">{leads.length} total</Badge>
          </div>
          {leads.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No leads yet. Share the /launch page or seed test data.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Use Case</TableHead>
                    <TableHead>Timing</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Demo</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.email}</TableCell>
                      <TableCell>
                        {lead.registrationType ? (
                          <Badge variant={lead.registrationType === "doctor" ? "default" : "secondary"}>
                            {lead.registrationType === "doctor" ? "Doctor" : "User"}
                          </Badge>
                        ) : (
                          <span className="text-xs text-gray-400">--</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {lead.created_date ? new Date(lead.created_date).toLocaleDateString() : ""}
                      </TableCell>
                      <TableCell>
                        {lead.qual?.useCase ? (
                          <Badge variant="secondary">{USE_CASE_LABELS[lead.qual.useCase] || lead.qual.useCase}</Badge>
                        ) : (
                          <span className="text-xs text-gray-400">--</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {lead.qual?.needWhen ? NEED_WHEN_LABELS[lead.qual.needWhen] || lead.qual.needWhen : "--"}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {lead.utmSource || lead.utmCampaign || "--"}
                      </TableCell>
                      <TableCell className="text-sm">{lead.country || "--"}</TableCell>
                      <TableCell>
                        {lead.qual?.demoInterest ? (
                          <Badge>Yes</Badge>
                        ) : (
                          <span className="text-xs text-gray-400">No</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete lead?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This permanently removes {lead.email} and all associated data (GDPR delete).
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteLead(lead.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Ad Spend Settings</DialogTitle>
            <DialogDescription>Configure ad spend to calculate CPA metrics.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Ad Spend (30d total, €)</Label>
              <Input type="number" step="0.01" value={adsSpend} onChange={(e) => setAdsSpend(e.target.value)} placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label>Ad Clicks (30d total)</Label>
              <Input type="number" value={adClicks} onChange={(e) => setAdClicks(e.target.value)} placeholder="0" />
            </div>
          </div>
          <Button onClick={handleSaveSettings}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}