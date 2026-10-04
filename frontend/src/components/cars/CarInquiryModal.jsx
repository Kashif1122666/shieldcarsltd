import React, { useState } from 'react';
import { inquiryService } from '../../services/inquiryService';
import { ButtonLoader } from '../common/Skeletons';
import { X, CheckCircle2, Shield, Calendar, Phone, Mail, User } from 'lucide-react';
import { DEALERSHIP_INFO } from '../../data/dealershipInfo';
export const CarInquiryModal = ({ car, isOpen, onClose, defaultType = 'vehicle', }) => {
    const [inquiryType, setInquiryType] = useState(defaultType);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [message, setMessage] = useState(`Hello, I would like to arrange a private viewing of the ${car.year} ${car.make} ${car.model} (${car.stockNumber}). Please let me know availability.`);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    if (!isOpen)
        return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !phone) {
            setErrorMsg('Please complete all contact details.');
            return;
        }
        const phoneDigits = phone.replace(/\D/g, '');
        if (!/^\+?[0-9\s\-().]+$/.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
            setErrorMsg('Please enter a valid telephone number (7–15 digits).');
            return;
        }
        setIsSubmitting(true);
        setErrorMsg('');
        try {
            await inquiryService.submitInquiry({
                type: inquiryType,
                fullName,
                email,
                phone,
                message,
                vehicleId: car.id,
                vehicleTitle: `${car.year} ${car.make} ${car.model}`,
                preferredDate: preferredDate || undefined,
            });
            setIsSuccess(true);
        }
        catch (err) {
            setErrorMsg(err.message || 'Unable to submit inquiry. Please call concierge directly.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}/>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#111317] border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10">
        {/* Close Button */}
        <button type="button" onClick={onClose} className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors" aria-label="Close">
          <X className="w-5 h-5"/>
        </button>

        {isSuccess ? (<div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8"/>
            </div>
            <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Thank you, {fullName}. Our senior client advisor has received your request regarding the{' '}
              <span className="text-zinc-200 font-semibold">{car.year} {car.make} {car.model}</span> and will contact you within 2 business hours.
            </p>
            <div className="pt-4">
              <button type="button" onClick={onClose} className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors">
                Return to Vehicle
              </button>
            </div>
          </div>) : (<form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
              <Shield className="w-4 h-4"/>
              <span>Shield VIP Concierge</span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Inquire About {car.make} {car.model}
            </h3>

            <p className="text-xs text-zinc-400">
              Stock #{car.stockNumber} · Listed at{' '}
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                maximumFractionDigits: 0,
            }).format(car.price)}
            </p>

            {errorMsg && (<div className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300">
                {errorMsg}
              </div>)}

            {/* Inquiry Type Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-900 rounded-lg text-xs font-medium">
              <button type="button" onClick={() => setInquiryType('vehicle')} className={`py-1.5 rounded transition-colors ${inquiryType === 'vehicle'
                ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'}`}>
                General Inquiry
              </button>
              <button type="button" onClick={() => setInquiryType('test_drive')} className={`py-1.5 rounded transition-colors ${inquiryType === 'test_drive'
                ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'}`}>
                Test Drive
              </button>
              <button type="button" onClick={() => setInquiryType('trade_in')} className={`py-1.5 rounded transition-colors ${inquiryType === 'trade_in'
                ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'}`}>
                Part Exchange
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-zinc-400"/>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Lord Charles Harrington" className="w-full bg-[#16181f] border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-400 focus:border-red-600 focus:outline-none"/>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-400"/>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@domain.com" className="w-full bg-[#16181f] border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-400 focus:border-red-600 focus:outline-none"/>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Telephone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-zinc-400"/>
                    <input type="tel" required value={phone} minLength={7} pattern="^\+?[0-9\s\-().]{7,20}$" title="Enter a valid phone number, e.g. +44 7911 123456" onChange={(e) => setPhone(e.target.value)} placeholder="+44 7..." className="w-full bg-[#16181f] border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-400 focus:border-red-600 focus:outline-none"/>
                  </div>
                </div>
              </div>

              {inquiryType === 'test_drive' && (<div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-zinc-400"/>
                    <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="w-full bg-[#16181f] border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"/>
                  </div>
                </div>)}

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Message / Special Requirements
                </label>
                <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-[#16181f] border border-zinc-800 rounded-lg p-3 text-sm text-white placeholder-zinc-400 focus:border-red-600 focus:outline-none resize-none"/>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <span className="text-[11px] text-zinc-400">
                Direct hotline:{' '}
                <a href={`tel:${DEALERSHIP_INFO.phone.raw}`} className="text-zinc-300 hover:text-white underline">
                  {DEALERSHIP_INFO.phone.display}
                </a>
              </span>

              <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors shadow-lg shadow-red-950/40">
                {isSubmitting ? <ButtonLoader text="Submitting..."/> : 'Send Request'}
              </button>
            </div>
          </form>)}
      </div>
    </div>);
};
