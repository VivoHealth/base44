import { Badge } from "@/components/ui/badge";

const STYLES = {
  FLY: "bg-green-100 text-green-700 border-transparent",
  ITERATE: "bg-yellow-100 text-yellow-700 border-transparent",
  DIE: "bg-red-500 text-white border-transparent",
};

export default function FlyDieBadge({ label }) {
  return <Badge className={STYLES[label] || STYLES.DIE}>{label}</Badge>;
}