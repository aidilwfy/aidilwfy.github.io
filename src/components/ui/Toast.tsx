"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "info" | "success" | "warning";
interface Toast {
  id: number;
  title: string;
  description?: ReactNode;
  tone: Tone;
}
type Notify = (t: Omit<Toast, "id" | "tone"> & { tone?: Tone }) => void;

const ToastContext = createContext<Notify | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const toneIcon = { info: Info, success: CircleCheck, warning: CircleAlert };
const toneColor = { info: "text-accent-2", success: "text-success", warning: "text-gold" };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const notify = useCallback<Notify>(
    ({ tone = "info", ...rest }) => {
      const id = ++idRef.current;
      setToasts((t) => [...t.slice(-2), { id, tone, ...rest }]);
      window.setTimeout(() => dismiss(id), 7000);
    },
    [dismiss],
  );

  const value = useMemo(() => notify, [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = toneIcon[t.tone];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="glass-strong pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-xl p-4"
              >
                <Icon className={cn("mt-0.5 size-5 shrink-0", toneColor[t.tone])} aria-hidden />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-medium text-fg">{t.title}</p>
                  {t.description && <div className="mt-1 text-muted">{t.description}</div>}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  className="rounded-md p-1 text-subtle hover:text-fg cursor-pointer"
                  aria-label="Dismiss notification"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
