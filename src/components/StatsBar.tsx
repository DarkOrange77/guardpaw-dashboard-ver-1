import { Shield, Activity, AlertTriangle, Search } from "lucide-react";

interface StatsBarProps {
  submissionCount: number;
  analyzedCount: number;
  threatCount: number;
}

const StatsBar = ({ submissionCount = 0, analyzedCount = 0, threatCount = 0 }: StatsBarProps) => {
  const safeSubmitted = submissionCount || 0;
  const safeAnalyzed = analyzedCount || 0;
  const safeThreat = threatCount || 0;
  const pendingCount = safeSubmitted - safeAnalyzed;
  const clearedCount = Math.max(0, safeAnalyzed - safeThreat);

  const dynamicStats = [
    { label: "Cases Submitted", value: String(safeSubmitted), icon: Search, color: "text-primary" },
    { label: "Threats Detected", value: String(safeThreat), icon: AlertTriangle, color: "text-destructive" },
    { label: "Cleared", value: String(clearedCount), icon: Shield, color: "text-success" },
    { label: "Pending", value: String(pendingCount), icon: Activity, color: "text-warning" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {dynamicStats.map((stat) => (
        <div
          key={stat.label}
          className="gradient-card rounded-lg border border-border p-4 flex items-center gap-3"
        >
          <stat.icon size={20} className={stat.color} />
          <div>
            <p className="text-xl font-bold font-mono text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
