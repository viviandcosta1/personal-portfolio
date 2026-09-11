'use client';

import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';
import { VIVIAN_DATA } from '@/data/portfolioData';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = VIVIAN_DATA.personal.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-8 border-b border-[#DED3C5] bg-[#F7F3EC] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF9] border border-[#DED3C5] shadow-sm mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38291F]">
            AVAILABLE FOR THE NEXT CHALLENGE
          </span>
        </div>

        {/* Big Editorial Heading */}
        <div className="mb-14">
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#2B211B] uppercase tracking-tight leading-[0.92]">
            LET&apos;S BUILD<br />
            SOMETHING<br />
            <span className="text-[#B89452] italic font-light">USEFUL.</span>
          </h2>
        </div>

        {/* Huge Email Box */}
        <div className="mb-16 p-8 sm:p-14 rounded-3xl bg-[#FFFDF9] border border-[#DED3C5] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase text-[#8C7D70] block mb-2 font-bold tracking-wider">
              DIRECT EMAIL INBOX
            </span>
            <a
              href={`mailto:${email}`}
              className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#2B211B] hover:text-[#B89452] transition-colors break-all tracking-tight"
            >
              {email}
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyEmail}
              className="luxury-btn-secondary px-5 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#B89452]" />
                  <span>COPY ADDRESS</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              className="luxury-btn-primary px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-[#B89452]" />
              <span>SEND EMAIL</span>
            </a>
          </div>
        </div>

        {/* Two-Column Details & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#6B4F3A] font-bold">
              CONNECTED NETWORKS
            </h3>

            <div className="space-y-3">
              <a
                href={VIVIAN_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-card p-4 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F3EC] text-[#6B4F3A] flex items-center justify-center">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2B211B] uppercase">LinkedIn</h4>
                    <p className="text-xs text-[#75685C]">Professional Network &amp; Posts</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C7D70] group-hover:text-[#B89452] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href={VIVIAN_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-card p-4 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F3EC] text-[#6B4F3A] flex items-center justify-center">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2B211B] uppercase">GitHub</h4>
                    <p className="text-xs text-[#75685C]">Open Source Repositories &amp; Code</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C7D70] group-hover:text-[#B89452] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            <div className="pt-6 border-t border-[#DED3C5] text-xs font-mono text-[#75685C] space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B89452]" />
                <span>Belagavi, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B89452]" />
                <span>+91 6360209255</span>
              </div>
            </div>
          </div>

          {/* Quick Dispatch Message Form */}
          <div className="lg:col-span-7 bg-[#FFFDF9] border border-[#DED3C5] rounded-3xl p-6 sm:p-9 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#6B4F3A] mb-6 flex items-center gap-2 font-bold">
              <span className="w-1.5 h-1.5 bg-[#B89452] rounded-full"></span>
              <span>DIRECT TRANSMISSION</span>
            </h3>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#EFE8DD] border border-[#B89452] text-center animate-in fade-in">
                <Check className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
                <h4 className="font-display font-bold text-lg text-[#2B211B] uppercase">
                  Message Dispatched!
                </h4>
                <p className="text-xs text-[#75685C] mt-1">
                  Thank you. Vivian will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B4F3A] mb-1.5 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F7F3EC] border border-[#DED3C5] text-xs text-[#2B211B] focus:outline-none focus:border-[#B89452] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B4F3A] mb-1.5 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F7F3EC] border border-[#DED3C5] text-xs text-[#2B211B] focus:outline-none focus:border-[#B89452] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B4F3A] mb-1.5 font-semibold">
                    Project / Opportunity Brief
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your vision, system requirements, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F7F3EC] border border-[#DED3C5] text-xs text-[#2B211B] focus:outline-none focus:border-[#B89452] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="luxury-btn-primary w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-[#B89452]" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
