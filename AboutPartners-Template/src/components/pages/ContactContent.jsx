'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Morada',  value: 'Rua Exemplo, 123\n1000-001 Lisboa, Portugal' },
  { icon: Phone,  label: 'Telefone',value: '210 000 000' },
  { icon: Mail,   label: 'E-mail',  value: 'geral@autopeças.pt' },
  { icon: Clock,  label: 'Horário', value: 'Segunda a Sexta: 09h – 18h\nSábado: 09h – 13h' },
];
const subjects = ['Encomenda / Estado de entrega','Devolução / Garantia','Dúvida técnica sobre peça','Faturação','Outro'];

export default function ContactContent() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputClass = 'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition';

  return (
    <div>
      <section className="bg-[var(--color-header)] py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-3">Contacte-<span className="text-[var(--color-accent)]">nos</span></h1>
          <p className="text-slate-400">A nossa equipa responde em menos de 24 horas úteis.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-6">
          <h2 className="font-bold text-slate-800 text-lg">Informações de contacto</h2>
          {contactInfo.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[var(--color-accent-light)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
                <p className="text-sm text-slate-700 whitespace-pre-line mt-0.5">{value}</p>
              </div>
            </div>
          ))}
          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mt-4">
            <div className="text-center text-slate-400">
              <MapPin className="w-10 h-10 mx-auto mb-1 opacity-40" />
              <p className="text-xs">Mapa (Google Maps)</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <CheckCircle className="w-14 h-14 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Mensagem enviada!</h3>
              <p className="text-slate-500 text-sm mb-6">Obrigado pelo contacto. Responderemos em breve.</p>
              <button onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', subject:'', message:'' }); }}
                className="bg-[var(--color-accent)] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[var(--color-accent-dark)] transition text-sm">
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <h2 className="font-bold text-slate-800 text-lg mb-6">Enviar mensagem</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Nome *</label>
                  <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="O seu nome" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">E-mail *</label>
                  <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@exemplo.pt" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Telefone</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="9XX XXX XXX" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Assunto *</label>
                  <select required value={form.subject} onChange={e => set('subject', e.target.value)} className={inputClass + ' appearance-none'}>
                    <option value="">Selecionar assunto</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Mensagem *</label>
                <textarea required rows={5} value={form.message} onChange={e => set('message', e.target.value)}
                  placeholder="Descreve a tua dúvida ou pedido…" className={inputClass + ' resize-none'} />
              </div>
              <p className="text-xs text-slate-400">* Campos obrigatórios.</p>
              <button type="submit" className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Enviar mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
