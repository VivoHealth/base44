export default function MetricCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-blue-500" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}