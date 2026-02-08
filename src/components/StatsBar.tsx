import { Shield, Activity, AlertTriangle, Search } from "lucide-react";

interface StatsBarProps {
  submissionCount: number;
  analyzedCount: number;
  threatCount: number;
}

const StatsBar = ({ submissionCount, analyzedCount, threatCount }: StatsBarProps) => {
  const pendingCount = submissionCount - analyzedCount;

  const dynamicStats = [
    { label: "Cases Submitted", value: submissionCount.toString(), icon: Search, color: "text-primary" },
    { label: "Threats Detected", value: threatCount.toString(), icon: AlertTriangle, color: "text-destructive" },
    { label: "Cleared", value: (analyzedCount - threatCount).toString(), icon: Shield, color: "text-success" },
    { label: "Pending", value: pendingCount.toString(), icon: Activity, color: "text-warning" },
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
