"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { PayrollSlipBuilder } from "@/components/admin/hrms/PayrollSlipBuilder";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [payRes, empRes] = await Promise.all([
        fetch("/api/hrms/payroll"),
        fetch("/api/hrms/employees")
      ]);
      const payData = await payRes.json();
      const empData = await empRes.json();
      setPayrolls(payData.payrolls || []);
      setEmployees(empData.employees || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleGenerate = async (month: string, employeeIds: string[]) => {
    try {
      setGenerating(true);
      const ids = employeeIds.length > 0 ? employeeIds : employees.map((e: any) => e.id);
      const res = await fetch("/api/hrms/payroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payroll_month: month, employee_ids: ids })
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); } finally { setGenerating(false); }
  };

  const latestPayroll = payrolls[0];
  const payrollItems = latestPayroll?.payroll_items || [];

  return (
    <div className="space-y-8 text-[var(--text-primary)]">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-none">Payroll Management</h1>
        <p className="text-[var(--text-secondary)] text-xs">Generate monthly payslips with PF, ESI, and TDS deductions.</p>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#0075de] h-8 w-8" />
        </div>
      ) : (
        <PayrollSlipBuilder
          payrollItems={payrollItems}
          payrollMonth={latestPayroll?.payroll_month || ""}
          onGenerate={handleGenerate}
        />
      )}
    </div>
  );
}
