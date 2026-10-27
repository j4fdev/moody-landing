"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TabFeatures from "@/components/TabFeatures";
import TabWaitlist from "@/components/TabWaitlist";
import Footer from "@/components/Footer";
import CrisisModal from "@/components/CrisisModal";
import LegalModal from "@/components/LegalModal";
import WaitlistModal from "@/components/WaitlistModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"features" | "waitlist">("features");
  const [crisisOpen, setCrisisOpen] = useState(false);
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<"terms" | "privacy" | null>(null);

  // Sync tab with URL hash if present (#waitlist or #features)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#waitlist") {
        setActiveTab("waitlist");
      } else if (hash === "#features") {
        setActiveTab("features");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleTabChange = (tab: "features" | "waitlist") => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors">
      <div>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onOpenCrisis={() => setCrisisOpen(true)}
          onOpenWaitlistModal={() => setWaitlistModalOpen(true)}
        />

        {/* Hero Section */}
        <Hero
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onOpenWaitlistModal={() => setWaitlistModalOpen(true)}
        />

        {/* Main Interactive Tab Content */}
        <main className="transition-all">
          {activeTab === "features" ? (
            <TabFeatures onOpenWaitlistModal={() => setWaitlistModalOpen(true)} />
          ) : (
            <TabWaitlist onOpenLegal={(type) => setLegalModalType(type)} />
          )}
        </main>
      </div>

      {/* Global Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenCrisis={() => setCrisisOpen(true)}
      />

      {/* Modals */}
      <CrisisModal isOpen={crisisOpen} onClose={() => setCrisisOpen(false)} />
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
      <WaitlistModal
        isOpen={waitlistModalOpen}
        onClose={() => setWaitlistModalOpen(false)}
        onOpenLegal={(type) => setLegalModalType(type)}
      />
    </div>
  );
}
