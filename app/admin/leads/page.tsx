"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import {
  MessageSquare, Search, Filter, Mail, Phone,
  Calendar, CheckCircle2, Clock, Zap, Target,
  MapPin, Star
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Lead } from "@/types";

export default function LeadsAdminPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads/list");
      const data = await res.json();
      console.log("DASHBOARD: FETCHED LEADS ->", data?.length, "items detected");
      setLeads(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Lead['status']) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      await fetchLeads();
    } catch (e) {
      console.error(e);
    }
  };

  const getPriority = (score: number) => {
    if (score >= 7) return { label: "HOT", color: "text-red-500 bg-red-500/10 border-red-500/20" };
    if (score >= 5) return { label: "WARM", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" };
    return { label: "COLD", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" };
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Sales Pipeline</h1>
          <p className="text-white/40 font-medium whitespace-nowrap">Enterprise CRM Interface • Real-time Business Intelligence</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/leads/scrape">
            <Button className="bg-white text-black hover:bg-neutral-200 shadow-xl px-8 h-11 font-bold">
              <Zap size={16} className="mr-2 fill-current" /> Hunt Leads
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="h-64 flex items-center justify-center border border-white/5 border-dashed rounded-xl">
              <div className="h-8 w-8 rounded-full border-2 border-white/10 border-t-white animate-spin" />
            </div>
          ) : leads.length > 0 ? (
            leads.map((lead, i) => {
              const priority = getPriority(lead.lead_score || 0);
              const isExpanded = expandedId === lead.id;

              return (
                <motion.div
                  key={lead.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <Card className={cn(
                    "p-0 border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden relative group",
                    isExpanded && "bg-white/[0.06] border-white/10 shadow-2xl"
                  )}>
                    {/* Priority Bar */}
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1 transition-all", isExpanded ? "w-1.5" : "w-1", priority.color.split(' ')[0].replace('text', 'bg'))} />

                    <div className="p-6 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="flex flex-wrap items-center gap-4">
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            {lead.name || lead.business_name}
                          </h3>
                          <span className={cn("px-3 py-0.5 rounded-full text-[10px] font-black border", priority.color)}>
                            {priority.label}
                          </span>
                          {lead.status === 'enriched' && (
                            <span className="px-3 py-0.5 rounded-full text-[10px] font-black border border-green-500/20 bg-green-500/10 text-green-500 flex items-center gap-1">
                               <CheckCircle2 size={10} /> INTERCEPT RESOLVED
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-1.5 bg-white/[0.03] px-3 py-1 rounded-md border border-white/5">
                            <MapPin size={10} /> {lead.city || "Unknown Location"}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {/* Status Tags */}
                          {!lead.has_website && !isExpanded && (
                            <div className="flex items-center text-orange-500/80 text-[10px] font-black uppercase tracking-widest bg-orange-500/5 px-3 py-1 rounded-md border border-orange-500/10">
                              NO WEBSITE ❌
                            </div>
                          )}
                          {(lead.google_rating || 0) > 0 && !isExpanded && (
                            <div className="flex items-center text-white/40 text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-md border border-white/5">
                              <Star size={10} className="mr-1.5 text-yellow-500" /> {lead.google_rating} RATING
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex gap-2 w-full lg:w-auto">
                        {lead.phone && (
                          <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener">
                            <Button variant="outline" className="h-10 px-4 border-white/5 hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/20 text-xs font-bold w-full grayscale group-hover:grayscale-0 transition-all">
                              WhatsApp
                            </Button>
                          </a>
                        )}
                        <Button
                          onClick={() => setExpandedId(isExpanded ? null : lead.id!)}
                          className={cn(
                            "h-10 px-8 transition-all text-xs font-black uppercase tracking-widest w-full lg:min-w-[160px]",
                            isExpanded ? "bg-white text-black" : "bg-white/5 text-white hover:bg-white hover:text-black"
                          )}
                        >
                          {isExpanded ? "Close Info" : "View Details"}
                        </Button>
                      </div>
                    </div>

                    {/* Inline Expanded Detail Section */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-white/5"
                        >
                          <div className="p-8 bg-white/[0.01] grid md:grid-cols-3 gap-8">
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Contact Information</p>
                                <div className="text-sm font-medium text-white/60 space-y-1">
                                  <p className="flex items-center gap-3"><Phone size={14} className="text-white/20" /> {lead.phone || "No phone listed"}</p>
                                  <p className="flex items-center gap-3"><Mail size={14} className="text-white/20" /> {lead.email || "No email detected"}</p>
                                  <p className="flex items-center gap-3"><MapPin size={14} className="text-white/20" /> {lead.city || "Unknown Region"}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Digital Status</p>
                                <div className="flex items-center gap-2">
                                  <span className={cn("px-3 py-1 rounded-md text-[10px] font-bold border", lead.has_website ? "text-green-500 border-green-500/20 bg-green-500/5" : "text-red-500 border-red-500/20 bg-red-500/5")}>
                                    {lead.has_website ? "Website ✅" : "No Website ❌"}
                                  </span>
                                  <span className="px-3 py-1 rounded-md text-[10px] font-bold border text-yellow-500 border-yellow-500/20 bg-yellow-500/5 flex items-center gap-1.5">
                                    <Star size={10} fill="currentColor" /> {lead.google_rating || 0} Rating
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Opportunity Insights</p>
                              <div className="space-y-2">
                                {!lead.has_website && (
                                  <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10 text-[11px] text-orange-400 font-medium">
                                    Critically underserved digital presence. No operational website detected.
                                  </div>
                                )}
                                {(lead.reviews_count || 0) < 50 && (
                                  <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[11px] text-blue-400 font-medium">
                                    Low review volume for its niche. High potential for reputation optimization.
                                  </div>
                                )}
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Calculated Quality</p>
                                  <div className="flex items-end gap-3 leading-none">
                                    <span className="text-3xl font-black text-white">{lead.lead_score}</span>
                                    <span className="text-xs font-bold text-white/20 mb-1">/ 10 Score</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Suggested Action</p>
                              <div className="space-y-3">
                                <Link href={`/admin/leads/${lead.id}`} className="block">
                                  <Button className="w-full h-11 bg-white text-black font-black uppercase tracking-tighter text-xs">
                                    Full Profile & Roadmap
                                  </Button>
                                </Link>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => updateStatus(lead.id!, 'contacted')}
                                    variant="outline"
                                    className="flex-1 h-11 border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest"
                                  >
                                    Mark Qualified
                                  </Button>
                                  <Button
                                    className="flex-1 h-11 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20"
                                  >
                                    Start Outreach
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-96 flex flex-col items-center justify-center border border-white/5 border-dashed rounded-3xl space-y-6"
            >
              <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center text-white/10">
                <Target size={32} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-white">Pipeline Empty</h3>
                <p className="text-white/20 text-sm max-w-xs mx-auto">Start by hunting for new high-conversion leads in target regions.</p>
              </div>
              <Link href="/admin/leads/scrape">
                <Button className="bg-white text-black hover:bg-neutral-200 h-12 px-10 font-bold rounded-xl shadow-2xl">
                  Hunt Leads
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
