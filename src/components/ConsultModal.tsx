"use client";

import { useEffect, useState } from "react";
import { useConsultModal } from "./ConsultModalContext";

type Status = "idle" | "loading" | "success" | "error";

const EMPTY = { nombre: "", email: "", empresa: "", mensaje: "" };

export default function ConsultModal() {
  const { open, closeModal } = useConsultModal();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  // Reset the form shortly after the modal closes.
  useEffect(() => {
    if (open) return;
    const t = window.setTimeout(() => {
      setStatus("idle");
      setForm(EMPTY);
    }, 300);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Solicitar una consultoría"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="modal">
        <button className="modal__close" onClick={closeModal} aria-label="Cerrar">
          ×
        </button>
        <h2 className="modal__title">Solicitar una consultoría</h2>
        <p className="modal__subtitle">
          Cuéntenos sobre su proyecto y le respondemos con una propuesta a medida.
        </p>

        {status === "success" ? (
          <p className="modal__status modal__status--success">
            ¡Gracias! Le responderemos en 48 h.
          </p>
        ) : (
          <form className="modal__form" onSubmit={onSubmit}>
            <div className="modal__field">
              <label htmlFor="c-nombre">Nombre</label>
              <input
                id="c-nombre"
                type="text"
                required
                value={form.nombre}
                onChange={update("nombre")}
                autoComplete="name"
              />
            </div>
            <div className="modal__field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
              />
            </div>
            <div className="modal__field">
              <label htmlFor="c-empresa">Empresa</label>
              <input
                id="c-empresa"
                type="text"
                value={form.empresa}
                onChange={update("empresa")}
                autoComplete="organization"
              />
            </div>
            <div className="modal__field">
              <label htmlFor="c-mensaje">Mensaje / Interés</label>
              <textarea
                id="c-mensaje"
                required
                value={form.mensaje}
                onChange={update("mensaje")}
              />
            </div>
            {status === "error" && (
              <p className="modal__status modal__status--error">
                Ocurrió un error. Intente nuevamente o escríbanos a hola@casinospuntadeleste.com.
              </p>
            )}
            <button type="submit" className="modal__submit" disabled={status === "loading"}>
              {status === "loading" ? "Enviando…" : "Enviar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
