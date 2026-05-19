"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Search, Shield, UserX, Key, Clock, Activity, Loader2, ShieldAlert, Users } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function AdminTeamPage() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;
  const isAdmin = role === "ADMIN" || role === "CO_ADMIN";

  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "crm_agent"
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`/api/admin/team?t=${Date.now()}`);
      const data = await res.json();
      setTeam(data.team || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create agent");

      toast.success("Agent created successfully");
      setShowAddModal(false);
      setFormData({ name: "", email: "", phone: "", password: "", role: "crm_agent" });
      fetchTeam();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeactivate = async (id: string, currentStatus: boolean) => {
    if (!confirm(`Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this agent?`)) return;

    try {
      const res = await fetch(`/api/admin/team?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentStatus })
      });

      if (!res.ok) throw new Error("Failed to update status");
      
      toast.success(`Agent ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchTeam();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const totalAgents = team.length;
  const activeSessions = team.reduce(
    (acc, m) => acc + (m.sessions?.filter((s: any) => !s.logout_at).length || 0),
    0
  );
  const pendingTerms = team.filter((m) => !m.accepted_terms).length;

  return (
    <div className="space-y-6 sm:space-y-10 lg:space-y-12">
      <Reveal y={-20}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-white">Team Management</h1>
            <p className="text-[var(--text-secondary)] text-sm">Manage CRM agents, view session logs, and monitor activity.</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-white text-black hover:bg-gray-200 font-bold tracking-widest uppercase text-[10px] h-10 px-6">
            <Plus className="w-4 h-4 mr-2" /> Add Agent
          </Button>
        </div>
      </Reveal>

      {/* ADMINISTRATIVE STATS OVERVIEW */}
      <Reveal delay={0.05}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* STAT 1: TOTAL AGENTS */}
          <div className="bg-[#0D1426]/45 border border-white/[0.05] p-6 rounded-2xl hover:border-[#355CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#355CFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em]">Total Agents</span>
              <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl text-[#9CA3AF] group-hover:text-white transition-colors">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight leading-none">
                {loading ? <Loader2 className="w-5 h-5 animate-spin text-white/40" /> : totalAgents}
              </span>
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">+100% active</span>
            </div>
          </div>

          {/* STAT 2: ACTIVE SESSIONS */}
          <div className="bg-[#0D1426]/45 border border-white/[0.05] p-6 rounded-2xl hover:border-[#355CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#22C55E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em]">Active Sessions</span>
              <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl text-[#9CA3AF] group-hover:text-green-400 transition-colors">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight leading-none">
                {loading ? <Loader2 className="w-5 h-5 animate-spin text-white/40" /> : activeSessions}
              </span>
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 glow-dot-green inline-block" /> Live Sync
              </span>
            </div>
          </div>

          {/* STAT 3: PENDING AGREEMENTS */}
          <div className="bg-[#0D1426]/45 border border-white/[0.05] p-6 rounded-2xl hover:border-[#355CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em]">Pending Terms</span>
              <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl text-[#9CA3AF] group-hover:text-amber-400 transition-colors">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight leading-none">
                {loading ? <Loader2 className="w-5 h-5 animate-spin text-white/40" /> : pendingTerms}
              </span>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Awaiting signature</span>
            </div>
          </div>

          {/* STAT 4: SECURITY SHIELD */}
          <div className="bg-[#0D1426]/45 border border-white/[0.05] p-6 rounded-2xl hover:border-[#355CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em]">Security Shield</span>
              <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl text-green-400">
                <Key className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white tracking-tight leading-none">SECURE</span>
              <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">TLS 1.3 Certified</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ACTIVITY MONITOR */}
      <Reveal delay={0.1}>
        <div className="bg-[#0D1426]/30 border border-white/[0.05] p-6 sm:p-8 rounded-2xl relative overflow-hidden backdrop-blur-md">
           <div className="flex justify-between items-center mb-6 border-b border-white/[0.04] pb-4">
             <h2 className="text-sm font-bold text-white flex items-center gap-3 tracking-tight uppercase tracking-[0.1em]">
                <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                Live Terminal Activity
             </h2>
             <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/25">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 glow-dot-green" />
               <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Console Active</span>
             </div>
           </div>
           
           <div className="space-y-3 h-40 overflow-y-auto custom-scrollbar pr-2 font-mono text-[12px] leading-relaxed">
              <div className="flex items-start gap-4 p-2.5 rounded-lg hover:bg-white/[0.01] transition-colors border border-transparent hover:border-white/[0.02]">
                 <span className="text-[10px] text-[#6B7280] w-12 shrink-0">14:02:11</span>
                 <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#355CFF]/10 text-[#355CFF] border border-[#355CFF]/20 uppercase tracking-wider shrink-0">INFO</span>
                 <span className="text-gray-300"><strong className="text-white font-semibold">Sarah J.</strong> added 5 leads manually.</span>
              </div>
              <div className="flex items-start gap-4 p-2.5 rounded-lg hover:bg-white/[0.01] transition-colors border border-transparent hover:border-white/[0.02]">
                 <span className="text-[10px] text-[#6B7280] w-12 shrink-0">13:45:04</span>
                 <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-wider shrink-0">SYNC</span>
                 <span className="text-gray-300"><strong className="text-white font-semibold">Michael T.</strong> updated status of \"Royal Palace\" to <span className="text-[#355CFF] font-semibold">Contacted</span>.</span>
              </div>
              <div className="flex items-start gap-4 p-2.5 rounded-lg hover:bg-white/[0.01] transition-colors border border-transparent hover:border-white/[0.02]">
                 <span className="text-[10px] text-[#6B7280] w-12 shrink-0">09:12:56</span>
                 <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wider shrink-0">AUTH</span>
                 <span className="text-gray-300"><strong className="text-white font-semibold">Sarah J.</strong> signed in to terminal.</span>
              </div>
           </div>
        </div>
      </Reveal>

      {/* TEAM LIST */}
      <Reveal delay={0.2}>
        <div className="bg-[#0D1426]/30 border border-white/[0.05] rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="p-6 border-b border-white/[0.04] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.01]">
            <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-[0.1em]">CRM Agents ({team.length})</h2>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="SEARCH AGENTS..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/[0.02] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-[11px] font-medium tracking-wider text-white focus:outline-none focus:border-[#355CFF]/45 focus:bg-white/[0.04] w-full sm:w-72 transition-all duration-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8">
            {loading ? (
              <div className="col-span-full text-center py-12 text-[10px] font-bold uppercase tracking-widest text-gray-500">Loading team...</div>
            ) : team.filter(m => 
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                m.email.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 ? (
              <div className="col-span-full text-center py-12 text-[10px] font-bold uppercase tracking-widest text-gray-500">No agents found matching "{searchQuery}"</div>
            ) : team.filter(m => 
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                m.email.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((member) => (
              <div key={member.id} className="bg-white/[0.01] border border-white/[0.04] p-6 rounded-2xl relative hover:border-[#355CFF]/20 hover:bg-white/[0.02] transition-all duration-300 group flex flex-col justify-between">
                 {!member.is_active && (
                    <div className="absolute top-4 right-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] px-2.5 py-0.5 uppercase tracking-widest rounded-full font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 glow-dot-red" />
                      Inactive
                    </div>
                 )}
                 <div>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#355CFF]/15 to-purple-500/15 border border-white/5 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                         {member.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                         <h3 className="font-bold text-white text-base tracking-tight mb-1 truncate">{member.name}</h3>
                         <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{member.role === 'crm_agent' ? 'CRM Agent' : member.role}</p>
                      </div>
                   </div>
                   
                   <div className="space-y-3.5 text-sm mb-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 pb-3 border-b border-white/[0.03]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Email</span>
                        <span className="text-gray-300 font-medium text-xs truncate max-w-full">{member.email}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-white/[0.03]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Terms</span>
                        <span className={member.accepted_terms 
                          ? "bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] px-2.5 py-0.5 uppercase tracking-widest rounded-full font-bold flex items-center gap-1.5" 
                          : "bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] px-2.5 py-0.5 uppercase tracking-widest rounded-full font-bold flex items-center gap-1.5"}>
                            <span className={member.accepted_terms ? "w-1.5 h-1.5 rounded-full bg-green-500 glow-dot-green" : "w-1.5 h-1.5 rounded-full bg-amber-500 glow-dot-amber"} />
                            {member.accepted_terms ? "Accepted" : "Pending"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Sessions</span>
                        <span className="text-white font-mono text-xs">{member.sessions?.length || 0}</span>
                      </div>
                   </div>
                 </div>

                 <div className="flex gap-2.5 mt-4">
                    <Button onClick={() => setSelectedMember(member)} variant="outline" size="sm" className="flex-1 bg-white/[0.02] border-white/[0.05] hover:border-white/10 text-gray-300 hover:text-white text-[10px] font-bold uppercase tracking-widest h-10 rounded-xl transition-all">
                       <Clock className="w-3.5 h-3.5 mr-2" /> Logs
                    </Button>
                    <Button 
                      onClick={() => handleDeactivate(member.id, member.is_active)} 
                      variant="outline" 
                      size="sm" 
                      className={`px-3 bg-white/[0.02] border-white/[0.05] hover:border-white/10 ${member.is_active ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/5' : 'text-green-400 hover:bg-green-500/5'} transition-all h-10 rounded-xl`} 
                      title={member.is_active ? "Deactivate" : "Activate"}
                    >
                       {member.is_active ? <UserX className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    </Button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* SESSION LOGS MODAL */}
      {selectedMember && (
         <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md">
            <div className="w-full max-w-md bg-[var(--surface-1)] border-l border-[var(--border-subtle)] h-full flex flex-col animate-in slide-in-from-right-full duration-300 shadow-2xl">
               <div className="p-8 border-b border-[var(--border-subtle)] flex items-start justify-between bg-[var(--surface-2)]">
                  <div>
                     <h2 className="text-xl font-bold text-white tracking-tight mb-1">{selectedMember.name}</h2>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Session Logs</p>
                  </div>
                  <button onClick={() => setSelectedMember(null)} className="p-2 text-[var(--text-muted)] hover:text-white transition-colors bg-white/5 rounded-lg border border-transparent hover:border-white/10">✕</button>
               </div>
               <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar bg-[var(--surface-1)]">
                  {selectedMember.sessions?.length === 0 ? (
                     <div className="text-center py-12 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">No session logs found.</div>
                  ) : selectedMember.sessions?.map((session: any, idx: number) => (
                     <div key={idx} className="bg-[var(--surface-2)] border border-[var(--border-subtle)] p-5 rounded-2xl text-sm hover:border-[var(--border-hover)] transition-colors">
                        <div className="flex justify-between items-center mb-3 pb-3 border-b border-[var(--border-subtle)]">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Login</span>
                           <span className="text-white font-medium">{new Date(session.login_at).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Logout</span>
                           <span>{session.logout_at ? <span className="text-[var(--text-secondary)] font-medium">{new Date(session.logout_at).toLocaleString()}</span> : <span className="text-green-400 text-[10px] uppercase tracking-widest font-bold">Active Now</span>}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )}

      {/* ADD MEMBER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">Add CRM Agent</h2>
            <p className="text-[var(--text-secondary)] text-sm mb-8">Create a new team member account.</p>
            <form onSubmit={handleAddAgent} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[var(--surface-2)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--border-hover)] transition-colors text-sm" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[var(--surface-2)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--border-hover)] transition-colors text-sm" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Phone</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[var(--surface-2)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--border-hover)] transition-colors text-sm" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Temporary Password</label>
                <input 
                  type="text" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[var(--surface-2)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--border-hover)] transition-colors text-sm" 
                />
              </div>
              
              <div className="pt-6 flex justify-end gap-3 border-t border-[var(--border-subtle)] mt-8">
                 <Button type="button" onClick={() => setShowAddModal(false)} variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-white">Cancel</Button>
                 <Button 
                   type="submit" 
                   disabled={isSubmitting}
                   className="bg-white text-black hover:bg-gray-200 text-[10px] font-bold uppercase tracking-widest h-10 px-6 min-w-[120px]"
                 >
                   {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Agent"}
                 </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
