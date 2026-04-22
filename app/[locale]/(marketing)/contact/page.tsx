"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, MessageCircle, ShieldCheck, Clock, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Our systems are currently experiencing a high volume of inquiries. Please try again or email us directly.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="text-center mb-20">
          <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#00A86B] mb-4 block">
            GET IN TOUCH
          </span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[48px] md:text-[72px] font-bold text-white mb-8 tracking-tight"
          >
            Start Your <span className="text-gradient">Project.</span>
          </motion.h1>
          <p className="text-[18px] text-[#A0A0A0] max-w-[520px] mx-auto leading-[1.7]">
            Tell us about your project and we will respond within 4 hours with a custom plan.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div className="flex justify-center mb-16">
          <a
            href="https://wa.me/919121600000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#00A86B] text-white font-semibold rounded-full hover:bg-[#00A86B]/90 hover:scale-105 transition-all text-base"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Direct Contact</h2>
              <p className="text-[#A0A0A0] leading-[1.7] text-[15px]">
                We are currently accepting new projects. Use the form or contact us directly.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@growxlabs.tech", href: "mailto:hello@growxlabs.tech" },
                { icon: Phone, label: "Phone", value: "+91 91216 00000", href: "tel:+919121600000" },
                { icon: MapPin, label: "Location", value: "Guntur, Andhra Pradesh, India" },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-5 group">
                  <div className="w-12 h-12 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl flex items-center justify-center transition-all group-hover:border-[rgba(0,168,107,0.3)]">
                    <item.icon className="text-[#00A86B] h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#A0A0A0]/60 uppercase tracking-widest font-semibold">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white font-semibold text-base hover:text-[#00A86B] transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-white font-semibold text-base">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Signals */}
            <div className="pt-8 border-t border-white/5 space-y-4">
              {[
                { icon: ShieldCheck, text: "Registered Business — UDYAM-AP-22-0063260" },
                { icon: Clock, text: "Response within 4 hours" },
                { icon: Sparkles, text: "Free 15-minute discovery call" },
              ].map((signal, i) => (
                <div key={i} className="flex items-center gap-3 text-[13px] text-[#A0A0A0]">
                  <signal.icon size={16} className="text-[#00A86B] shrink-0" />
                  <span>{signal.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="p-8 md:p-10 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-20 h-20 bg-[#00A86B]/10 border border-[#00A86B]/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="text-[#00A86B] w-10 h-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="text-[#A0A0A0] text-[15px]">
                      We will get back to you within 4 hours.
                    </p>
                  </div>
                  <Button onClick={() => setStatus("idle")} variant="outline" className="rounded-full px-8 h-11 border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all">
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#A0A0A0]/60 ml-1">Full Name</label>
                    <Input 
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 rounded-xl bg-white/[0.03] border-white/5 pl-4 text-white focus:border-[#00A86B]/40 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-widest text-[#A0A0A0]/60 ml-1">Email</label>
                      <Input 
                        required
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 rounded-xl bg-white/[0.03] border-white/5 pl-4 text-white focus:border-[#00A86B]/40 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-widest text-[#A0A0A0]/60 ml-1">Phone</label>
                      <Input 
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-12 rounded-xl bg-white/[0.03] border-white/5 pl-4 text-white focus:border-[#00A86B]/40 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-widest text-[#A0A0A0]/60 ml-1">Service Needed</label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/5 pl-4 pr-4 text-white focus:border-[#00A86B]/40 transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-black">Select a service</option>
                        <option value="website" className="bg-black">Website Development</option>
                        <option value="automation" className="bg-black">n8n Automation</option>
                        <option value="hosting" className="bg-black">Hosting and Maintenance</option>
                        <option value="ai" className="bg-black">AI Integration</option>
                        <option value="bundle" className="bg-black">Full Bundle</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-widest text-[#A0A0A0]/60 ml-1">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/5 pl-4 pr-4 text-white focus:border-[#00A86B]/40 transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-black">Select budget</option>
                        <option value="under-15k" className="bg-black">Under ₹15,000</option>
                        <option value="15k-35k" className="bg-black">₹15,000 – ₹35,000</option>
                        <option value="35k-70k" className="bg-black">₹35,000 – ₹70,000</option>
                        <option value="above-70k" className="bg-black">Above ₹70,000</option>
                        <option value="overseas" className="bg-black">Overseas project (USD)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#A0A0A0]/60 ml-1">Message</label>
                    <Textarea 
                      required
                      placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[140px] rounded-xl bg-white/[0.03] border-white/5 p-4 text-white focus:border-[#00A86B]/40 transition-all leading-relaxed"
                    />
                  </div>

                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center space-x-3 text-red-500 text-xs bg-red-500/10 p-4 rounded-xl border border-red-500/20"
                    >
                      <AlertCircle size={16} />
                      <span className="font-medium">{errorMessage}</span>
                    </motion.div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-[#00A86B] text-white hover:bg-[#00A86B]/90 rounded-xl shadow-none transition-all" 
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Get a Custom Quote →"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
