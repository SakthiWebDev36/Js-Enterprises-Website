import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Lifecycle from './components/Lifecycle';
import PracticeGallery from './components/PracticeGallery';
import IndustriesServed from './components/IndustriesServed';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// The 3 Figma Screens
import LoadingScreen from './screens/LoadingScreen';
import ErrorScreen from './screens/ErrorScreen';
import SuccessScreen from './screens/SuccessScreen';

// Developer & Reviewer Quick Screen Switcher
import { Layers, CheckCircle, AlertTriangle, RefreshCw, Eye } from 'lucide-react';

export default function App() {
  // Screen state: 'loading' | 'main' | 'error' | 'success'
  const [currentScreen, setCurrentScreen] = useState('loading');
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [showHUD, setShowHUD] = useState(true);

  // Genuine initial loading state: runs once on application start
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('main');
      setInitialLoadComplete(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  // Form handlers
  const handleFormSuccess = (ticket) => {
    setTicketData(ticket);
    setCurrentScreen('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormError = (err) => {
    setErrorData(err);
    setCurrentScreen('error');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryFromError = () => {
    // If retry is triggered from error screen, switch back to contact section
    setCurrentScreen('main');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Render Screens
  if (currentScreen === 'loading') {
    return (
      <LoadingScreen
        onFinish={() => setCurrentScreen('main')}
        onCancel={initialLoadComplete ? () => setCurrentScreen('main') : null}
      />
    );
  }

  if (currentScreen === 'error') {
    return (
      <ErrorScreen
        onReturnHome={() => setCurrentScreen('main')}
        onRetry={handleRetryFromError}
        errorDetails={errorData}
      />
    );
  }

  if (currentScreen === 'success') {
    return (
      <SuccessScreen
        ticketData={ticketData}
        onReturnHome={() => setCurrentScreen('main')}
      />
    );
  }

  // Default: Main Complete Website
  return (
    <div className="min-h-screen bg-[#080B11] text-gray-100 flex flex-col selection:bg-fire selection:text-white">
      {/* Navigation Header */}
      <Header
        currentScreen={currentScreen}
        setScreen={setCurrentScreen}
      />

      {/* Main Homepage Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Lifecycle />
        <PracticeGallery />
        <IndustriesServed />
        <ContactSection
          onFormSuccess={handleFormSuccess}
          onFormError={handleFormError}
        />
      </main>

      {/* Professional Footer */}
      <Footer setScreen={setCurrentScreen} />

      {/* Reviewer / Figma Screen Inspection Pill (Bottom Right) */}
      <aside 
        aria-label="Figma Screen Review Tool" 
        className="fixed bottom-4 right-4 z-50 pointer-events-auto"
      >
        <div className="bg-[#0E131F]/95 backdrop-blur-md border border-surfaceBorder rounded-2xl p-2.5 shadow-2xl flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2 py-1 text-gray-400 border-r border-surfaceBorder/60">
            <Eye className="w-3.5 h-3.5 text-fire" />
            <span className="hidden sm:inline">Figma Preview:</span>
          </div>

          <button
            onClick={() => setCurrentScreen('loading')}
            className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surfaceLight border border-surfaceBorder text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
            title="View Figma Loading Screen"
          >
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            <span>Loading</span>
          </button>

          <button
            onClick={() => {
              setErrorData({
                message: "Fire line connection timed out during safety grid diagnostic interrogation."
              });
              setCurrentScreen('error');
            }}
            className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surfaceLight border border-surfaceBorder text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
            title="View Figma Error Screen (404)"
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>Error</span>
          </button>

          <button
            onClick={() => {
              setTicketData({
                refId: "JSE-981240",
                name: "Sakthi / Reviewer",
                company: "Industrial Safety Operations",
                phone: "+91 99416 46332",
                email: "jsbsafety@gmail.com",
                service: "Fire Hydrant & Sprinkler Systems",
                scope: "Pre-commissioning safety review and hydraulic flow test audit.",
                timestamp: new Date().toLocaleString()
              });
              setCurrentScreen('success');
            }}
            className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surfaceLight border border-surfaceBorder text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
            title="View Figma Success Screen"
          >
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>Success</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
