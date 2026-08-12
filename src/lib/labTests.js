// Laboratorinių tyrimų katalogas (iš Excel / jpg) + pagalbinės funkcijos
// Normų kodavimas:
//   direction "lower"  → refHigh = viršutinė riba (< reikšmė gera)
//   direction "higher" → refLow  = apatinė riba (> reikšmė gera)
//   direction "range"  → refLow..refHigh = intervalas
//   direction "info"   → normos nėra (informacinis matavimas)
// Įrašai: numeric { date, value } arba pastabos { date, note, status }

export const labGroups = [
  { id: "sirdis", label: "Širdies tyrimai" },
  { id: "hormonai", label: "Hormonai" },
  { id: "apykaita", label: "Medžiagų apykaita" },
  { id: "kunas", label: "Kūnas (cm)" },
];

const BASE = "2009-08-12";

export const labTests = [
  // --- Širdis ---
  {
    id: "chol", name: "Cholesterolis", unit: "mmol/l", group: "sirdis",
    direction: "lower", refHigh: 5.2, refLabel: "< 5,2",
    history: [{ date: BASE, value: 5.8 }],
  },
  {
    id: "ldl", name: "LDL (MTL-chol)", unit: "mmol/l", group: "sirdis",
    direction: "lower", refHigh: 3.36, refLabel: "< 3,36",
    history: [{ date: BASE, value: 3.47 }],
  },
  {
    id: "hdl", name: "HDL (DTL-chol)", unit: "mmol/l", group: "sirdis",
    direction: "higher", refLow: 1.04, refLabel: "> 1,04",
    history: [{ date: BASE, value: 0.98 }],
  },
  {
    id: "tg", name: "Trigliceridai", unit: "mmol/l", group: "sirdis",
    direction: "lower", refHigh: 1.82, refLabel: "< 1,82",
    history: [{ date: BASE, value: 5.35 }],
  },
  {
    id: "glu", name: "Glukozė", unit: "mmol/l", group: "sirdis",
    direction: "lower", refHigh: 5.89, refLabel: "< 5,89",
    history: [{ date: BASE, value: 4.5 }],
  },
  {
    id: "cac", name: "Arterijų užkalkejimo tomografija", unit: "", group: "sirdis",
    direction: "info", refLabel: "",
    history: [{ date: BASE, note: "Spalio mėn.", status: "scheduled" }],
  },
  {
    id: "imt", name: "Carotid IMT", unit: "", group: "sirdis",
    direction: "info", refLabel: "",
    history: [{ date: BASE, note: "Norma", status: "normal" }],
  },

  // --- Hormonai ---
  {
    id: "t3", name: "T3", unit: "pmol/l", group: "hormonai",
    direction: "range", refLow: 1.3, refHigh: 6.8, refLabel: "1,3–6,8",
    history: [{ date: BASE, value: 4.89 }],
  },
  {
    id: "t4", name: "T4", unit: "pmol/l", group: "hormonai",
    direction: "range", refLow: 12, refHigh: 22, refLabel: "12–22",
    history: [{ date: BASE, value: 15.44 }],
  },
  {
    id: "dhea", name: "DHEA sulfatas", unit: "μmol/l", group: "hormonai",
    direction: "range", refLow: 2.41, refHigh: 11.6, refLabel: "2,41–11,6",
    history: [{ date: BASE, value: 4.27 }],
  },
  {
    id: "igf1", name: "IGF-1", unit: "ng/mL", group: "hormonai",
    direction: "range", refLow: 154, refHigh: 270, refLabel: "154–270",
    history: [{ date: BASE, value: 105.1 }],
  },
  {
    id: "ins", name: "Insulinas", unit: "mIU/L", group: "hormonai",
    direction: "range", refLow: 2.6, refHigh: 24.9, refLabel: "2,6–24,9",
    history: [{ date: BASE, value: 16.61 }],
  },
  {
    id: "est", name: "Estrogenas", unit: "pg/mL", group: "hormonai",
    direction: "range", refLow: 28, refHigh: 156, refLabel: "28–156",
    history: [{ date: BASE, value: 95.94 }],
  },
  {
    id: "prog", name: "Progesteronas", unit: "ng/mL", group: "hormonai",
    direction: "range", refLow: 0.7, refHigh: 4.3, refLabel: "0,7–4,3",
    history: [{ date: BASE, value: 0.806 }],
  },
  {
    id: "testo", name: "Testosteronas", unit: "nmol/l", group: "hormonai",
    direction: "range", refLow: 9.9, refHigh: 27.8, refLabel: "9,9–27,8",
    history: [{ date: BASE, value: 17.42 }],
  },
  {
    id: "ntx", name: "NTX ir plaukų mineralų tyrimas", unit: "", group: "hormonai",
    direction: "info", refLabel: "",
    history: [{ date: BASE, note: "Reikia atlikti", status: "pending" }],
  },

  // --- Medžiagų apykaita ---
  {
    id: "hba1c", name: "Hemoglobinas A1c", unit: "g/L", group: "apykaita",
    direction: "range", refLow: 130, refHigh: 175, refLabel: "130–175",
    history: [{ date: BASE, value: 164 }],
  },
  {
    id: "crp", name: "CRP (uždegimo lygis)", unit: "mg/L", group: "apykaita",
    direction: "range", refLow: 0, refHigh: 5, refLabel: "0–5",
    history: [{ date: BASE, value: 1.55 }],
  },
  {
    id: "hcy", name: "Homocisteinas (metilacijai)", unit: "μmol/l", group: "apykaita",
    direction: "range", refLow: 5, refHigh: 12, refLabel: "5–12",
    history: [{ date: BASE, value: 10.6 }],
  },
  {
    id: "glut", name: "Glutationas / lipidai", unit: "", group: "apykaita",
    direction: "info", refLabel: "",
    history: [{ date: BASE, note: "", status: "notMeasured" }],
  },
  {
    id: "psa", name: "PSA", unit: "ng/mL", group: "apykaita",
    direction: "lower", refHigh: 1.4, refLabel: "< 1,4",
    history: [{ date: BASE, value: 0.741 }],
  },

  // --- Kūnas (cm) ---
  {
    id: "peciai", name: "Pėčiai", unit: "cm", group: "kunas",
    direction: "info", refLabel: "",
    history: [{ date: BASE, value: 137 }],
  },
  {
    id: "krutine", name: "Krūtinė", unit: "cm", group: "kunas",
    direction: "info", refLabel: "",
    history: [{ date: BASE, value: 122 }],
  },
  {
    id: "pilvas", name: "Pilvas", unit: "cm", group: "kunas",
    direction: "info", refLabel: "",
    history: [{ date: BASE, value: 109 }],
  },
  {
    id: "dubuo", name: "Dubuo", unit: "cm", group: "kunas",
    direction: "info", refLabel: "",
    history: [{ date: BASE, value: 109 }],
  },
  {
    id: "slaunis", name: "Šlaunis", unit: "cm", group: "kunas",
    direction: "info", refLabel: "",
    history: [{ date: BASE, value: 61 }],
  },
  {
    id: "bicepsas", name: "Bicepsas", unit: "cm", group: "kunas",
    direction: "info", refLabel: "",
    history: [{ date: BASE, value: 45 }],
  },
  {
    id: "svoris", name: "Svoris", unit: "kg", group: "kunas",
    direction: "info", refLabel: "",
    history: [{ date: BASE, value: 105 }],
  },
  {
    id: "ratio", name: "Pilvas / Dubuo", unit: "", group: "kunas",
    direction: "lower", refHigh: 1, refLabel: "< 1,0",
    history: [{ date: BASE, value: 1.0 }],
  },
];

