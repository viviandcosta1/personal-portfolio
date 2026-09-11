'use client';

import React, { useState } from 'react';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { MindsetSection } from '@/components/sections/MindsetSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { ResumeSection } from '@/components/sections/ResumeSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { ResumeDetailModal } from '@/components/modals/ResumeDetailModal';

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#2B211B] flex flex-col selection:bg-[#B89452] selection:text-[#FFFDF9]">
      {/* Subtle Desktop Custom Cursor */}
      <CustomCursor />

      {/* Top Floating Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <MindsetSection />
        <AchievementsSection />
        <ResumeSection onOpenResume={() => setResumeOpen(true)} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Full Resume Detail & Print PDF Modal */}
      <ResumeDetailModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
