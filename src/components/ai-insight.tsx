"use client";

import { useState } from "react";
import { Sparkles, Lightbulb, ExternalLink, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LinearTeam, type LinearTeamKey } from "@/lib/linear";

interface AiInsightProps {
  children: string;
  suggestion?: string;
  linearTeam?: LinearTeamKey;
  className?: string;
}

export function AiInsight({
  children,
  suggestion,
  linearTeam,
  className,
}: AiInsightProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "created">("idle");
  const [issueUrl, setIssueUrl] = useState<string | null>(null);

  const handleCreateLinear = async () => {
    if (!suggestion || !linearTeam || status !== "idle") return;

    const team = LinearTeam[linearTeam];
    setStatus("loading");

    try {
      const response = await fetch("/api/linear/create-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: suggestion,
          teamId: team.teamId,
          stateId: team.triageStateId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("created");
        setIssueUrl(data.url);
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 px-6 pb-1", className)}>
      <div className="flex items-start gap-2">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
        <p className="text-sm italic text-muted-foreground">{children}</p>
      </div>

      {suggestion && linearTeam && (
        <div className="flex items-start gap-2 ml-5.5">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
          <div className="flex flex-1 items-start gap-2">
            <p className="text-sm text-foreground">{suggestion}</p>
            {status === "idle" && (
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 h-6 gap-1 px-2 text-xs font-normal"
                onClick={handleCreateLinear}
              >
                Create Linear
              </Button>
            )}
            {status === "loading" && (
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 h-6 gap-1 px-2 text-xs font-normal"
                disabled
              >
                <Loader2 className="h-3 w-3 animate-spin" />
                Creating...
              </Button>
            )}
            {status === "created" && issueUrl && (
              <a
                href={issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 h-6 text-xs text-emerald-700"
              >
                <Check className="h-3 w-3" />
                Created
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
