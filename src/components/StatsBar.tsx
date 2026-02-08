import { Shield, Activity, AlertTriangle, Search } from "lucide-react";

const stats = [
  { label: "Cases Submitted", value: "0", icon: Search, color: "text-primary" },
  { label: "Threats Detected", value: "0", icon: AlertTriangle, color: "text-destructive" },
  { label: "Cleared", value: "0", icon: Shield, color: "text-success" },
  { label: "Pending", value: "0", icon: Activity, color: "text-warning" },
];

interface StatsBarProps {
  submissionCount: number;
}

const StatsBar = ({ submissionCount }: StatsBarProps) => {
  const dynamicStats = [
    { ...stats[0], value: submissionCount.toString() },
    stats[1],
    stats[2],
    { ...stats[3], value: submissionCount.toString() },
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
