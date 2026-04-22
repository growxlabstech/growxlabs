import { cn } from "@/lib/utils";

export function Card({ className, children, onClick }: { className?: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[rgba(0,168,107,0.3)]",
        className
      )}
    >
      {children}
    </div>
  );
}
