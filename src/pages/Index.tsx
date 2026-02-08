import { useState } from "react";
import GuardPawLogo from "@/components/GuardPawLogo";
import AnalysisForm from "@/components/AnalysisForm";
import SubmissionCard from "@/components/SubmissionCard";
import StatsBar from "@/components/StatsBar";
import { ShieldAlert, Radar } from "lucide-react";

const Index = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);

  const handleResult = (data: any) => {
    setSubmissions((prev) => [data, ...prev]);
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <GuardPawLogo size="md" />
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Radar size={14} className="text-primary animate-pulse" />
            AI Detective v1.0
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <section className="text-center space-y-3 py-4">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
            <ShieldAlert size={14} />
            Fraud Detection System
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Protect Donors. Expose Fraud.
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Submit suspicious animal rescue fundraisers for AI-powered forensic analysis. 
            GuardPaw identifies red flags, scammer patterns, and provides actionable recommendations.
          </p>
        </section>

        {/* Stats */}
        <StatsBar
          submissionCount={submissions.length}
          analyzedCount={submissions.filter((s) => s.status === "complete").length}
          threatCount={submissions.filter((s) => s.result?.risk_level?.toLowerCase().includes("high")).length}
        />

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Panel */}
          <div className="lg:col-span-2">
            <div className="gradient-card rounded-xl border border-border p-6 sticky top-24">
              <h2 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                <ShieldAlert size={18} className="text-primary" />
                New Analysis
              </h2>
              <p className="text-xs text-muted-foreground mb-5">
                Submit a fundraiser for AI forensic review
              </p>
              <AnalysisForm onResult={handleResult} />
            </div>
          </div>

          {/* Submissions Feed */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Radar size={18} className="text-primary" />
              Analysis Queue
              {submissions.length > 0 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {submissions.length}
                </span>
              )}
            </h2>

            {submissions.length === 0 ? (
              <div className="gradient-card rounded-xl border border-border border-dashed p-12 text-center">
                <ShieldAlert size={40} className="text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">
                  No cases submitted yet. Use the form to analyze a fundraiser.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((sub, i) => (
                  <SubmissionCard key={sub.id} data={sub} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-6 text-center text-xs text-muted-foreground font-mono">
        GuardPaw AI Detective © {new Date().getFullYear()} — Protecting animals & donors
      </footer>
    </div>
  );
};

export default Index;
