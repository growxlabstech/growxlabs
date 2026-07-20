"use client";

import React, { useState } from "react";
import { Loader2, Sparkles, Brain, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function AiRecruiterPage() {
  const [activeTab, setActiveTab] = useState<"resume" | "sentiment">("resume");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [resumeText, setResumeText] = useState("");
  const [requirements, setRequirements] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  const handleScoreResume = async () => {
    try {
      setLoading(true);
      setResult(null);
      const res = await fetch("/api/hrms/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "score_resume",
          requirements: requirements.split(",").map(r => r.trim()).filter(Boolean),
          resume_text: resumeText
        })
      });
      const data = await res.json();
      setResult(data.result);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleAnalyzeSentiment = async () => {
    try {
      setLoading(true);
      setResult(null);
      const res = await fetch("/api/hrms/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "analyze_sentiment", feedback_text: feedbackText })
      });
      const data = await res.json();
      setResult(data.result);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  return (
    <div className="space-y-8 text-[var(--text-primary)]">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-none">AI Recruiter Assistant</h1>
        <p className="text-[var(--text-secondary)] text-xs">AI-powered resume scoring, candidate matching, and employee sentiment analysis.</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 bg-[var(--surface-2)] rounded-xl p-1 w-fit border border-[var(--border-subtle)]">
        <button
          onClick={() => { setActiveTab("resume"); setResult(null); }}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer",
            activeTab === "resume"
              ? "bg-[var(--card)] shadow-sm text-[#0075de] border border-[var(--border-subtle)] font-extrabold"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          <Sparkles className="h-3.5 w-3.5" /> Resume Scoring
        </button>
        <button
          onClick={() => { setActiveTab("sentiment"); setResult(null); }}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer",
            activeTab === "sentiment"
              ? "bg-[var(--card)] shadow-sm text-[#0075de] border border-[var(--border-subtle)] font-extrabold"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          <MessageSquare className="h-3.5 w-3.5" /> Sentiment Analysis
        </button>
      </div>

      {/* Resume Scoring Tab */}
      {activeTab === "resume" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="p-5 border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-3">Job Requirements</h4>
            <input
              type="text"
              placeholder="React, TypeScript, Next.js, Node.js (comma-separated)"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[var(--border-subtle)] bg-[var(--surface-1)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0075de]/20 mb-3"
            />
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-3">Resume Text</h4>
            <textarea
              placeholder="Paste candidate's resume content here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[var(--border-subtle)] bg-[var(--surface-1)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0075de]/20 h-48 resize-none"
            />
            <button
              onClick={handleScoreResume}
              disabled={loading || !resumeText || !requirements}
              className="mt-3 w-full bg-[#0075de] hover:bg-[#005bab] text-white px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin h-3.5 w-3.5" /> : <><Brain className="h-3.5 w-3.5" /> Analyze Resume</>}
            </button>
          </Card>

          {/* Results */}
          <Card className="p-5 border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-3">AI Analysis Results</h4>
            {!result ? (
              <div className="h-48 flex items-center justify-center text-[var(--text-muted)]">
                <div className="text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-[#0075de]" />
                  <p className="text-xs text-[var(--text-secondary)] font-medium">Submit a resume to see AI analysis</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center font-mono text-lg font-black",
                    result.score >= 80 ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                    result.score >= 60 ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                    "bg-red-500/10 text-red-500 border border-red-500/20"
                  )}>{result.score}</div>
                  <div>
                    <p className="text-xs font-bold text-[var(--text-primary)]">Match Score</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{result.match_summary}</p>
                  </div>
                </div>

                {result.missing_skills?.length > 0 && (
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-1">Missing Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missing_skills.map((skill: string, i: number) => (
                        <span key={i} className="text-[8px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {result.interview_suggested_questions?.length > 0 && (
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-1">Suggested Interview Questions</p>
                    <ol className="space-y-1.5">
                      {result.interview_suggested_questions.map((q: string, i: number) => (
                        <li key={i} className="text-xs text-[var(--text-secondary)] pl-3 border-l-2 border-[#0075de]">{q}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Sentiment Analysis Tab */}
      {activeTab === "sentiment" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="p-5 border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-3">Employee Feedback</h4>
            <textarea
              placeholder="Paste employee feedback, survey response, or review text..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[var(--border-subtle)] bg-[var(--surface-1)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0075de]/20 h-48 resize-none"
            />
            <button
              onClick={handleAnalyzeSentiment}
              disabled={loading || !feedbackText}
              className="mt-3 w-full bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin h-3.5 w-3.5" /> : <><MessageSquare className="h-3.5 w-3.5" /> Analyze Sentiment</>}
            </button>
          </Card>

          <Card className="p-5 border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-3">Sentiment Results</h4>
            {!result ? (
              <div className="h-48 flex items-center justify-center text-[var(--text-muted)]">
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-violet-500" />
                  <p className="text-xs text-[var(--text-secondary)] font-medium">Submit feedback to analyze sentiment</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-1">Sentiment</p>
                    <span className={cn("px-3 py-1 rounded-lg text-xs font-bold inline-block border",
                      result.sentiment === "Positive" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      result.sentiment === "Negative" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                      "bg-[var(--surface-2)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
                    )}>{result.sentiment}</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-1">Attrition Risk</p>
                    <span className={cn("px-3 py-1 rounded-lg text-xs font-bold inline-block border",
                      result.attrition_risk === "High" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                      result.attrition_risk === "Medium" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                      "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    )}>{result.attrition_risk}</span>
                  </div>
                </div>

                {result.key_themes?.length > 0 && (
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-2">Key Themes</p>
                    <div className="space-y-1.5">
                      {result.key_themes.map((theme: string, i: number) => (
                        <div key={i} className="text-xs text-[var(--text-secondary)] pl-3 border-l-2 border-violet-500">{theme}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
