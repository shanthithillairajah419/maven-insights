"use client";

import { useState } from "react";
import { Lightbulb, ExternalLink, Check, Loader2 } from "lucide-react";
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
    <div className={cn("px-6 pb-1", className)}>
      <div className="flex gap-3 rounded-xl bg-purple-50 px-4 py-3 border border-purple-100">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />

        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-foreground">{children}</p>

          {suggestion && (
            <div className="flex items-start gap-3">
              <p className="text-sm text-muted-foreground">
                <span className="mr-1">&rarr;</span>
                {suggestion}
              </p>
              {linearTeam && status === "idle" && (
                <button
                  onClick={handleCreateLinear}
                  className="shrink-0 inline-flex items-center gap-1.5 h-6 px-2.5 text-xs font-medium text-white rounded-md transition-all hover:shadow-sm active:scale-95"
                  style={{ backgroundColor: "#7c3aed" }}
                >
                  Create Linear
                </button>
              )}
              {linearTeam && status === "loading" && (
                <button
                  disabled
                  className="shrink-0 inline-flex items-center gap-1.5 h-6 px-2.5 text-xs font-medium text-white/70 rounded-md bg-purple-400"
                >
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Creating...
                </button>
              )}
              {linearTeam && status === "created" && issueUrl && (
                <a
                  href={issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-600 px-2.5 h-6 text-xs font-medium text-white"
                >
                  <Check className="h-3 w-3" />
                  Created
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
