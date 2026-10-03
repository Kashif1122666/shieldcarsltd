import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
const FAQS = [
    {
        category: 'Acquisitions & Viewing',
        question: 'How do I arrange a private inspection of a motorcar?',
        answer: 'We welcome private viewing appointments in our Mayfair showroom suite. Simply call our concierge hotline or submit an inquiry on the vehicle page. We can also coordinate virtual high-definition video walkthroughs and mechanical rev presentations for remote collectors.',
    },
    {
        category: 'Acquisitions & Viewing',
        question: 'Can I test drive a vehicle before committing to purchase?',
        answer: 'Yes. Accompanied road evaluations are offered to qualified prospective clients upon verification of a valid driving license. For specialized supercars and track-focused models, accompanied evaluations are hosted on private tarmac circuits by prior arrangement.',
    },
    {
        category: 'Warranty & Verification',
        question: 'What does the 150-Point Shield Inspection cover?',
        answer: 'The inspection covers full diagnostic electronics scanning, dyno powertrain output confirmation, compression testing, suspension health, brake rotor wear tolerances, frame integrity, laser wheel alignment, and multi-stage paint depth verification.',
    },
    {
        category: 'Warranty & Verification',
        question: 'What warranty is included with my vehicle?',
        answer: 'All Shield Cars vehicles include a comprehensive 12-Month Shield Premier Mechanical & Electrical Warranty with 24/7 national roadside assistance and recovery. Coverage is extendable up to 36 months and is recognized at all franchised main dealers.',
    },
    {
        category: 'Financing & Part-Exchange',
        question: 'Do you accept part-exchange or trade-in vehicles?',
        answer: 'We actively acquire and accept prestige, sports, and luxury vehicles in part-exchange. You can submit your vehicle specifications online or bring it to our showroom for an instant, competitive appraisal.',
    },
    {
        category: 'Financing & Part-Exchange',
        question: 'What bespoke financing structures do you offer?',
        answer: 'In partnership with premier automotive finance institutions, we offer Hire Purchase (HP), Personal Contract Purchase (PCP), and Lease Purchase with balloon payments tailored to optimize cash flow and tax efficiency for corporate or private accounts.',
    },
    {
        category: 'Delivery & Transport',
        question: 'How is nationwide and international delivery managed?',
        answer: 'We operate dedicated, climate-controlled, enclosed single-vehicle transporters ensuring your motorcar arrives in immaculate showroom condition with zero road miles or weather exposure. We also manage air and sea freight documentation for international exports.',
    },
];
export const FaqPage = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Acquisitions & Viewing', 'Warranty & Verification', 'Financing & Part-Exchange', 'Delivery & Transport'];
    const filteredFaqs = activeCategory === 'All' ? FAQS : FAQS.filter((f) => f.category === activeCategory);
    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (<div className="min-h-screen bg-[#090a0d] py-16 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold uppercase tracking-widest text-red-500">
            <HelpCircle className="w-3.5 h-3.5"/>
            <span>Client Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our vehicle standards, private viewing protocols, financing structures, and transport.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (<button key={cat} type="button" onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeCategory === cat
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'}`}>
              {cat}
            </button>))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (<div key={idx} className="rounded-xl border border-zinc-800 bg-[#111317] overflow-hidden transition-colors">
                <button type="button" onClick={() => toggleFaq(idx)} className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-red-400 transition-colors" aria-expanded={isOpen}>
                  <span className="text-sm sm:text-base font-bold">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-red-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
                </button>
                {isOpen && (<div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 font-light">
                    {faq.answer}
                  </div>)}
              </div>);
        })}
        </div>

        {/* Support Callout */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 to-[#14161c] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Have a bespoke acquisition request?</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Our concierge team is available seven days a week to handle discrete inquiries.
            </p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shrink-0 shadow-lg shadow-red-950/40">
            <span>Contact Concierge</span>
            <ArrowRight className="w-3.5 h-3.5"/>
          </Link>
        </div>
      </div>
    </div>);
};
