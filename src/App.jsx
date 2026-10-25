import React, { useState } from 'react';
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
import LoadingScreen from './screens/LoadingScreen';
import ErrorScreen from './screens/ErrorScreen';
import SuccessScreen from './screens/SuccessScreen';

// Main application entry point – handles navigation between main site and async screens
export default function App() {
  const [currentScreen, setScreen] = useState('main'); // main | loading | success | error
  const [screenData, setScreenData] = useState(null); // holds ticket info or error details

  const navigateTo = (screen, data = null) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setScreenData(data);
    setScreen(screen);
  };

  const handleFormStart = () => {
    navigateTo('loading');
  };

  const handleFormSuccess = (ticket) => {
    navigateTo('success', ticket);
  };

  const handleFormError = (err) => {
    navigateTo('error', err);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'loading':
        return <LoadingScreen onFinish={() => navigateTo('main')} />;
      case 'error':
        return (
          <ErrorScreen
            errorDetails={screenData}
            onReturnHome={() => navigateTo('main')}
            onRetry={() => {
              navigateTo('main');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
          />
        );
      case 'success':
        return (
          <SuccessScreen data={screenData} onReturnHome={() => navigateTo('main')} />
        );
      default:
        return (
          <>
            <Header currentScreen={currentScreen} setScreen={navigateTo} />
            <main className="flex-1">
              <Hero />
              <About />
              <Services />
              <WhyChooseUs />
              <Lifecycle />
              <PracticeGallery />
              <IndustriesServed />
              <ContactSection
                onFormStart={handleFormStart}
                onFormSuccess={handleFormSuccess}
                onFormError={handleFormError}
              />
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-gray-100 flex flex-col selection:bg-fire selection:text-white">
      {renderScreen()}
    </div>
  );
}
