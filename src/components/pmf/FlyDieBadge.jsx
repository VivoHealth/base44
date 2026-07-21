import { Badge } from "@/components/ui/badge";

const STYLES = {
  FLY: "bg-pink-100 text-pink-600 border-transparent",
  ITERATE: "bg-violet-100 text-violet-600 border-transparent",
  DIE: "bg-red-500 text-white border-transparent",
};

export default function FlyDieBadge({ label }) {
  return <Badge className={STYLES[label] || STYLES.DIE}>{label}</Badge>;
}