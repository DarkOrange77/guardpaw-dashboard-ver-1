import { ShieldAlert, ShieldCheck, ShieldX, AlertTriangle, CheckCircle, Target, FileText } from "lucide-react";

interface AnalysisResult {
  risk_level: string;
  red_flags: string[];
  matched_patterns: string[];
  recommendation: string;
}

interface DetectiveReportProps {
  result: AnalysisResult;
}

const getRiskConfig = (level: string) => {
  const normalized = level?.toLowerCase() || "";
  if (normalized.includes("high")) {
    return {
      icon: ShieldX,
      label: "HIGH RISK",
      className: "bg-destructive/10 text-destructive border-destructive/30",
      barClass: "bg-destructive",
    };
  }
  if (normalized.includes("medium")) {
    return {
      icon: ShieldAlert,
      label: "MEDIUM RISK",
      className: "bg-warning/10 text-warning border-warning/30",
      barClass: "bg-warning",
    };
  }
  return {
    icon: ShieldCheck,
    label: "LOW RISK",
    className: "bg-success/10 text-success border-success/30",
    barClass: "bg-success",
  };
};

const toArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) {
    // Handle comma-separated or newline-separated strings
    return value.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

const DetectiveReport = ({ result }: DetectiveReportProps) => {
  const risk = getRiskConfig(result.risk_level);
  const RiskIcon = risk.icon;
  const redFlags = toArray(result.red_flags);
  const matchedPatterns = toArray(result.matched_patterns);

  return (
    <div className="space-y-4 pt-3 border-t border-border/50">
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
        <FileText size={12} />
        Detective Report
      </div>

      {/* Risk Level Badge */}
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-bold font-mono ${risk.className}`}>
        <RiskIcon size={14} />
        {risk.label}
      </div>

      {/* Red Flags */}
      {redFlags.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-destructive flex items-center gap-1.5">
            <AlertTriangle size={12} />
            Red Flags ({redFlags.length})
          </h4>
          <ul className="space-y-1">
            {redFlags.map((flag, i) => (
              <li
                key={i}
                className="text-xs text-secondary-foreground flex items-start gap-2 pl-1"
              >
                <span className="text-destructive mt-0.5 shrink-0">▸</span>
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Matched Patterns */}
      {matchedPatterns.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-warning flex items-center gap-1.5">
            <Target size={12} />
            Matched Patterns ({matchedPatterns.length})
          </h4>
          <ul className="space-y-1">
            {matchedPatterns.map((pattern, i) => (
              <li
                key={i}
                className="text-xs text-secondary-foreground flex items-start gap-2 pl-1"
              >
                <span className="text-warning mt-0.5 shrink-0">▸</span>
                {pattern}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendation */}
      {result.recommendation && (
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-success flex items-center gap-1.5">
            <CheckCircle size={12} />
            Recommendation
          </h4>
          <p className="text-xs text-secondary-foreground leading-relaxed pl-1">
            {result.recommendation}
          </p>
        </div>
      )}
    </div>
  );
};

export default DetectiveReport;
