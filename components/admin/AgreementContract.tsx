"use client";

import React, { useState } from 'react';
import { Check, Mail, Phone, MapPin, Globe, Download, Printer, ShieldCheck } from 'lucide-react';

interface AgreementProps {
  data?: {
    client_name?: string;
    business_name?: string;
    email?: string;
    phone?: string;
    service_type?: string;
    project_description?: string;
    total_amount?: string | number;
    advance_amount?: string | number;
    start_date?: string;
    delivery_date?: string;
    invoice_no?: string;
  };
}

export default function AgreementContract({ data = {} }: AgreementProps) {
  const [formData] = useState({
    invoiceNumber: data.invoice_no || `GX-${new Date().getFullYear()}-001`,
    date: new Date().toLocaleDateString(),
    clientName: data.client_name || "",
    businessName: data.business_name || "",
    clientEmail: data.email || "",
    clientPhone: data.phone || "",
    projectName: data.service_type || "Digital Transformation Project",
    totalValue: data.total_amount || "0",
    advanceAmount: data.advance_amount || "0",
    startDate: data.start_date || "",
    deliveryDate: data.delivery_date || "",
    scope: ["", "", "", "", ""],
    notIncluded: "Content creation, Third-party licensing fees, SEO beyond basic metadata.",
    serviceTypes: {
      website: true,
      automation: false,
      hosting: false,
      bundle: false
    }
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-100 py-12 px-4 print:bg-white print:py-0 print:px-0">
      {/* Control Panel (Hidden on Print) */}
      <div className="max-w-[850px] mx-auto mb-8 flex justify-between items-center print:hidden">
        <div className="flex items-center gap-2 text-neutral-500">
           <ShieldCheck className="text-green-600 h-5 w-5" />
           <span className="text-xs font-bold uppercase tracking-widest leading-none">Legal Standard Enforcement</span>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#0D1B4B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl transition-all active:scale-95"
        >
          <Printer className="h-4 w-4" /> Download & Print Agreement
        </button>
      </div>

      {/* The Agreement Page */}
      <div className="max-w-[850px] mx-auto bg-white shadow-2xl print:shadow-none min-h-[1100px] flex flex-col font-sans border border-neutral-200 print:border-none">
        
        {/* HEADER SECTION */}
        <div className="bg-[#0D1B4B] text-white p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
           <div className="relative z-10 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black tracking-tighter mb-2 italic">GROWX LABS</h1>
                <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-60">Engineering Excellence</p>
              </div>
              <div className="text-right">
                 <h2 className="text-2xl font-black text-[#00A86B] tracking-tight uppercase">Client Service Agreement</h2>
                 <div className="flex gap-4 mt-4 text-[10px] items-center justify-end font-bold opacity-80">
                    <div className="flex flex-col border-r border-white/10 pr-4">
                       <span className="uppercase tracking-widest text-[#00A86B]">Agreement ID</span>
                       <span className="text-sm mt-1">{formData.invoiceNumber}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="uppercase tracking-widest text-[#00A86B]">Issue Date</span>
                       <span className="text-sm mt-1">{formData.date}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-2 h-44 border-b border-neutral-100">
           <div className="p-10 border-r border-neutral-100 flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00A86B] mb-4">From: Service Provider</span>
              <h3 className="font-bold text-lg text-[#0D1B4B]">GrowX Labs</h3>
              <div className="mt-2 space-y-1 text-xs text-neutral-500 font-medium leading-tight">
                 <p className="flex items-center gap-2"><Mail className="h-3 w-3" /> hello@growxlabs.tech</p>
                 <p className="flex items-center gap-2"><Globe className="h-3 w-3" /> growxlabs.tech</p>
                 <p className="flex items-center gap-2"><MapPin className="h-3 w-3" /> Guntur, AP, India</p>
              </div>
           </div>
           <div className="p-10 flex flex-col justify-center bg-neutral-50/50">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00A86B] mb-4 text-right">To: Client Party</span>
              <h3 className="font-bold text-lg text-[#0D1B4B] text-right">{formData.businessName || "Valued Client"}</h3>
              <div className="mt-2 space-y-1 text-xs text-neutral-500 font-medium text-right leading-tight">
                 <p className="justify-end flex items-center gap-2">{formData.clientEmail || "Email Not Provided"} <Mail className="h-3 w-3" /></p>
                 <p className="justify-end flex items-center gap-2">{formData.clientPhone || "Phone Not Provided"} <Phone className="h-3 w-3" /></p>
                 <p className="justify-end flex items-center gap-2 italic">{formData.clientName || "Authorized Signatory"} <Check className="h-3 w-3 text-green-600" /></p>
              </div>
           </div>
        </div>

        {/* PROJECT DETAILS BOX */}
        <div className="p-12">
           <div className="bg-[#0D1B4B]/[0.02] border border-neutral-100 rounded-3xl p-8 mb-10">
              <div className="grid grid-cols-3 gap-y-10">
                 <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-2">Project Classification</label>
                    <p className="text-xl font-bold text-[#0D1B4B] leading-tight">{formData.projectName}</p>
                 </div>
                 <div className="text-right">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-2">Execution Period</label>
                    <p className="text-sm font-bold text-[#0D1B4B]">{formData.startDate || "TBD"} — {formData.deliveryDate || "TBD"}</p>
                 </div>
                 
                 <div className="col-span-3 pt-6 border-t border-dashed border-neutral-100">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-4">Contracted Services</label>
                    <div className="flex gap-8">
                       {Object.entries(formData.serviceTypes).map(([type, checked]) => (
                         <div key={type} className="flex items-center gap-2.5">
                            <div className={`h-4 w-4 rounded border flex items-center justify-center ${checked ? 'bg-[#00A86B] border-[#00A86B]' : 'border-neutral-200'}`}>
                               {checked && <Check className="text-white h-2.5 w-2.5" strokeWidth={4} />}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-700">{type}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* SCOPE OF WORK */}
           <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-[#0D1B4B] bg-[#00A86B]/10 px-3 py-1 rounded">Scope of Deliverables</h4>
                 <div className="h-px bg-[#00A86B] flex-1 opacity-10" />
              </div>
              <div className="space-y-4">
                 {[1,2,3,4,5].map((i) => (
                   <div key={i} className="flex items-start gap-4">
                      <span className="h-5 w-5 rounded-full bg-[#00A86B] text-white text-[9px] font-black flex items-center justify-center shrink-0">{i}</span>
                      <div className="min-h-[2.5rem] border-b border-neutral-100 flex-1 flex items-center text-sm font-medium text-neutral-600 px-2 italic">
                         {i === 1 && data.project_description}
                      </div>
                   </div>
                 ))}
                 <div className="pt-6">
                    <label className="text-[9px] font-black uppercase tracking-widest text-red-600 mb-2 block">Excluded from this agreement</label>
                    <div className="p-4 bg-red-500/[0.03] border border-red-500/10 rounded-xl text-[11px] font-medium text-neutral-500 italic leading-relaxed">
                       {formData.notIncluded}
                    </div>
                 </div>
              </div>
           </div>

           {/* PAYMENT SCHEDULE */}
           <div className="mb-12">
              <table className="w-full border-collapse">
                 <thead>
                    <tr className="bg-[#0D1B4B] text-white">
                       <th className="text-left p-4 text-[10px] font-black uppercase tracking-widest">Milestone Breakdown</th>
                       <th className="text-right p-4 text-[10px] font-black uppercase tracking-widest">Allocation</th>
                       <th className="text-right p-4 text-[10px] font-black uppercase tracking-widest">Fee (INR)</th>
                    </tr>
                 </thead>
                 <tbody className="text-xs font-bold text-[#0D1B4B]">
                    <tr className="border-b border-neutral-100">
                       <td className="p-4">Project Kickoff & Resource Allocation (Advance)</td>
                       <td className="p-4 text-right text-neutral-400">50%</td>
                       <td className="p-4 text-right text-[#00A86B] text-base">₹{formData.advanceAmount}</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                       <td className="p-4">Final Testing & Knowledge Transfer</td>
                       <td className="p-4 text-right text-neutral-400">50%</td>
                       <td className="p-4 text-right text-base">₹{Number(formData.totalValue) - Number(formData.advanceAmount)}</td>
                    </tr>
                    <tr className="bg-neutral-50 border-b-2 border-[#0D1B4B]">
                       <td className="p-4">Total Contract Commitment</td>
                       <td className="p-4 text-right italic font-black text-[#00A86B]">LUMP SUM</td>
                       <td className="p-4 text-right text-xl">₹{formData.totalValue}</td>
                    </tr>
                    <tr>
                       <td colSpan={3} className="p-4 text-[10px] font-medium text-neutral-400 italic">
                          * Additional revisions beyond the included rounds are billed at ₹2,000/round.
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>

           {/* LEGAL TERMS */}
           <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-16">
              {[
                { title: "Revision Cycles", desc: "Two rounds of major revisions are included. Substantial scope deviations post-approval will incur supplementary fees." },
                { title: "Intellectual Property", desc: "Global IP rights and source code access transfer to Client only upon complete clearance of all outstanding invoices." },
                { title: "Client Cooperation", desc: "Client shall provide necessary assets and feedback within 7 business days to maintain the agreed project timeline." },
                { title: "Confidentiality", desc: "Both parties agree to a 3-year mutual non-disclosure period regarding trade secrets and project specifications." },
                { title: "Termination", desc: "Either party may terminate with 14 days notice. Work completed until termination date will be payable pro-rata." },
                { title: "Governance", desc: "This agreement is governed by laws of Guntur, AP, India. All disputes are subject to local jurisdictional courts." }
              ].map((term, i) => (
                <div key={i} className="relative pl-8">
                   <span className="absolute left-0 top-0 text-[10px] font-black text-[#00A86B] bg-[#00A86B]/10 px-1.5 py-0.5 rounded leading-none italic">{i+1}</span>
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-[#0D1B4B] mb-1.5">{term.title}</h5>
                   <p className="text-[10px] leading-relaxed text-neutral-500 font-medium italic">{term.desc}</p>
                </div>
              ))}
           </div>

           {/* SIGNATURE AREA */}
           <div className="grid grid-cols-2 gap-24 pt-12">
              <div className="space-y-6">
                 <div className="h-10 border-b-2 border-neutral-900" />
                 <div>
                    <p className="text-[10px] font-black uppercase text-[#0D1B4B]">Authorized For GrowX Labs</p>
                    <p className="text-[9px] font-bold text-neutral-400 mt-0.5 tracking-widest italic uppercase">Principal Engineer / Direct Partner</p>
                 </div>
                 <div className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">Date: ____ / ____ / ________</div>
              </div>
              <div className="space-y-6">
                 <div className="h-10 border-b-2 border-neutral-900" />
                 <div>
                    <p className="text-[10px] font-black uppercase text-[#0D1B4B]">Authorized For Project Client</p>
                    <p className="text-[9px] font-bold text-neutral-400 mt-0.5 tracking-widest italic uppercase">{formData.businessName || "Client Representative"}</p>
                 </div>
                 <div className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">Date: ____ / ____ / ________</div>
              </div>
           </div>
        </div>

        {/* FOOTER BAR */}
        <div className="mt-auto bg-[#0D1B4B] p-5 text-center">
           <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">
              Governed by Indian Contract Act 1872 | Arbitration Locale: Guntur, Andhra Pradesh
           </p>
        </div>
      </div>
      
      {/* Print Specific CSS Overrides */}
      <style jsx global>{`
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .print-hidden { display: none !important; }
          @page { margin: 1cm; size: A4; }
          .shadow-2xl { box-shadow: none !important; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; }
          .bg-neutral-100 { background: white !important; }
        }
      `}</style>
    </div>
  );
}
