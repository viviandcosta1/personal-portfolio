'use client';

import React from 'react';
import { Award, ShieldCheck, GraduationCap, CheckCircle2, Shield, FileCheck } from 'lucide-react';

export function AchievementsSection() {
  const honors = [
    {
      title: 'DATABASE SPECIALIST',
      subtitle: 'Advanced Relational Modeling & Optimization',
      issuer: 'Recognized Certification Board',
      category: 'Data Architecture',
      credentialId: 'DBS-CERT-2025-V07',
      description:
        'Relational database design, query indexing, ACID transactional integrity, and normalized schema optimization.',
      icon: ShieldCheck,
    },
    {
      title: 'AWS CLOUD CERTIFICATION',
      subtitle: 'Cloud Infrastructure & Compute',
      issuer: 'Amazon Web Services',
      category: 'Cloud Engineering',
      credentialId: 'AWS-CLOUD-2025-V07',
      description:
        'EC2 compute instances, S3 object storage, Lambda serverless functions, and CloudWatch telemetry architecture.',
      icon: Award,
    },
    {
      title: 'GRADUATED WITH DISTINCTION',
      subtitle: 'B.E. Computer Science (8.4 CGPA)',
      issuer: 'Srinivas University Institute of Technology',
      category: 'Academic Honor',
      credentialId: 'SUIT-BE-CSE-DIST-07',
      description:
        'Bachelor of Engineering in Computer Science with consistent academic distinction, technical leadership, and project awards.',
      icon: GraduationCap,
    },
  ];

  return (
    <section className="py-28 px-6 sm:px-8 border-b border-[#DED3C5] bg-[#F7F3EC] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B89452] mb-3 block">
              // 06 · VERIFIED CREDENTIALS &amp; CERTIFICATIONS
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2B211B] uppercase tracking-tight leading-none">
              HONORS &amp;<br />
              <span className="text-[#B89452] italic font-light">CREDENTIALS.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end items-center">
            <span className="font-display font-black text-7xl sm:text-8xl lg:text-9xl text-[#DED3C5]/60 select-none">
              06
            </span>
          </div>
        </div>

        {/* Certificate Credentials Ledger (Replacing plain boxes with Stamped Verified Credentials) */}
        <div className="bg-[#FFFDF9] border border-[#DED3C5] rounded-3xl p-6 sm:p-10 shadow-sm divide-y divide-[#EBE3D8]">
          {honors.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="py-8 first:pt-2 last:pb-2 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#F7F3EC]/60 px-4 -mx-4 rounded-2xl transition-colors group"
              >
                {/* Left Credential Title & Icon */}
                <div className="flex items-start gap-4 lg:max-w-md">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F3EC] border border-[#DED3C5] flex items-center justify-center text-[#B89452] group-hover:bg-[#38291F] group-hover:text-[#FFFDF9] transition-colors shrink-0">
                    <Icon className="w-6 h-6 text-[#B89452]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#B89452]">
                        {item.category}
                      </span>
                      <span className="text-[#DED3C5]">·</span>
                      <span className="text-[10px] font-mono text-[#8C7D70]">
                        ID: {item.credentialId}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-xl text-[#2B211B] uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#6B4F3A] mt-0.5">
                      {item.issuer}
                    </p>
                  </div>
                </div>

                {/* Middle Description */}
                <p className="text-xs sm:text-sm text-[#75685C] lg:max-w-md leading-relaxed">
                  {item.description}
                </p>

                {/* Right Verified Seal Tag */}
                <div className="flex items-center gap-2 bg-[#F7F3EC] group-hover:bg-[#FFFDF9] border border-[#DED3C5] px-3.5 py-1.5 rounded-full w-fit shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span className="text-[10px] font-mono font-bold uppercase text-[#38291F]">
                    VERIFIED CREDENTIAL
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
