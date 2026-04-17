"use client";

import React, { useState, useEffect } from 'react';
import { CreditCard, Download, Printer, Send, ShieldCheck, Mail, Phone, Globe, MapPin, CheckCircle2 } from 'lucide-react';

interface InvoiceProps {
  data?: {
    client_name?: string;
    business_name?: string;
    email?: string;
    amount?: number;
    description?: string;
    invoice_id?: string;
  };
}

export default function InvoiceTemplate({ data = {} }: InvoiceProps) {
  const [items, setItems] = useState([
    { id: 1, desc: data.description || "Digital Services", qty: 1, rate: data.amount || 0 },
    { id: 2, desc: "", qty: 1, rate: 0 },
    { id: 3, desc: "", qty: 1, rate: 0 },
  ]);

  const [metadata, setMetadata] = useState({
    invoiceNo: data.invoice_id || `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    clientName: data.client_name || "",
    businessName: data.business_name || "",
    advancePaid: 0
  });

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const totalPayable = subtotal; // 0% GST as per user request
  const balanceDue = totalPayable - metadata.advancePaid;

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-neutral-50/50 py-16 px-4 print:bg-white print:p-0 print:m-0">
      {/* TOOLBAR */}
      <div className="max-w-[850px] mx-auto mb-10 flex justify-between items-center print:hidden">
        <div className="flex items-center gap-4">
           <div className="h-12 w-12 rounded-2xl bg-white shadow-xl shadow-black/5 flex items-center justify-center border border-neutral-100">
              <ShieldCheck className="text-[#00A86B]" size={24} />
           </div>
           <div>
              <h2 className="text-sm font-black text-neutral-900 uppercase tracking-tighter">Billing Protocol 2.0</h2>
              <p className="text-xs font-bold text-neutral-400">Precision Financial Engine</p>
           </div>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={handlePrint}
             className="flex items-center gap-2 bg-[#0D1B4B] text-white px-6 h-12 rounded-xl text-sm font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-[#0D1B4B]/20 transition-all active:scale-95"
           >
             <Printer size={16} /> Print Document
           </button>
        </div>
      </div>

      {/* DOCUMENT CONTAINER */}
      <div className="max-w-[850px] mx-auto bg-white shadow-[0_40px_100px_rgba(0,0,0,0.04)] print:shadow-none min-h-[1100px] flex flex-col border border-neutral-100 print:border-none relative">
        
        {/* BRAND STRIPE */}
        <div className="h-3 bg-[#0D1B4B] w-full flex">
           <div className="flex-1 bg-[#0D1B4B]" />
           <div className="w-48 bg-[#00A86B]" />
        </div>

        {/* HEADER BLOCK */}
        <div className="p-16 flex justify-between items-start">
           <div className="space-y-6">
              <div>
                 <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-[#0D1B4B] rounded-xl flex items-center justify-center text-[#00A86B] font-black italic shadow-lg shadow-[#0D1B4B]/20">GX</div>
                    <h1 className="text-3xl font-black text-[#0D1B4B] tracking-tighter uppercase italic">GrowX Labs</h1>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00A86B] pl-1">Build. Automate. Scale.</p>
              </div>

              <div className="space-y-1 text-xs text-neutral-400 leading-relaxed font-medium">
                 <p className="text-neutral-900 font-bold">GrowX Labs Engineering</p>
                 <p>hello@growxlabs.tech</p>
                 <p>growxlabs.tech</p>
                 <p>Guntur, Andhra Pradesh, India</p>
                 <p className="text-[9px] font-bold text-neutral-300 mt-3 tracking-widest uppercase">GSTIN / TAX: UDYAM-AP-XX-XXXXXXX</p>
              </div>
           </div>

           <div className="text-right space-y-8">
              <div className="space-y-1">
                 <h2 className="text-6xl font-black text-neutral-900/5 tracking-tighter italic select-none">INVOICE</h2>
                 <p className="text-sm font-black text-[#0D1B4B] uppercase tracking-[0.2em] relative -top-6"># {metadata.invoiceNo}</p>
              </div>

              <div className="grid grid-cols-2 gap-8 text-right bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#00A86B] mb-1">Issue Date</p>
                    <p className="text-xs font-bold text-neutral-900">{metadata.date}</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-1">Due Date</p>
                    <p className="text-xs font-bold text-neutral-900">{metadata.dueDate}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* ADDRESS MATRIX */}
        <div className="px-16 pb-12 grid grid-cols-2 gap-0 border-y border-neutral-100">
           <div className="p-10 border-r border-neutral-100 group">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-300 mb-6">Billed From</h3>
              <div className="space-y-1">
                 <p className="text-sm font-black text-[#0D1B4B]">Accounts Payable Hub</p>
                 <p className="text-xs font-medium text-neutral-400">Guntur HQ, Andhra Pradesh</p>
                 <p className="text-xs font-medium text-neutral-400 underline underline-offset-4 decoration-neutral-100">billing@growxlabs.tech</p>
              </div>
           </div>
           <div className="p-10 bg-neutral-50/50 relative">
              <div className="absolute top-0 right-0 pt-10 pr-10">
                 <CheckCircle2 size={16} className="text-[#00A86B] opacity-20" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-300 mb-6">Billing To</h3>
              <div className="space-y-1">
                 <p className="text-lg font-black text-[#0D1B4B] tracking-tight">{metadata.businessName || "Client Business Entity"}</p>
                 <p className="text-xs font-bold text-[#00A86B] uppercase tracking-widest italic">{metadata.clientName || "Authorized Signatory"}</p>
                 <p className="text-xs font-medium text-neutral-400 mt-2">{data.email || "recipient@company.com"}</p>
              </div>
           </div>
        </div>

        {/* FINANCIALS PANEL */}
        <div className="px-16 pt-12 flex-1">
           <table className="w-full border-collapse">
              <thead>
                 <tr className="border-b-2 border-neutral-900 text-neutral-400">
                    <th className="py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] w-12">No</th>
                    <th className="py-4 text-left text-[10px] font-black uppercase tracking-[0.2em]">Service Description</th>
                    <th className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] w-24">Unit</th>
                    <th className="py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] w-32">Rate (₹)</th>
                    <th className="py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] w-32">Total (₹)</th>
                 </tr>
              </thead>
              <tbody className="text-xs font-bold text-[#0D1B4B]">
                 {items.map((item, i) => (
                   <tr key={item.id} className="border-b border-neutral-50 group transition-colors">
                      <td className="py-6 text-neutral-300 font-mono tracking-tighter">0{i+1}</td>
                      <td className="py-6 pr-4">
                         <input 
                           defaultValue={item.desc}
                           placeholder="Describe the engineering output..."
                           className="bg-transparent w-full focus:outline-none focus:text-[#00A86B] placeholder:font-normal placeholder:opacity-30 text-sm font-bold tracking-tight"
                         />
                      </td>
                      <td className="py-6 text-center text-neutral-400">
                         <input 
                           type="number"
                           defaultValue={item.qty}
                           className="bg-transparent w-full text-center focus:outline-none"
                         />
                      </td>
                      <td className="py-6 text-right font-mono tracking-tighter">
                         <input 
                           type="number"
                           defaultValue={item.rate}
                           className="bg-transparent w-full text-right focus:outline-none"
                         />
                      </td>
                      <td className="py-6 text-right tabular-nums text-sm font-black tracking-tighter">₹{(item.qty * item.rate).toLocaleString()}</td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* RECAP MODAL STYLE */}
        <div className="m-16 p-10 bg-[#0D1B4B] rounded-3xl grid grid-cols-2 gap-16 text-white relative overflow-hidden shadow-2xl shadow-[#0D1B4B]/20">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A86B] blur-[150px] opacity-10 pointer-events-none" />
           
           <div className="space-y-8 flex flex-col justify-between">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00A86B]">Payment Infrastructure</h4>
                 <div className="space-y-4">
                    <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                       <p className="text-[10px] font-black uppercase tracking-widest text-[#00A86B] mb-1">Razorpay Direct</p>
                       <p className="text-xs font-bold opacity-60">Verified Automated Gateway</p>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Bank Sync</p>
                          <p className="text-xs font-bold">HDFC • VJA • growxlabs@hdfc</p>
                       </div>
                       <Mail size={16} className="opacity-20" />
                    </div>
                 </div>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40">AUTHENTIC DOCUMENT • NON-TRANSFERABLE</p>
           </div>

           <div className="space-y-6">
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-xs font-bold opacity-40 tracking-wider">
                    <span className="uppercase">Net Transaction</span>
                    <span className="tabular-nums">₹{subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs font-bold text-[#00A86B] tracking-wider">
                    <span className="uppercase font-black text-[9px]">Tax Allocation (0%)</span>
                    <span className="tabular-nums">+ ₹0.00</span>
                 </div>
                 <div className="h-px bg-white/10 w-full" />
                 <div className="flex justify-between items-end pt-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 pb-1.5">Gross Total</span>
                    <span className="text-5xl font-black tabular-nums tracking-tighter italic">₹{totalPayable.toLocaleString()}</span>
                 </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
                    <span>Credit Received</span>
                    <span className="text-[#00A86B]">- ₹{metadata.advancePaid.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-widest text-[#00A86B]">Balance Due</span>
                    <span className="text-2xl font-black tabular-nums tracking-tighter decoration-[#00A86B] underline underline-offset-8 decoration-4">₹{balanceDue.toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* LEGAL REQUISITES */}
        <div className="mx-16 mb-16 pt-10 border-t border-neutral-100 grid grid-cols-2 gap-16">
           <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-300">Operational Terms</h5>
              <div className="text-[9px] font-bold text-neutral-400 uppercase leading-relaxed tracking-widest space-y-2">
                 <p>• Net terms: Strictly 3 days post-deployment</p>
                 <p>• Dispute clause: Submit in writing within 24H</p>
                 <p>• Non-payment: Architecture freeze after +7D</p>
              </div>
           </div>
           <div className="flex flex-col items-end justify-center text-right space-y-3">
              <div className="h-12 w-48 border border-neutral-100 rounded-xl bg-neutral-50/50 flex flex-col items-center justify-center">
                 <p className="text-[10px] font-black italic text-[#00A86B] uppercase tracking-[0.2em] mb-1">Authorised Signatory</p>
                 <div className="h-px w-24 bg-[#0D1B4B]/10" />
              </div>
              <p className="text-[8px] font-black text-neutral-300 uppercase tracking-[0.5em]">Digitally Secured by GrowX</p>
           </div>
        </div>
      </div>

      {/* CORE PRINT STYLE */}
      <style jsx global>{`
        @media print {
          body { background: white !important; margin: 0 !important; -webkit-print-color-adjust: exact; }
          .print-hidden { display: none !important; }
          @page { margin: 1cm; size: A4 portrait; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; margin: 0 !important; }
          .bg-neutral-50\/50 { background: white !important; }
          .shadow-\[0_40px_100px_rgba\(0\,0\,0\,0\.04\)\] { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
