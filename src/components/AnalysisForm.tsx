import { useState } from "react";
import { normalizeResponse } from "@/lib/normalizeResponse";
import { Send, Link, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AnalysisFormProps {
  onResult: (data: any) => void;
}

const AnalysisForm = ({ onResult }: AnalysisFormProps) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("Professional");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a description of the fundraiser to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const payload = {
      id: crypto.randomUUID(),
      fundraiser_url: url.trim() || "",
      description: description.trim(),
      tone,
    };

    try {
      const response = await fetch(
        "https://delora.app.n8n.cloud/webhook-test/ai-echo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const rawResult = await response.json();
      console.log("RAW n8n response:", JSON.stringify(rawResult, null, 2));

      // Normalize: n8n may return a JSON Schema-like structure where each field is { type, description }
      // or it may wrap in { properties: { ... } } or { output: { ... } }
      const analysisResult = normalizeResponse(rawResult);

      toast({
        title: "Analysis Complete",
        description: "GuardPaw AI has completed the forensic review.",
      });

      onResult({
        ...payload,
        result: analysisResult,
        status: "complete",
      });
    } catch (error) {
      console.error("Webhook error:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not reach the analysis endpoint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="url" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Link size={14} />
          Fundraiser URL
          <span className="text-xs opacity-50">(optional)</span>
        </Label>
        <Input
          id="url"
          type="url"
          placeholder="https://gofundme.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-background border-border focus:border-primary focus:ring-primary/20 placeholder:text-muted-foreground/40"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileText size={14} />
          Description
          <span className="text-xs text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          required
          rows={5}
          placeholder="Paste the fundraiser text, social media post, or describe the rescue campaign you want analyzed..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-background border-border focus:border-primary focus:ring-primary/20 placeholder:text-muted-foreground/40 resize-none"
          maxLength={5000}
        />
        <p className="text-xs text-muted-foreground text-right">
          {description.length}/5000
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tone" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MessageSquare size={14} />
          Analysis Tone
        </Label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger className="bg-background border-border focus:border-primary focus:ring-primary/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Skeptical">Skeptical</SelectItem>
            <SelectItem value="Helpful">Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full gradient-brand text-primary-foreground font-semibold h-12 text-base hover:opacity-90 transition-opacity"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Analyzing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={18} />
            Analyze Fundraiser
          </span>
        )}
      </Button>
    </form>
  );
};

export default AnalysisForm;
