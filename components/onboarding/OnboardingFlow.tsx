"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  Palette, 
  Target, 
  Calendar, 
  Upload, 
  Rocket, 
  Globe,
  Monitor
} from 'lucide-react';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "Restaurant",
    city: "",
    state: "",
    website: "",
    phone: "",
    email: "",
    primaryColor: "#0D1B4B",
    secondaryColor: "#00A86B",
    brandPersonality: [] as string[],
    competitors: ["", "", ""],
    primaryGoal: "All of above",
    targetAudience: "",
    features: [] as string[],
    notWanted: "",
    contentReady: "Partially ready",
    launchDate: "",
    commPref: "Both",
    reachTime: "Morning 9-12",
    notes: "",
    agree: false
  });

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };
  
  const prevStep = () => setStep(step - 1);

  const validateStep = () => {
    if (step === 1) {
      return formData.businessName && formData.city && formData.email && formData.phone;
    }
    if (step === 4) {
      return formData.agree;
    }
    return true;
  };

  const toggleArrayItem = (field: 'brandPersonality' | 'features', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(i => i !== value) 
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/onboarding/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        alert(`CRITICAL ERROR: ${err.error}\n\nPlease ensure you have run the SQL script in Supabase.`);
      }
    } catch (e: any) {
       console.error(e);
       alert("Network Error: Could not connect to the server.");
    } finally {
       setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/5 border border-white/10 rounded-[2.5rem] p-12 text-center overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[#00A86B]/5 blur-3xl" />
          <div className="relative z-10">
            <div className="h-24 w-24 bg-[#00A86B] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_20px_40px_rgba(0,168,107,0.3)]">
               <CheckCircle2 className="text-white h-12 w-12" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 italic tracking-tight uppercase">MISSION CRITICAL</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Thank you <span className="text-[#00A86B] font-bold">{formData.businessName}</span>! We've received your data sprints. We'll WhatsApp you within 4 hours to schedule your deep-dive strategy call.
            </p>
            <div className="pt-8 border-t border-white/5">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00A86B]">GrowX Labs | Operation Onboarding</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col font-sans overflow-hidden py-16 px-6 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-[#00A86B]/5 blur-[120px] pointer-events-none" />

      {/* Progress Section */}
      <div className="max-w-4xl w-full mx-auto mb-12">
         <div className="flex justify-between items-end mb-4">
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00A86B] mb-1">Step {step} of 4</p>
               <h1 className="text-2xl font-black uppercase italic tracking-tighter">Onboarding Sprint</h1>
            </div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">
              {Math.round((step / 4) * 100)}% Complete
            </p>
         </div>
         <div className="h-1.5 bg-white/5 rounded-full overflow-hidden w-full backdrop-blur-sm">
            <motion.div 
              className="h-full bg-[#00A86B] shadow-[0_0_15px_rgba(0,168,107,0.5)]" 
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
         </div>
      </div>

      <div className="max-w-4xl w-full mx-auto flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8 shadow-2xl backdrop-blur-md relative"
          >
            {/* Step 1: Business Basics */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-xl bg-[#00A86B]/20 flex items-center justify-center text-[#00A86B] shrink-0">
                      <Building2 size={20} />
                   </div>
                   <h2 className="text-xl font-bold uppercase tracking-tight italic">Business Intelligence</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Business Name</label>
                      <input 
                        className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl px-4 text-sm focus:outline-none focus:border-[#00A86B] transition-all font-medium"
                        placeholder="e.g. GrowX Labs"
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Industry</label>
                      <select 
                        className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl px-4 text-sm focus:outline-none focus:border-[#00A86B]"
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      >
                         {['Restaurant', 'Coaching', 'Real Estate', 'Gym', 'Salon', 'E-commerce', 'Startup', 'Other'].map(i => (
                           <option key={i} value={i} className="bg-neutral-900">{i}</option>
                         ))}
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">City/State</label>
                      <input 
                        className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl px-4 text-sm focus:outline-none focus:border-[#00A86B]"
                        placeholder="Guntur, AP"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Email</label>
                      <input 
                        className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl px-4 text-sm focus:outline-none focus:border-[#00A86B]"
                        placeholder="hello@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Phone / WhatsApp</label>
                      <input 
                        className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl px-4 text-sm focus:outline-none focus:border-[#00A86B]"
                        placeholder="+91"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                   </div>
                </div>
              </div>
            )}

            {/* Step 2: Brand DNA */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-xl bg-[#00A86B]/20 flex items-center justify-center text-[#00A86B] shrink-0">
                      <Palette size={20} />
                   </div>
                   <h2 className="text-xl font-bold uppercase tracking-tight italic">Brand DNA</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Primary Colors</label>
                      <div className="flex gap-4">
                         <div className="h-12 flex-1 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 overflow-hidden">
                            <input type="color" value={formData.primaryColor} onChange={(e) => setFormData({...formData, primaryColor: e.target.value})} className="h-6 w-6 border-none p-0 cursor-pointer" />
                            <span className="ml-3 text-xs font-mono">{formData.primaryColor}</span>
                         </div>
                         <div className="h-12 flex-1 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 overflow-hidden">
                            <input type="color" value={formData.secondaryColor} onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})} className="h-6 w-6 border-none p-0 cursor-pointer" />
                            <span className="ml-3 text-xs font-mono">{formData.secondaryColor}</span>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Logo Assets</label>
                      <div className="h-12 border border-dashed border-white/20 rounded-xl flex items-center justify-center bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer">
                         <Upload size={14} className="text-[#00A86B] mr-2" />
                         <span className="text-[10px] font-medium text-white/40 uppercase tracking-widest">Upload PNG/SVG</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Personality Chips</label>
                   <div className="flex flex-wrap gap-2">
                      {['Professional', 'Playful', 'Minimal', 'Bold', 'Elegant', 'Tech-Forward'].map(trait => (
                        <button
                          key={trait}
                          onClick={() => toggleArrayItem('brandPersonality', trait)}
                          className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                            formData.brandPersonality.includes(trait)
                              ? 'bg-[#00A86B] border-[#00A86B] text-white'
                              : 'border-white/5 text-white/20 hover:border-white/10'
                          }`}
                        >
                          {trait}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                   <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Inspiration Gallery</label>
                   <div className="grid md:grid-cols-3 gap-4">
                      {formData.competitors.map((url, i) => (
                        <input 
                           key={i}
                           className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl px-4 text-sm focus:outline-none focus:border-[#00A86B]"
                           placeholder={`Inspiration ${i+1}`}
                           value={url}
                           onChange={(e) => {
                              const newComp = [...formData.competitors];
                              newComp[i] = e.target.value;
                              setFormData({...formData, competitors: newComp});
                           }}
                        />
                      ))}
                   </div>
                </div>
              </div>
            )}

            {/* Step 3: Project Architecture */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-xl bg-[#00A86B]/20 flex items-center justify-center text-[#00A86B] shrink-0">
                      <Target size={20} />
                   </div>
                   <h2 className="text-xl font-bold uppercase tracking-tight italic">Mission Objectives</h2>
                </div>

                <div className="space-y-4">
                   <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Primary Mission</label>
                   <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                      {['Customers', 'Professional', 'Automate', 'Launch', 'All'].map(goal => (
                        <button
                          key={goal}
                          onClick={() => setFormData({...formData, primaryGoal: goal})}
                          className={`h-12 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                             formData.primaryGoal === goal ? 'bg-[#00A86B] border-[#00A86B]' : 'border-white/5 bg-white/5 text-white/40'
                          }`}
                        >
                           {goal}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Tech Stack Requirements</label>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Contact', 'WhatsApp', 'Gallery', 'Blog', 'Booking', 'Pay', 'Admin', 'n8n'].map(feat => (
                        <button
                          key={feat}
                          onClick={() => toggleArrayItem('features', feat)}
                          className={`h-12 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${
                             formData.features.includes(feat) ? 'bg-white/10 border-[#00A86B] text-[#00A86B]' : 'border-white/5 bg-white/[0.02] text-white/30'
                          }`}
                        >
                           {feat}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Target Audience Definition</label>
                   <textarea 
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-5 text-sm focus:outline-none focus:border-[#00A86B] min-h-[140px]"
                      placeholder="Who are we building for? Be specific..."
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                   />
                </div>
              </div>
            )}

            {/* Step 4: Final Ops */}
            {step === 4 && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-xl bg-[#00A86B]/20 flex items-center justify-center text-[#00A86B] shrink-0">
                      <Calendar size={20} />
                   </div>
                   <h2 className="text-xl font-bold uppercase tracking-tight italic">Operations Logistics</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Deployment Date</label>
                      <input 
                        type="date"
                        className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-xl px-4 text-sm focus:outline-none focus:border-[#00A86B] [color-scheme:dark]"
                        value={formData.launchDate}
                        onChange={(e) => setFormData({...formData, launchDate: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Sync Preference</label>
                      <div className="flex h-12 gap-2">
                         {['WhatsApp', 'Email', 'Both'].map(pref => (
                           <button
                             key={pref}
                             onClick={() => setFormData({...formData, commPref: pref})}
                             className={`flex-1 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                                formData.commPref === pref ? 'bg-[#00A86B] border-[#00A86B]' : 'border-white/5 bg-white/5 text-white/40'
                             }`}
                           >
                              {pref}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">Special Instructions</label>
                   <textarea 
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-5 text-sm focus:outline-none focus:border-[#00A86B] min-h-[140px]"
                      placeholder="Any additional engineering requirements?"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                   />
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-4">
                   <button 
                      onClick={() => setFormData({...formData, agree: !formData.agree})}
                      className={`h-6 w-6 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                        formData.agree ? 'bg-[#00A86B] border-[#00A86B]' : 'border-white/10'
                      }`}
                   >
                      {formData.agree && <CheckCircle2 size={12} className="text-white" />}
                   </button>
                   <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">I agree to the GrowX Labs <span className="text-white underline underline-offset-4">Legal Protocol</span></span>
                </div>
              </div>
            )}

            {/* NAV ACTIONS */}
            <div className="flex gap-4 pt-4">
               {step > 1 && (
                 <button 
                  onClick={prevStep}
                  className="h-14 px-8 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all flex items-center gap-2"
                 >
                   <ArrowLeft size={14} /> Back
                 </button>
               )}
               <button 
                 onClick={() => step < 4 ? nextStep() : handleSubmit()}
                 disabled={submitting || (step === 4 && !formData.agree)}
                 className="flex-1 h-14 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-20"
               >
                 {submitting ? "Processing..." : (step < 4 ? "Continue Phase" : "Deploy Protocol")} 
                 {!submitting && (step < 4 ? <ArrowRight size={14} /> : <Rocket size={14} />)}
               </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Status */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[8px] font-black uppercase tracking-[0.5em] text-white/10 pointer-events-none">
         <span>Secure Onboarding Node</span>
         <div className="h-1 w-1 rounded-full bg-[#00A86B]" />
         <span>Verified SSL Encrypted</span>
      </div>
    </div>
  );
}
