"use client";

import React, { useState } from 'react';
import { Printer, ShieldCheck, Mail, CheckCircle2, Pencil, Eye, Plus, Trash2 } from 'lucide-react';

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

interface LineItem {
  id: number;
  desc: string;
  qty: number;
  rate: number;
}

// Editable field moved OUTSIDE to prevent focus loss
const EditField = ({ isEditing, value, onChange, placeholder, className, type = "text" }: {
  isEditing: boolean;
  value: string | number;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  type?: string;
}) => {
  if (!isEditing) {
    return <span className={className}>{value || placeholder || "—"}</span>;
  }
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${className} bg-yellow-50/80 border-b-2 border-[#00A86B] outline-none px-1 rounded text-neutral-900`}
      style={{ minWidth: type === "number" ? 60 : 80, color: "inherit" }}
    />
  );
};

export default function InvoiceTemplate({ data = {} }: InvoiceProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [items, setItems] = useState<LineItem[]>([
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
    clientEmail: data.email || "",
    advancePaid: 0
  });

  // Live calculations
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const totalPayable = subtotal;
  const balanceDue = totalPayable - metadata.advancePaid;

  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: field === 'desc' ? value : Number(value) || 0 } : item
    ));
  };

  const addItem = () => {
    const maxId = Math.max(...items.map(i => i.id), 0);
    setItems(prev => [...prev, { id: maxId + 1, desc: "", qty: 1, rate: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateMeta = (field: string, value: any) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
  };

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
             onClick={() => setIsEditing(!isEditing)}
             className={`flex items-center gap-2 px-6 h-12 rounded-xl font-bold transition-all active:scale-95 text-sm ${
               isEditing
                 ? 'bg-[#00A86B] text-white hover:bg-[#00A86B]/90'
                 : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
             }`}
           >
             {isEditing ? <><Eye className="h-4 w-4" /> Preview</> : <><Pencil className="h-4 w-4" /> Edit Live</>}
           </button>
           <button 
             onClick={handlePrint}
             className="flex items-center gap-2 bg-[#0D1B4B] text-white px-6 h-12 rounded-xl text-sm font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-[#0D1B4B]/20 transition-all active:scale-95"
           >
             <Printer size={16} /> Print Document
           </button>
        </div>
      </div>

      {/* Edit Indicator */}
      {isEditing && (
        <div className="max-w-[850px] mx-auto mb-4 px-4 py-3 bg-[#00A86B]/10 border border-[#00A86B]/20 rounded-xl flex items-center gap-3 print:hidden">
          <Pencil className="h-4 w-4 text-[#00A86B]" />
          <p className="text-sm font-medium text-[#00A86B]">
            <strong>Edit Mode</strong> — All fields are editable. Totals recalculate live.
          </p>
        </div>
      )}

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
                 <p className="text-[9px] font-bold text-neutral-300 mt-3 tracking-widest uppercase">UDYAM: UDYAM-AP-22-0063260</p>
              </div>
           </div>

           <div className="text-right space-y-8">
              <div className="space-y-1">
                 <h2 className="text-6xl font-black text-neutral-900/5 tracking-tighter italic select-none">INVOICE</h2>
                 <p className="text-sm font-black text-[#0D1B4B] uppercase tracking-[0.2em] relative -top-6">
                   # <EditField isEditing={isEditing} value={metadata.invoiceNo} onChange={(v) => updateMeta('invoiceNo', v)} className="text-sm font-black text-[#0D1B4B]" />
                 </p>
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
                 <p className="text-lg font-black text-[#0D1B4B] tracking-tight">
                   <EditField isEditing={isEditing} value={metadata.businessName} onChange={(v) => updateMeta('businessName', v)} placeholder="Client Business Name" className="text-lg font-black text-[#0D1B4B]" />
                 </p>
                 <p className="text-xs font-bold text-[#00A86B] uppercase tracking-widest italic">
                   <EditField isEditing={isEditing} value={metadata.clientName} onChange={(v) => updateMeta('clientName', v)} placeholder="Contact Name" className="text-xs font-bold text-[#00A86B]" />
                 </p>
                 <p className="text-xs font-medium text-neutral-400 mt-2">
                   <EditField isEditing={isEditing} value={metadata.clientEmail} onChange={(v) => updateMeta('clientEmail', v)} placeholder="email@company.com" className="text-xs text-neutral-400" />
                 </p>
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
                    {isEditing && <th className="py-4 w-10 print:hidden"></th>}
                 </tr>
              </thead>
              <tbody className="text-xs font-bold text-[#0D1B4B]">
                 {items.map((item, i) => (
                   <tr key={item.id} className="border-b border-neutral-50 group transition-colors">
                      <td className="py-6 text-neutral-300 font-mono tracking-tighter">0{i+1}</td>
                      <td className="py-6 pr-4">
                         <input 
                           value={item.desc}
                           onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                           placeholder="Describe the engineering output..."
                           className={`bg-transparent w-full focus:outline-none placeholder:font-normal placeholder:opacity-30 text-sm font-bold tracking-tight ${
                             isEditing ? 'bg-yellow-50/80 border-b-2 border-[#00A86B] rounded px-1' : 'focus:text-[#00A86B]'
                           }`}
                           readOnly={!isEditing}
                         />
                      </td>
                      <td className="py-6 text-center text-neutral-400">
                         <input 
                           type="number"
                           value={item.qty}
                           onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                           className={`bg-transparent w-full text-center focus:outline-none ${
                             isEditing ? 'bg-yellow-50/80 border-b-2 border-[#00A86B] rounded' : ''
                           }`}
                           readOnly={!isEditing}
                           min={0}
                         />
                      </td>
                      <td className="py-6 text-right font-mono tracking-tighter">
                         <input 
                           type="number"
                           value={item.rate}
                           onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                           className={`bg-transparent w-full text-right focus:outline-none ${
                             isEditing ? 'bg-yellow-50/80 border-b-2 border-[#00A86B] rounded' : ''
                           }`}
                           readOnly={!isEditing}
                           min={0}
                         />
                      </td>
                      <td className="py-6 text-right tabular-nums text-sm font-black tracking-tighter">₹{(item.qty * item.rate).toLocaleString()}</td>
                      {isEditing && (
                        <td className="py-6 text-center print:hidden">
                          <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      )}
                   </tr>
                 ))}
              </tbody>
           </table>

           {/* Add Line Item */}
           {isEditing && (
             <button
               onClick={addItem}
               className="mt-4 flex items-center gap-2 text-[#00A86B] text-xs font-bold uppercase tracking-widest hover:text-[#00A86B]/80 transition-colors print:hidden"
             >
               <Plus size={14} /> Add Line Item
             </button>
           )}
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
                    <span className="text-[#00A86B]">
                      - ₹{isEditing ? (
                        <input
                          type="number"
                          value={metadata.advancePaid}
                          onChange={(e) => updateMeta('advancePaid', Number(e.target.value) || 0)}
                          className="bg-yellow-50/20 border-b-2 border-[#00A86B] outline-none text-center w-24 text-[#00A86B] rounded"
                          min={0}
                        />
                      ) : metadata.advancePaid.toLocaleString()}
                    </span>
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
          body { background: white !important; margin: 0 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden, [class*="print:hidden"] { display: none !important; }
          @page { margin: 1cm; size: A4 portrait; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; margin: 0 !important; }
          .bg-neutral-50\\/50 { background: white !important; }
          .shadow-\\[0_40px_100px_rgba\\(0\\,0\\,0\\,0\\.04\\)\\] { box-shadow: none !important; }
          input, textarea { border: none !important; background: none !important; }
          button { display: none !important; }
        }
      `}</style>
    </div>
  );
}
