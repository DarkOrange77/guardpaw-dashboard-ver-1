import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import DetectiveReport from "@/components/DetectiveReport";

interface AnalysisResult {
  risk_level: string;
  red_flags: string[];
  matched_patterns: string[];
  recommendation: string;
}

interface SubmissionCardProps {
  data: {
    id: string;
    fundraiser_url: string;
    description: string;
    tone: string;
    result?: AnalysisResult;
    status?: string;
  };
  index: number;
}

const SubmissionCard = ({ data, index }: SubmissionCardProps) => {
  const isComplete = data.status === "complete" && data.result;

  return (
    <div className="gradient-card rounded-lg border border-border p-5 space-y-3 transition-all hover:border-primary/30 hover:glow-primary">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground">
            #{(index + 1).toString().padStart(3, "0")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {data.tone}
          </span>
          {isComplete ? (
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/30 flex items-center gap-1">
              <CheckCircle size={10} />
              Analyzed
            </span>
          ) : (
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/30 flex items-center gap-1">
              <AlertTriangle size={10} />
              Pending
            </span>
          )}
        </div>
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
        <span className="text-xs text-muted-foreground font-mono">
          ID: {data.id.slice(0, 8)}…
        </span>
      </div>

      {/* Detective Report */}
      {isComplete && data.result && <DetectiveReport result={data.result} />}
    </div>
  );
};

export default SubmissionCard;
