'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export function Navbar({ onOpenResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'The Stack', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F3EC]/90 backdrop-blur-md border-b border-[#DED3C5] py-3.5 shadow-[0_4px_20px_rgba(56,41,31,0.04)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-[#2B211B] no-underline tracking-tight"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#B89452] ring-4 ring-[#B89452]/20 group-hover:scale-125 transition-transform duration-200"></span>
          <span className="font-display font-black text-lg sm:text-xl tracking-tight uppercase">
            Vivian Dcosta
          </span>
          <span className="text-[10px] font-mono text-[#6B4F3A] bg-[#EFE8DD] border border-[#DED3C5] px-1.5 py-0.5 rounded font-bold tracking-wider">
            #07
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold tracking-wider uppercase text-[#75685C]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#2B211B] transition-colors duration-150 relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#B89452] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full border border-[#6B4F3A] bg-[#FFFDF9] text-[#38291F] hover:bg-[#38291F] hover:text-[#FFFDF9] transition-all duration-200 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[#B89452]" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-xl text-[#2B211B] hover:bg-[#EFE8DD] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F3EC] border-b border-[#DED3C5] px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#2B211B] hover:text-[#B89452] transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8C7D70]" />
              </a>
            ))}
            <div className="pt-3 border-t border-[#DED3C5] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-3 rounded-xl bg-[#38291F] text-[#FFFDF9] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#B89452]" />
                <span>View Full Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
