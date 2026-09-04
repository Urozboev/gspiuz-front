"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, Loader2, Paperclip, Copy, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useApi } from "@/hooks/useApi";
import { apiPost } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { appeal as appealDict } from "@/locales/sections";
import type { Appeal, AppealMeta, AppealType } from "@/lib/types";

const INPUT_CLS =
  "w-full px-5 py-3.5 rounded-lg bg-mist-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-base text-ink-900 dark:text-white placeholder:text-ink-400 focus:outline-none focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-500/15 transition-all";

/**
 * Murojaat formasi.
 *
 * Backendning `POST /murojaat` endpointiga yuboradi va javobda kelgan
 * ariza raqamini ko'rsatadi — foydalanuvchi shu raqam orqali holatni kuzatadi.
 */
export default function AppealForm({
  defaultType = "rector",
}: {
  defaultType?: AppealType;
}) {
  const { language } = useApp();
  const dict = appealDict[language];

  const { data: metaRes } = useApi<{ data: AppealMeta }>(endpoints.appealMeta);
  const types = metaRes?.data?.types ?? [];

  const [type, setType] = useState<AppealType>(defaultType);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [result, setResult] = useState<Appeal | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setStatus("sending");
    setErrorText("");

    const form = new FormData();
    form.append("type", type);
    form.append("name", name.trim());
    form.append("message", message.trim());
    if (phone.trim()) form.append("phone_number", phone.trim());
    if (email.trim()) form.append("email", email.trim());
    if (address.trim()) form.append("address", address.trim());
    if (file) form.append("file", file);

    try {
      const res = await apiPost<{ data: Appeal }>(endpoints.appeals, form, {
        lang: language,
      });
      setResult(res.data);
      setStatus("success");
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : dict.error);
      setStatus("error");
    }
  }

  function reset() {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setMessage("");
    setFile(null);
    setResult(null);
    setCopied(false);
    setStatus("idle");
  }

  async function copyTicket() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.ticket);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard mavjud emas — foydalanuvchi qo'lda ko'chiradi */
    }
  }

  if (status === "success" && result) {
    return (
      <div className="text-center py-6">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-950/40">
          <CheckCircle2 className="w-8 h-8 text-accent-500" />
        </span>
        <h3 className="mt-7 display-3 text-ink-900 dark:text-white">
          {dict.successTitle}
        </h3>
        <p className="mt-4 text-base text-ink-600 dark:text-slate-400 max-w-md mx-auto">
          {dict.successLead}
        </p>

        <div className="mt-8 inline-flex flex-col items-center gap-3 panel rounded-lg px-8 py-6">
          <span className="text-sm text-ink-400">{dict.ticketLabel}</span>
          <span className="font-display text-3xl font-semibold text-brand-900 dark:text-brand-300 tabular-nums tracking-tight">
            {result.ticket}
          </span>
          <button
            type="button"
            onClick={copyTicket}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                {dict.copied}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {dict.copyTicket}
              </>
            )}
          </button>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={reset}
            className="text-base font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 transition-colors"
          >
            {dict.newAppeal}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Murojaat turi */}
      {types.length > 0 && (
        <div>
          <label className="block text-sm text-ink-400 mb-3">{dict.type}</label>
          <div className="flex flex-wrap gap-2">
            {types.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setType(item.key)}
                className={`px-5 py-2.5 rounded-lg text-base transition-colors ${
                  type === item.key
                    ? "bg-brand-900 text-white"
                    : "panel text-ink-600 dark:text-slate-300 hover:bg-mist-200 dark:hover:bg-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={dict.name}
          className={INPUT_CLS}
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={dict.phone}
          className={INPUT_CLS}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.email}
          className={INPUT_CLS}
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={dict.address}
          className={INPUT_CLS}
        />
      </div>

      <textarea
        required
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={dict.message}
        className={`${INPUT_CLS} resize-none`}
      />

      {/* Fayl biriktirish */}
      <div>
        <label className="group flex items-center gap-3 px-5 py-4 rounded-lg panel cursor-pointer hover:bg-mist-200 dark:hover:bg-slate-700 transition-colors">
          <Paperclip className="w-5 h-5 text-brand-900 dark:text-brand-300 shrink-0" />
          <span className="text-base text-ink-600 dark:text-slate-300 truncate">
            {file ? file.name : dict.file}
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="sr-only"
          />
        </label>
        <p className="mt-2 text-sm text-ink-400">{dict.fileHint}</p>
      </div>

      {status === "error" && (
        <p className="text-base text-red-500">{errorText || dict.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-3 bg-brand-900 hover:bg-brand-800 disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-lg transition-colors self-start"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {dict.sending}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {dict.submit}
          </>
        )}
      </button>
    </form>
  );
}
