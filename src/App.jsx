import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import GSAPScrollPanels from './components/gsaptut';
import ServicesTickerVertical from './components/infinitscrolling.jsx';
import ScrollingCards from './components/reviewscrolling.jsx';
import ImageScrollReveal from './components/gsaptry2.jsx';


gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize GSAP context for the entire app
    const ctx = gsap.context(() => {
      // This ensures all GSAP animations are properly scoped
    });

    return () => {
      // Cleanup all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ctx.revert(); // Reverts all GSAP animations
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
	  <ImageScrollReveal/>
      <GSAPScrollPanels />
      <ServicesTickerVertical />
      <ScrollingCards />
    </div>
  );
}