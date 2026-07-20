"use client";

import React, { useState } from "react";
import { Receipt, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface PayrollSlipBuilderProps {
  payrollItems: any[];
  payrollMonth: string;
  onGenerate: (month: string, employeeIds: string[]) => void;
}

export function PayrollSlipBuilder({ payrollItems, payrollMonth, onGenerate }: PayrollSlipBuilderProps) {
  const [selectedMonth, setSelectedMonth] = useState(payrollMonth || new Date().toISOString().slice(0, 7));

  const totalEarnings = payrollItems.reduce((sum: number, i: any) => sum + (Number(i.basic_salary) + Number(i.allowances)), 0);
  const totalDeductions = payrollItems.reduce((sum: number, i: any) => sum + (Number(i.pf_deduction) + Number(i.esi_deduction) + Number(i.tds_withheld)), 0);
  const totalNet = payrollItems.reduce((sum: number, i: any) => sum + Number(i.net_payable), 0);
  const maxBar = Math.max(totalEarnings, totalDeductions, 1);

  return (
    <div className="space-y-5 text-[var(--text-primary)]">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)]">Total Earnings</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-black text-[var(--text-primary)] font-mono">₹{totalEarnings.toLocaleString()}</h3>
          <p className="text-[10px] text-[var(--text-secondary)] mt-1 font-medium">Basic + Allowances</p>
        </Card>

        <Card className="p-5 border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)]">Total Deductions</span>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <h3 className="text-2xl font-black text-[var(--text-primary)] font-mono">₹{totalDeductions.toLocaleString()}</h3>
          <p className="text-[10px] text-[var(--text-secondary)] mt-1 font-medium">PF + ESI + TDS</p>
        </Card>

        <Card className="p-5 border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)]">Net Payable</span>
            <Receipt className="h-4 w-4 text-[#0075de]" />
          </div>
          <h3 className="text-2xl font-black text-[var(--text-primary)] font-mono">₹{totalNet.toLocaleString()}</h3>
          <span className="text-[#0075de] bg-[#0075de]/10 px-2 py-0.5 rounded border border-[#0075de]/20 text-[8px] font-bold inline-block mt-1">
            {payrollItems.length} Employees
          </span>
        </Card>
      </div>

      {/* Earnings vs Deductions Bar */}
      <Card className="p-5 border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm">
        <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-4">Earnings vs Deductions</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-bold text-emerald-500">Earnings</span>
              <span className="text-xs font-mono font-bold text-[var(--text-secondary)]">₹{totalEarnings.toLocaleString()}</span>
            </div>
            <div className="w-full bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-full h-3">
              <div className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(totalEarnings / maxBar) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-bold text-red-500">Deductions</span>
              <span className="text-xs font-mono font-bold text-[var(--text-secondary)]">₹{totalDeductions.toLocaleString()}</span>
            </div>
            <div className="w-full bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-full h-3">
              <div className="bg-red-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(totalDeductions / maxBar) * 100}%` }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Payslip Table */}
      <Card className="border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-muted)]">Employee Payslips</h4>
          <div className="flex items-center gap-3">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs border border-[var(--border-subtle)] bg-[var(--surface-1)] text-[var(--text-primary)] rounded-lg px-2.5 py-1.5 font-mono"
            />
            <button
              onClick={() => onGenerate(selectedMonth + "-01", payrollItems.map((i: any) => i.employee_id))}
              className="bg-[#0075de] hover:bg-[#005bab] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Generate Payroll
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[var(--surface-2)] border-b border-[var(--border-subtle)]">
                <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Employee</th>
                <th className="text-right px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Basic</th>
                <th className="text-right px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Allowances</th>
                <th className="text-right px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">PF</th>
                <th className="text-right px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">ESI</th>
                <th className="text-right px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">TDS</th>
                <th className="text-right px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Net Payable</th>
              </tr>
            </thead>
            <tbody>
              {payrollItems.length === 0 && (
                <tr><td colSpan={7} className="text-center py-12 text-[var(--text-muted)]">No payroll items found for selected month</td></tr>
              )}
              {payrollItems.map((item: any) => (
                <tr key={item.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--surface-2)] transition-colors">
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{item.employee?.full_name || "—"}</td>
                  <td className="px-4 py-3 text-right font-mono text-[var(--text-secondary)]">₹{Number(item.basic_salary).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-mono text-[var(--text-secondary)]">₹{Number(item.allowances).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-mono text-red-500">₹{Number(item.pf_deduction).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-mono text-red-500">₹{Number(item.esi_deduction).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-mono text-red-500">₹{Number(item.tds_withheld).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-mono font-black text-[#0075de]">₹{Number(item.net_payable).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
