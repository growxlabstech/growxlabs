"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Architecture confirmed. I am GrowX AI. How can I assist your business growth today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: messages.concat({ role: "user", content: userMessage }) 
        }),
      });

      const data = await response.json();
      
      if (data.isLeadSaved) {
        // Handle lead saving to database
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data.leadData),
        });
      }

      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Communication uplink error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-6 w-[400px] h-[580px] glass rounded-[2.5rem] border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
               <div className="flex items-center space-x-4">
                 <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center">
                    <Bot className="text-black h-5 w-5" />
                 </div>
                 <div>
                   <h3 className="text-white font-black text-lg tracking-tighter leading-none">GrowX AI</h3>
                   <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-primary mt-1">
                     <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse mr-2" />
                     Engine Online
                   </span>
                 </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                 <X size={20} />
               </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide"
            >
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={cn(
                    "flex flex-col",
                    m.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed",
                    m.role === "user" 
                      ? "bg-white text-black font-bold" 
                      : "bg-white/5 text-white/70 font-light border border-white/5"
                  )}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex space-x-2">
                     <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                     <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                     <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                   </div>
                </div>
              )}
            </div>

            {/* Footer / Input */}
            <form onSubmit={handleSendMessage} className="p-8 pt-0">
              <div className="relative">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inquire about architecture..."
                  className="w-full h-14 bg-white/[0.03] border border-white/5 rounded-2xl pl-6 pr-14 text-white text-sm focus:outline-none focus:border-white/20 transition-all font-light"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="mt-4 text-center text-[8px] font-black uppercase tracking-widest text-white/10">
                AI Agent Policy: No final pricing or contracts.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-white/10 text-black overflow-hidden relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
             <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
               <X size={28} />
             </motion.div>
          ) : (
             <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
               <MessageCircle size={28} />
             </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
