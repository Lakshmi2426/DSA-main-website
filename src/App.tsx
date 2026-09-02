import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
import { AlgorithmBackground } from './components/common/AlgorithmBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { QuickStatsSection } from './components/home/QuickStatsSection';
import { FeaturedTopicsSection } from './components/home/FeaturedTopicsSection';
import { LearningJourneySection } from './components/home/LearningJourneySection';
import { AIAssistantPreviewSection } from './components/home/AIAssistantPreviewSection';
import { LeaderboardPreviewSection } from './components/home/LeaderboardPreviewSection';
import { TopicsCatalog } from './components/topics/TopicsCatalog';
import { AIAssistantWorkspace } from './components/ai/AIAssistantWorkspace';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { StudentProfileView } from './components/profile/StudentProfileView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { AboutView } from './components/about/AboutView';
import { AuthModal } from './components/auth/AuthModal';
import { AlgoAIIcon } from './components/common/AlgoAIIcon';
import { NavigationTab } from './types';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState<string>('');
  const {
    showAuthModal,
    setShowAuthModal,
    authModalMode,
    setAuthModalMode,
  } = useUser();

  const handleQuickAskAI = (prompt: string) => {
    setAiAssistantPrompt(prompt);
    setActiveTab('ai-assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup' | 'admin' = 'login') => {
    setAuthModalMode(mode);
    setShowAuthModal(true);
  };

  // Scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="relative min-h-screen bg-[#f6f9fe] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Background Interactive Particle Canvas */}
      <AlgorithmBackground />

      {/* Main Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={handleOpenAuth}
      />

      {/* Content Router based on activeTab */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* 1. Hero Section with 3D Poster Carousel */}
              <HeroSection setActiveTab={setActiveTab} />

              {/* 2. Quick Stats Counters */}
              <QuickStatsSection />

              {/* 3. Explore by Topic (4 Featured Topics Only) */}
              <FeaturedTopicsSection setActiveTab={setActiveTab} />

              {/* 4. Learning Journey Methodology */}
              <LearningJourneySection setActiveTab={setActiveTab} />

              {/* 5. AI Code Tutor Preview */}
              <AIAssistantPreviewSection
                setActiveTab={setActiveTab}
                onQuickAsk={handleQuickAskAI}
              />

              {/* 6. Global Arena / Leaderboard Podium Preview */}
              <LeaderboardPreviewSection setActiveTab={setActiveTab} />
            </motion.div>
          )}

          {activeTab === 'topics' && (
            <motion.div
              key="topics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <TopicsCatalog />
            </motion.div>
          )}

          {activeTab === 'ai-assistant' && (
            <motion.div
              key="ai-assistant"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AIAssistantWorkspace initialPrompt={aiAssistantPrompt} />
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <LeaderboardView />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <StudentProfileView />
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AdminDashboardView setActiveTab={setActiveTab} />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AboutView setActiveTab={setActiveTab} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button (Algo AI Assistant) - Rendered on all pages EXCEPT AI Assistant */}
      {activeTab !== 'ai-assistant' && (
        <button
          onClick={() => {
            setActiveTab('ai-assistant');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Open Algo AI Assistant"
          title="Ask Algo AI Assistant"
          className="fixed bottom-6 right-6 z-40 w-13 h-13 sm:w-15 sm:h-15 p-1 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-300/90 hover:border-blue-500 dark:border-blue-600/80 dark:hover:border-blue-400 shadow-[0_8px_24px_-4px_rgba(37,99,235,0.28),0_0_16px_rgba(99,102,241,0.18)] hover:shadow-[0_12px_32px_-2px_rgba(37,99,235,0.42),0_0_24px_rgba(99,102,241,0.32)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(59,130,246,0.3)] hover:scale-108 active:scale-95 transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer select-none"
          id="floating-quick-ai-btn"
        >
          <AlgoAIIcon size="lg" className="w-full h-full" alt="Algo AI Assistant" />
        </button>
      )}

      {/* Global Footer - Rendered on all pages except AI Assistant */}
      {activeTab !== 'ai-assistant' && <Footer setActiveTab={setActiveTab} />}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authModalMode}
        onNavigateTab={setActiveTab}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MainAppContent />
      </UserProvider>
    </ThemeProvider>
  );
}
