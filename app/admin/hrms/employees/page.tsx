"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Plus, Search, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const STATUS_BADGES: Record<string, string> = {
  ACTIVE: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  ON_LEAVE: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  SUSPENDED: "text-red-500 bg-red-500/10 border-red-500/20",
  TERMINATED: "text-[var(--text-muted)] bg-[var(--surface-2)] border-[var(--border-subtle)]",
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "", full_name: "", email: "", phone: "", joining_date: "", department_id: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/hrms/employees");
      const data = await res.json();
      setEmployees(data.employees || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/hrms/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ employee_id: "", full_name: "", email: "", phone: "", joining_date: "", department_id: "" });
        fetchEmployees();
      }
    } catch (e) { console.error(e); } finally { setSubmitting(false); }
  };

  const filtered = employees.filter((e) =>
    e.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    e.employee_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 text-[var(--text-primary)]">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-none">Employees Directory</h1>
        <p className="text-[var(--text-secondary)] text-xs">Manage employee profiles, department assignments, and employment status.</p>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-[var(--border-subtle)] bg-[var(--surface-1)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0075de]/20 focus:border-[#0075de]"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-[#0075de] hover:bg-[#005bab] text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="h-3.5 w-3.5" /> Add Employee
        </button>
      </div>

      {/* Add Employee Modal */}
      {showForm && (
        <Card className="p-5 border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">New Employee Profile</h3>
            <button onClick={() => setShowForm(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { key: "employee_id", label: "Employee ID", placeholder: "EMP-002" },
              { key: "full_name", label: "Full Name", placeholder: "John Doe" },
              { key: "email", label: "Email", placeholder: "john@growxlabs.tech" },
              { key: "phone", label: "Phone", placeholder: "+919876543210" },
              { key: "joining_date", label: "Joining Date", placeholder: "", type: "date" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1 block">{field.label}</label>
                <input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={(formData as any)[field.key]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[var(--border-subtle)] bg-[var(--surface-1)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0075de]/20"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-4 bg-[#0075de] hover:bg-[#005bab] text-white px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
          >
            {submitting ? <Loader2 className="animate-spin h-3.5 w-3.5" /> : "Create Employee"}
          </button>
        </Card>
      )}

      {/* Table */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#0075de] h-8 w-8" />
        </div>
      ) : (
        <Card className="border border-[var(--border-subtle)] bg-[var(--card)] rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[var(--surface-2)] border-b border-[var(--border-subtle)]">
                  <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Employee ID</th>
                  <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Name</th>
                  <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Email</th>
                  <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Department</th>
                  <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
                  <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Joining Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-[var(--text-muted)]">No employees found</td></tr>
                )}
                {filtered.map((emp) => (
                  <tr key={emp.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--surface-2)] transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-[var(--text-secondary)]">{emp.employee_id}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{emp.full_name}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{emp.email}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{emp.department?.name || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={cn("px-2 py-0.5 rounded border text-[8px] font-bold", STATUS_BADGES[emp.status] || STATUS_BADGES.ACTIVE)}>
                        {emp.status || "ACTIVE"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[var(--text-secondary)]">{emp.joining_date || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
