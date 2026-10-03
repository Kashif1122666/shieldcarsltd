import React, { useState } from 'react';
import { DEALERSHIP_INFO } from '../../data/dealershipInfo';
import { inquiryService } from '../../services/inquiryService';
import { ButtonLoader } from '../../components/common/Skeletons';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Shield, } from 'lucide-react';
export const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        type: 'general',
        preferredDate: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email || !formData.phone) {
            setErrorMsg('Please fill in your name, email, and telephone number.');
            return;
        }
        setIsSubmitting(true);
        setErrorMsg('');
        try {
            await inquiryService.submitInquiry({
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                type: formData.type,
                preferredDate: formData.preferredDate || undefined,
                message: formData.message || 'General contact request',
            });
            setIsSubmitted(true);
        }
        catch (err) {
            setErrorMsg(err.message || 'Failed to submit. Please contact us via phone or WhatsApp.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (<div className="min-h-screen bg-[#090a0d] py-16 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-widest text-red-500 font-bold">
            Private Client Relations
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Connect With Shield Cars
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            Our client advisors are prepared to coordinate private consultations, arrange test drives, evaluate trade-ins, or manage international vehicle acquisitions.
          </p>
        </div>

        {/* Contact Grid: Form Left, Info & Location Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#111317] border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (<div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8"/>
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Transmitted</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Shield Cars Ltd. A member of our executive client team will contact you promptly.
                </p>
                <div className="pt-4">
                  <button type="button" onClick={() => {
                setIsSubmitted(false);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    type: 'general',
                    preferredDate: '',
                    message: '',
                });
            }} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors">
                    Submit Another Request
                  </button>
                </div>
              </div>) : (<form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Send Us A Message</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Fill out the form below and we will respond within two business hours.
                  </p>
                </div>

                {errorMsg && (<div className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300">
                    {errorMsg}
                  </div>)}

                {/* Inquiry Type Radios/Buttons */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Nature of Inquiry
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                { id: 'general', label: 'General' },
                { id: 'test_drive', label: 'Test Drive' },
                { id: 'trade_in', label: 'Trade-In' },
                { id: 'financing', label: 'Financing' },
            ].map((t) => (<button key={t.id} type="button" onClick={() => setFormData({ ...formData, type: t.id })} className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${formData.type === t.id
                    ? 'bg-red-600/10 border-red-500 text-white shadow-sm'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'}`}>
                        {t.label}
                      </button>))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Full Name *
                    </label>
                    <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="e.g. David Sterling" className="w-full bg-[#16181f] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-400 focus:border-red-600 focus:outline-none"/>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Telephone Number *
                    </label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+44 7911 123456" className="w-full bg-[#16181f] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-400 focus:border-red-600 focus:outline-none"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Email Address *
                    </label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="client@domain.com" className="w-full bg-[#16181f] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-400 focus:border-red-600 focus:outline-none"/>
                  </div>

                  {formData.type === 'test_drive' && (<div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Preferred Date
                      </label>
                      <input type="date" value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} className="w-full bg-[#16181f] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:border-red-600 focus:outline-none"/>
                    </div>)}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Your Message / Desired Motorcar
                  </label>
                  <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Provide details about the vehicle you are interested in, your current trade-in, or custom delivery specifications..." className="w-full bg-[#16181f] border border-zinc-800 rounded-lg p-3 text-sm text-white placeholder-zinc-400 focus:border-red-600 focus:outline-none resize-none"/>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-red-950/50">
                    {isSubmitting ? (<ButtonLoader text="Transmitting..."/>) : (<>
                        <Send className="w-3.5 h-3.5"/>
                        <span>Send Message</span>
                      </>)}
                  </button>
                </div>
              </form>)}
          </div>

          {/* Coordinates & Hours (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Showroom Coordinates Card */}
            <div className="bg-[#111317] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
                <Shield className="w-4 h-4"/>
                <span>Showroom Headquarters</span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5"/>
                  <div>
                    <div className="font-bold text-white">Mayfair Suite</div>
                    <div className="text-zinc-400 mt-0.5">{DEALERSHIP_INFO.address.full}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5"/>
                  <div>
                    <div className="font-bold text-white">Direct Hotlines</div>
                    <div className="text-zinc-400 mt-0.5">
                      Sales:{' '}
                      <a href={`tel:${DEALERSHIP_INFO.phone.raw}`} className="text-white hover:underline tabular-nums">
                        {DEALERSHIP_INFO.phone.sales}
                      </a>
                    </div>
                    <div className="text-zinc-400">
                      Concierge:{' '}
                      <a href={`tel:${DEALERSHIP_INFO.phone.raw}`} className="text-white hover:underline tabular-nums">
                        {DEALERSHIP_INFO.phone.display}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-red-500 shrink-0 mt-0.5"/>
                  <div>
                    <div className="font-bold text-white">Email Addresses</div>
                    <div className="text-zinc-400 mt-0.5">
                      <a href={`mailto:${DEALERSHIP_INFO.email.sales}`} className="text-white hover:underline">
                        {DEALERSHIP_INFO.email.sales}
                      </a>
                    </div>
                    <div className="text-zinc-400">
                      <a href={`mailto:${DEALERSHIP_INFO.email.support}`} className="text-white hover:underline">
                        {DEALERSHIP_INFO.email.support}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-zinc-800">
                  <Clock className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5"/>
                  <div>
                    <div className="font-bold text-white mb-1">Hours of Consultation</div>
                    {DEALERSHIP_INFO.hours.map((h, i) => (<div key={i} className="text-xs text-zinc-400 flex justify-between gap-6 py-0.5">
                        <span className="text-zinc-300">{h.days}:</span>
                        <span className="font-mono text-zinc-400">{h.hours}</span>
                      </div>))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Location Visual Card */}
            <div className="bg-[#111317] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl p-6">
              <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-3">
                Showroom Location
              </div>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]"/>
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500 text-red-500 flex items-center justify-center mx-auto animate-bounce">
                    <MapPin className="w-5 h-5"/>
                  </div>
                  <div className="text-sm font-bold text-white">Mayfair Executive Suite</div>
                  <div className="text-xs text-zinc-400 font-mono">51.509865, -0.118092</div>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-xs font-semibold text-red-400 hover:text-red-300 underline">
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
