"use client";

import { useState } from "react";
import { ExternalLink, Check, Loader2 } from "lucide-react";
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
    <div className={cn("flex gap-3 px-6 pb-1", className)}>
      {/* Rainbow gradient bar */}
      <div
        className="w-1 shrink-0 rounded-full"
        style={{
          background: "linear-gradient(to bottom, #06b6d4, #8b5cf6, #a855f7)",
        }}
      />

      <div className="flex flex-col gap-2">
        <p className="text-sm text-foreground"><span className="font-semibold">Insight: </span>{children}</p>

        {suggestion && linearTeam && (
          <div className="flex items-start gap-2">
            <div className="flex flex-1 items-start gap-2">
              <p className="text-sm text-foreground"><span className="font-semibold">Suggestion: </span>{suggestion}</p>
              {status === "idle" && (
                <button
                  onClick={handleCreateLinear}
                  className="shrink-0 inline-flex items-center gap-1.5 h-6 px-2.5 text-xs font-medium text-purple-700 rounded-md border border-purple-200 bg-purple-50 transition-all hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm active:scale-95"
                >
                  Create Linear
                </button>
              )}
              {status === "loading" && (
                <button
                  disabled
                  className="shrink-0 inline-flex items-center gap-1.5 h-6 px-2.5 text-xs font-medium text-purple-400 rounded-md border border-purple-200 bg-purple-50"
                >
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Creating...
                </button>
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
    </div>
  );
}
