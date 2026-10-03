import React, { useState, useEffect } from 'react';
import { inquiryService } from '../../services/inquiryService';
import { AdminLoading } from '../../components/common/Skeletons';
import { Mail, Phone, Calendar, Trash2, Car, } from 'lucide-react';
export const AdminInquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const loadInquiries = () => {
        setLoading(true);
        inquiryService
            .getInquiries()
            .then((data) => {
            setInquiries(data);
            setLoading(false);
        })
            .catch((err) => {
            console.error('Failed to load inquiries:', err);
            setLoading(false);
        });
    };
    useEffect(() => {
        loadInquiries();
    }, []);
    const handleStatusChange = async (id, newStatus) => {
        try {
            await inquiryService.updateInquiryStatus(id, newStatus);
            setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq)));
        }
        catch (err) {
            console.error('Failed to update inquiry status:', err);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm('Delete this inquiry record?')) {
            try {
                await inquiryService.deleteInquiry(id);
                setInquiries((prev) => prev.filter((i) => i.id !== id));
            }
            catch (err) {
                console.error('Failed to delete inquiry:', err);
            }
        }
    };
    const filteredInquiries = inquiries.filter((inq) => {
        if (!statusFilter)
            return true;
        return inq.status === statusFilter;
    });
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Client Inquiries & Leads
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Review incoming requests for private viewings, test drives, part-exchanges, and financing.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 p-1 bg-[#12151a] rounded-lg border border-zinc-800 text-xs">
          {[
            { label: 'All', value: '' },
            { label: 'New', value: 'new' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Booked', value: 'appointment_booked' },
            { label: 'Closed', value: 'closed' },
        ].map((item) => (<button key={item.value} type="button" onClick={() => setStatusFilter(item.value)} className={`px-3 py-1.5 rounded-md font-semibold transition-all ${statusFilter === item.value
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'}`}>
              {item.label}
            </button>))}
        </div>
      </div>

      {loading ? (<AdminLoading />) : filteredInquiries.length > 0 ? (<div className="space-y-4">
          {filteredInquiries.map((inq) => (<div key={inq.id} className="bg-[#12151a] border border-zinc-800 rounded-xl p-5 sm:p-6 shadow-lg space-y-4">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white text-sm sm:text-base">
                    {inq.fullName}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {inq.type.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 font-mono">
                    {new Date(inq.createdAt).toLocaleString()}
                  </span>

                  {/* Status Dropdown */}
                  <select value={inq.status} onChange={(e) => handleStatusChange(inq.id, e.target.value)} className={`text-xs font-semibold rounded px-2.5 py-1 border focus:outline-none cursor-pointer ${inq.status === 'new'
                    ? 'bg-blue-950/40 text-blue-400 border-blue-800/50'
                    : inq.status === 'contacted'
                        ? 'bg-amber-950/40 text-amber-400 border-amber-800/50'
                        : inq.status === 'appointment_booked'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="appointment_booked">Appointment Booked</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button type="button" onClick={() => handleDelete(inq.id)} className="p-1.5 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800 transition-colors" title="Delete Record">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>
              </div>

              {/* Vehicle reference if any */}
              {inq.vehicleTitle && (<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-red-400">
                  <Car className="w-3.5 h-3.5"/>
                  <span>Referenced Vehicle: {inq.vehicleTitle}</span>
                </div>)}

              {/* Message */}
              <div className="p-4 bg-zinc-900/60 rounded-lg text-xs sm:text-sm text-zinc-200 leading-relaxed font-light whitespace-pre-line">
                "{inq.message}"
              </div>

              {/* Part Exchange Details if present */}
              {inq.tradeInDetails && (<div className="p-3 bg-zinc-900/90 border border-zinc-800/80 rounded-lg text-xs space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-red-400">
                    Trade-In Proposed
                  </div>
                  <div className="text-zinc-200 font-semibold">
                    {inq.tradeInDetails.year} {inq.tradeInDetails.make} {inq.tradeInDetails.model}
                  </div>
                  <div className="text-zinc-400">
                    Reported Mileage: {inq.tradeInDetails.mileage.toLocaleString()} mi
                  </div>
                </div>)}

              {/* Contact Affordances Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5 text-red-500"/>
                    <span>{inq.email}</span>
                  </a>

                  <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5 text-red-500"/>
                    <span className="tabular-nums">{inq.phone}</span>
                  </a>

                  {inq.preferredDate && (<div className="flex items-center gap-1.5 text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400"/>
                      <span>Preferred Date: {inq.preferredDate}</span>
                    </div>)}
                </div>

                <div className="flex items-center gap-2">
                  <a href={`mailto:${inq.email}?subject=Shield Cars Ltd - Response to Inquiry regarding ${encodeURIComponent(inq.vehicleTitle || 'Vehicle')}`} className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors">
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>))}
        </div>) : (<div className="p-12 text-center bg-[#12151a] rounded-xl border border-zinc-800 text-zinc-400">
          No inquiries found for current filter.
        </div>)}
    </div>);
};
