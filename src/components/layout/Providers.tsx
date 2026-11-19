"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";
import { ToastProvider } from "@/components/ui/Toast";

/** Whether the CV PDF exists in /public (checked on the server). */
const CvContext = createContext(false);
export const useCvAvailable = () => useContext(CvContext);

export function Providers({ children, cvAvailable }: { children: ReactNode; cvAvailable: boolean }) {
  return (
    <MotionConfig reducedMotion="user">
      <CvContext.Provider value={cvAvailable}>
        <ToastProvider>{children}</ToastProvider>
      </CvContext.Provider>
    </MotionConfig>
  );
}
