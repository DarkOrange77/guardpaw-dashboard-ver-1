import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface SubmissionCardProps {
  data: {
    id: string;
    fundraiser_url: string;
    description: string;
    tone: string;
  };
  index: number;
}

const SubmissionCard = ({ data, index }: SubmissionCardProps) => {
  return (
    <div className="gradient-card rounded-lg border border-border p-5 space-y-3 transition-all hover:border-primary/30 hover:glow-primary">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground">
            #{(index + 1).toString().padStart(3, "0")}
          </span>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
          {data.tone}
        </span>
      </div>

      {data.fundraiser_url && (
        <p className="text-xs text-muted-foreground font-mono truncate">
          🔗 {data.fundraiser_url}
        </p>
      )}

      <p className="text-sm text-secondary-foreground line-clamp-3">
        {data.description}
      </p>

      <div className="flex items-center gap-2 pt-1">
        <div className="flex items-center gap-1.5 text-xs text-warning">
          <AlertTriangle size={12} />
          Awaiting Analysis
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          ID: {data.id.slice(0, 8)}…
        </span>
      </div>
    </div>
  );
};

export default SubmissionCard;
