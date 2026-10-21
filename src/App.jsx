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

  const handleFormStart = () => {
    setScreen('loading');
  };

  const handleFormSuccess = (ticket) => {
    setScreenData(ticket);
    setScreen('success');
  };

  const handleFormError = (err) => {
    setScreenData(err);
    setScreen('error');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'loading':
        return <LoadingScreen onFinish={() => setScreen('main')} />;
      case 'error':
        return (
          <ErrorScreen
            errorDetails={screenData}
            onReturnHome={() => setScreen('main')}
            onRetry={() => {
              setScreen('main');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
          />
        );
      case 'success':
        return (
          <SuccessScreen data={screenData} onReturnHome={() => setScreen('main')} />
        );
      default:
        return (
          <>
            <Header currentScreen={currentScreen} setScreen={setScreen} />
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
            <Footer setScreen={setScreen} />
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
