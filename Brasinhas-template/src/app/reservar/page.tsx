'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CalendarDays, Clock, Users, User, Phone, Mail, MessageSquare, CheckCircle, Flame, ChevronDown } from "lucide-react";

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30",
];

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

interface FormState {
  nome: string;
  telefone: string;
  email: string;
  data: string;
  hora: string;
  pessoas: string;
  pedido: string;
}

const initialForm: FormState = {
  nome: "",
  telefone: "",
  email: "",
  data: "",
  hora: "",
  pessoas: "",
  pedido: "",
};

function InputField({
  label,
  icon: Icon,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  icon: React.ElementType;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
        {label}
      </label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-brand-500 transition-colors pointer-events-none" />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-4 text-white placeholder-white/20 text-sm font-sans focus:outline-none focus:border-brand-500/60 focus:bg-white/[0.05] transition-all"
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  icon: Icon,
  id,
  value,
  onChange,
  children,
  required,
}: {
  label: string;
  icon: React.ElementType;
  id: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
        {label}
      </label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-brand-500 transition-colors pointer-events-none z-10" />
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full appearance-none bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-sans focus:outline-none focus:border-brand-500/60 focus:bg-white/[0.05] transition-all [&>option]:bg-stone-950 cursor-pointer"
        >
          {children}
        </select>
      </div>
    </div>
  );
}

export default function ReservarPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [horaOpen, setHoraOpen] = useState(false);
  const horaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (horaRef.current && !horaRef.current.contains(e.target as Node)) {
        setHoraOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const set = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-36 pb-24">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center gap-8 max-w-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-24 h-24 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-brand-500" />
              </motion.div>
              <div className="space-y-3">
                <h2 className="font-serif text-4xl text-white drop-shadow-xl">Reserva Confirmada</h2>
                <p className="text-white/60 font-light leading-relaxed">
                  Obrigado, <span className="text-white font-medium">{form.nome}</span>. Entraremos em contacto pelo número{" "}
                  <span className="text-brand-500">{form.telefone}</span> para confirmar a sua reserva.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] w-full text-left space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Data</span>
                  <span className="text-white font-medium">{form.data}</span>
                </div>
                <div className="w-full h-px bg-white/[0.06]" />
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Hora</span>
                  <span className="text-white font-medium">{form.hora}</span>
                </div>
                <div className="w-full h-px bg-white/[0.06]" />
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Pessoas</span>
                  <span className="text-white font-medium">{form.pessoas}</span>
                </div>
              </div>
              <motion.button
                onClick={() => { setForm(initialForm); setSubmitted(false); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-widest py-3 px-8 rounded-full transition-colors"
              >
                Nova Reserva
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-xl"
            >
              {/* Header */}
              <div className="text-center mb-12 space-y-4">
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-brand-500 font-bold">
                  <Flame className="w-3 h-3" /> Reservas
                </span>
                <h1 className="font-serif text-[clamp(2.5rem,6vw,4rem)] text-white leading-[1.1] drop-shadow-2xl">
                  Reserve a Sua <span className="text-brand-500 italic">Mesa</span>
                </h1>
                <p className="text-white/50 font-light text-sm">
                  Garantimos a sua mesa para uma experiência inesquecível.
                </p>
              </div>

              {/* Form card */}
              <form
                onSubmit={handleSubmit}
                className="bg-stone-950/80 border border-white/[0.08] backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 space-y-6"
              >
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Nome"
                    icon={User}
                    id="nome"
                    placeholder="O seu nome"
                    value={form.nome}
                    onChange={set("nome")}
                    required
                  />
                  <InputField
                    label="Telefone"
                    icon={Phone}
                    id="telefone"
                    type="tel"
                    placeholder="9xx xxx xxx"
                    value={form.telefone}
                    onChange={set("telefone")}
                    required
                  />
                </div>

                {/* Email */}
                <InputField
                  label="E-mail"
                  icon={Mail}
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={form.email}
                  onChange={set("email")}
                />

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Data"
                    icon={CalendarDays}
                    id="data"
                    type="date"
                    value={form.data}
                    onChange={set("data")}
                    required
                  />
                  <div className="space-y-2" ref={horaRef}>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                      Hora
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setHoraOpen((v) => !v)}
                        className={`w-full bg-white/[0.03] border rounded-2xl pl-11 pr-10 py-4 text-left text-sm font-sans focus:outline-none transition-all cursor-pointer ${
                          horaOpen ? "border-brand-500/60 bg-white/[0.05]" : "border-white/[0.08]"
                        }`}
                      >
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                        <span className={form.hora ? "text-white" : "text-white/20"}>
                          {form.hora || "Selecionar hora"}
                        </span>
                        <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 transition-transform duration-200 ${horaOpen ? "rotate-180" : ""}`} />
                      </button>

                      {horaOpen && (
                        <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] bg-stone-900 border border-white/[0.08] rounded-2xl z-50 shadow-2xl overflow-hidden">
                          <div className="max-h-60 overflow-y-auto p-2">
                            <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold px-3 pt-2 pb-1">Almoço</p>
                            {timeSlots.filter((t) => parseInt(t) < 16).map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => { set("hora")(t); setHoraOpen(false); }}
                                className={`w-full text-left px-3 py-2.5 text-sm rounded-xl transition-colors ${
                                  form.hora === t
                                    ? "bg-brand-500/20 text-brand-400 font-medium"
                                    : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                            <div className="my-1 h-px bg-white/[0.06] mx-3" />
                            <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold px-3 pt-2 pb-1">Jantar</p>
                            {timeSlots.filter((t) => parseInt(t) >= 16).map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => { set("hora")(t); setHoraOpen(false); }}
                                className={`w-full text-left px-3 py-2.5 text-sm rounded-xl transition-colors ${
                                  form.hora === t
                                    ? "bg-brand-500/20 text-brand-400 font-medium"
                                    : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Party size */}
                <SelectField
                  label="Número de Pessoas"
                  icon={Users}
                  id="pessoas"
                  value={form.pessoas}
                  onChange={set("pessoas")}
                  required
                >
                  <option value="" disabled>Quantas pessoas?</option>
                  {partySizes.map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "pessoa" : "pessoas"}</option>
                  ))}
                  <option value="9+">9 ou mais pessoas</option>
                </SelectField>

                {/* Notes */}
                <div className="space-y-2">
                  <label htmlFor="pedido" className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                    Pedido Especial <span className="text-white/20 normal-case tracking-normal">(opcional)</span>
                  </label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-white/30 group-focus-within:text-brand-500 transition-colors pointer-events-none" />
                    <textarea
                      id="pedido"
                      rows={3}
                      placeholder="Alergias, aniversários, preferências de mesa…"
                      value={form.pedido}
                      onChange={(e) => set("pedido")(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-4 text-white placeholder-white/20 text-sm font-sans focus:outline-none focus:border-brand-500/60 focus:bg-white/[0.05] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/[0.06]" />

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-sans text-xs uppercase tracking-widest py-5 rounded-full shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.4)] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      A processar…
                    </>
                  ) : (
                    "Confirmar Reserva"
                  )}
                </motion.button>

                <p className="text-center text-white/20 text-[10px] uppercase tracking-widest">
                  Horário · Todos os dias · 12:00 – 22:30
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
