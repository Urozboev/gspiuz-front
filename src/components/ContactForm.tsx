"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { useT } from "@/hooks/useT";
import { endpoints } from "@/lib/endpoints";
import { API_BASE } from "@/lib/config";

/** Aloqa formasi — backendga POST /contacts yuboradi (Telegramga ham boradi). */
export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const { p, lang } = useT();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(
        `${API_BASE}${endpoints.contacts}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": lang,
          },
          body: JSON.stringify({ name, phone_number: phone, message }),
        },
      );
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-6">
        <div className="h-16 w-16 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-9 h-9 text-accent-500" />
        </div>
        <h3 className="text-xl font-semibold text-ink-900 dark:text-white">
          {p.contactForm.success}
        </h3>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500"
        >
          {p.contactForm.title}
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full px-5 py-3.5 rounded-lg bg-mist-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-base text-ink-900 dark:text-white placeholder:text-ink-400 focus:outline-none focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-500/15 transition-all";

  // suppress unused warning for `compact`
  void compact;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={p.contactForm.name}
          className={inputCls}
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={p.contactForm.phone}
          className={inputCls}
        />
      </div>
      <textarea
        required
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={p.contactForm.message}
        className={`${inputCls} resize-none`}
      />
      {status === "error" && (
        <p className="text-sm font-medium text-red-500">{p.contactForm.error}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-800 disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {p.contactForm.sending}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {p.contactForm.submit}
          </>
        )}
      </button>
    </form>
  );
}
