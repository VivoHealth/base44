// Laboratorinių tyrimų katalogas (iš Excel) + pagalbinės funkcijos
// Normos: neigiamas optimalus/norma = viršutinė riba (< reikšmė),
// teigiamas = apatinė riba (> reikšmė, pvz. HDL).

export const labTests = [
  {
    id: "chol",
    name: "Cholesterolis",
    unit: "mmol/l",
    refHigh: 5.2,
    refLabel: "< 5.2",
    direction: "lower", // žemesnis geriau
    history: [
      { date: "2026-02-10", value: 6.4 },
      { date: "2026-04-14", value: 6.1 },
      { date: "2026-07-15", value: 5.8 },
    ],
  },
  {
    id: "ldl",
    name: "LDL (MTL-chol)",
    unit: "mmol/l",
    refHigh: 3.36,
    refLabel: "< 3.36",
    direction: "lower",
    history: [
      { date: "2026-02-10", value: 4.1 },
      { date: "2026-04-14", value: 3.8 },
      { date: "2026-07-15", value: 3.47 },
    ],
  },
  {
    id: "hdl",
    name: "HDL (DTL-chol)",
    unit: "mmol/l",
    refLow: 1.04,
    refLabel: "> 1.04",
    direction: "higher", // aukštesnis geriau
    history: [
      { date: "2026-02-10", value: 0.92 },
      { date: "2026-04-14", value: 0.95 },
      { date: "2026-07-15", value: 0.98 },
    ],
  },
  {
    id: "tg",
    name: "Trigliceridai",
    unit: "mmol/l",
    refHigh: 1.82,
    refLabel: "< 1.82",
    direction: "lower",
    history: [
      { date: "2026-02-10", value: 6.1 },
      { date: "2026-04-14", value: 5.7 },
      { date: "2026-07-15", value: 5.35 },
    ],
  },
  {
    id: "glu",
    name: "Glukozė",
    unit: "mmol/l",
    refHigh: 5.89,
    refLabel: "< 5.89",
    direction: "lower",
    history: [
      { date: "2026-02-10", value: 4.8 },
      { date: "2026-04-14", value: 4.6 },
      { date: "2026-07-15", value: 4.5 },
    ],
  },
];

export function getSortedHistory(test) {
  return [...test.history].sort((a, b) => a.date.localeCompare(b.date));
}

export function getLatest(test) {
  const h = getSortedHistory(test);
  return h.length ? h[h.length - 1] : null;
}

export function getPrevious(test) {
  const h = getSortedHistory(test);
  return h.length >= 2 ? h[h.length - 2] : null;
}

export function getStatus(test, value) {
  if (value == null) return "review";
  if (test.direction === "lower") {
    return value <= test.refHigh ? "within" : "above";
  }
  return value >= test.refLow ? "within" : "below";
}

// Trendas tarp dviejų paskutinių matavimų
export function getTrend(test) {
  const latest = getLatest(test);
  const prev = getPrevious(test);
  if (!latest || !prev) return { direction: "stable", delta: 0, hasData: false };
  const delta = latest.value - prev.value;
  const threshold = Math.max(0.05, Math.abs(latest.value) * 0.02);
  if (Math.abs(delta) < threshold) return { direction: "stable", delta, hasData: true };
  let direction;
  if (test.direction === "lower") {
    direction = delta < 0 ? "improving" : "worsening";
  } else {
    direction = delta > 0 ? "improving" : "worsening";
  }
  return { direction, delta, hasData: true };
}

export const statusConfig = {
  within: { label: "Normoje", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  above: { label: "Virš normos", color: "bg-rose-50 text-rose-700 border-rose-200" },
  below: { label: "Žemiau normos", color: "bg-amber-50 text-amber-700 border-amber-200" },
  review: { label: "Reikia peržiūrėti", color: "bg-sky-50 text-sky-700 border-sky-200" },
};