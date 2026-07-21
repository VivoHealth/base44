import { base44 } from "@/api/base44Client";

const VISIT_DAY_KEY = "pmf_visit_day";

export async function trackVisit() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const lastDay = localStorage.getItem(VISIT_DAY_KEY);
    const isNewVisit = lastDay !== today;

    const existing = await base44.entities.PmfVisit.filter({ day: today });
    if (existing && existing.length > 0) {
      const record = existing[0];
      await base44.entities.PmfVisit.update(record.id, {
        visits: (record.visits || 0) + (isNewVisit ? 1 : 0),
        pageviews: (record.pageviews || 0) + 1,
      });
    } else {
      await base44.entities.PmfVisit.create({
        day: today,
        visits: 1,
        pageviews: 1,
      });
    }

    if (isNewVisit) {
      localStorage.setItem(VISIT_DAY_KEY, today);
    }
  } catch (err) {
    // Silent fail — don't break the page
  }
}

export async function trackRegistration(email) {
  if (!email) return;
  try {
    const existing = await base44.entities.PmfLead.filter({ email });
    if (existing && existing.length > 0) return;

    const params = new URLSearchParams(window.location.search);
    await base44.entities.PmfLead.create({
      email,
      landingPath: window.location.pathname,
      referrer: document.referrer || null,
      utmSource: params.get("utm_source") || null,
      utmMedium: params.get("utm_medium") || null,
      utmCampaign: params.get("utm_campaign") || null,
      utmContent: params.get("utm_content") || null,
    });
  } catch (err) {
    // Silent fail
  }
}