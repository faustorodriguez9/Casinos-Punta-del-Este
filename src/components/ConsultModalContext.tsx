"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";

type Ctx = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ConsultModalContext = createContext<Ctx | null>(null);

export function ConsultModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  return (
    <ConsultModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </ConsultModalContext.Provider>
  );
}

export function useConsultModal() {
  const ctx = useContext(ConsultModalContext);
  if (!ctx) throw new Error("useConsultModal must be used within ConsultModalProvider");
  return ctx;
}
