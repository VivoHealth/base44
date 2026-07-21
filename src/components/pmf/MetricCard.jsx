export default function MetricCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}