export function getSortedHistory(test) {
  return [...test.history].sort((a, b) => a.date.localeCompare(b.date));
}

export function getNumericHistory(test) {
  return getSortedHistory(test).filter((h) => h.value != null);
}

export function getLatest(test) {
  const h = getSortedHistory(test);
  return h.length ? h[h.length - 1] : null;
}

export function isNoteEntry(entry) {
  return !!entry && entry.value == null && "note" in entry;
}

export function getEntryStatus(test, entry) {
  if (!entry) return "notMeasured";
  if (isNoteEntry(entry)) return entry.status || "review";
  const v = entry.value;
  if (test.direction === "range") {
    if (v < test.refLow) return "below";
    if (v > test.refHigh) return "above";
    return "within";
  }
  if (test.direction === "lower") return v <= test.refHigh ? "within" : "above";
  if (test.direction === "higher") return v >= test.refLow ? "within" : "below";
  return "informational";
}

export function getTrend(test) {
  const numeric = getNumericHistory(test);
  if (numeric.length < 2) return { direction: "stable", delta: 0, hasData: false };
  const latest = numeric[numeric.length - 1];
  const prev = numeric[numeric.length - 2];
  const delta = latest.value - prev.value;
  const threshold = Math.max(0.05, Math.abs(latest.value) * 0.02);
  if (Math.abs(delta) < threshold) return { direction: "stable", delta, hasData: true };
  let direction;
  if (test.direction === "lower") {
    direction = delta < 0 ? "improving" : "worsening";
  } else if (test.direction === "higher") {
    direction = delta > 0 ? "improving" : "worsening";
  } else if (test.direction === "range") {
    const status = getEntryStatus(test, latest);
    if (status === "within") return { direction: "stable", delta, hasData: true };
    if (status === "above") direction = delta > 0 ? "worsening" : "improving";
    else direction = delta < 0 ? "worsening" : "improving";
  } else {
    return { direction: "stable", delta, hasData: true };
  }
  return { direction, delta, hasData: true };
}

export const statusConfig = {
  within: { label: "Normoje", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  above: { label: "Virš normos", color: "bg-rose-50 text-rose-700 border-rose-200" },
  below: { label: "Žemiau normos", color: "bg-amber-50 text-amber-700 border-amber-200" },
  scheduled: { label: "Suplanuota", color: "bg-sky-50 text-sky-700 border-sky-200" },
  normal: { label: "Norma", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  pending: { label: "Reikia atlikti", color: "bg-amber-50 text-amber-700 border-amber-200" },
  notMeasured: { label: "Neišmatuota", color: "bg-slate-50 text-slate-500 border-slate-200" },
  informational: { label: "Informacinis", color: "bg-slate-50 text-slate-500 border-slate-200" },
  review: { label: "Peržiūrėti", color: "bg-slate-50 text-slate-500 border-slate-200" },
};