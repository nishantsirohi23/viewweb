import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BeforeAfterComparison = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const beforeImageRef = useRef(null);
  const afterImageRef = useRef(null);
  const sliderHandleRef = useRef(null);

  useEffect(() => {
    // Clear any previous ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Set initial state
    gsap.set(beforeImageRef.current, { clipPath: 'inset(0 50% 0 0)' });
    gsap.set(sliderHandleRef.current, { left: '50%' });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%", // Start when top of element hits 70% of viewport
        end: "bottom 30%", // End when bottom hits 30% of viewport
        scrub: 1, // Smooth scrubbing
        markers: false, // Set to true for debugging
        pin: false, // Don't pin the element
        anticipatePin: 0
      }
    });

    // Animation sequence
    tl.to(beforeImageRef.current, {
      clipPath: 'inset(0 0 0 0)',
      duration: 1
    })
    .to(sliderHandleRef.current, {
      left: '100%',
      duration: 1
    }, 0);

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Styles
  const styles = {
    mainContainer: {
      minHeight: '200vh', // Ensure enough scroll space
      position: 'relative',
      backgroundColor: '#111'
    },
    sectionContainer: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    },
    imageContainer: {
      position: 'relative',
      width: '90%',
      maxWidth: '1200px',
      height: '70vh',
      maxHeight: '700px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden'
    },
    beforeImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 2,
      willChange: 'clip-path'
    },
    afterImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 1
    },
    slider: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 3
    },
    sliderHandle: {
      position: 'absolute',
      width: '4px',
      height: '100%',
      backgroundColor: 'white',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.8)',
      zIndex: 4,
      top: 0,
      transform: 'translateX(-50%)'
    },
    sliderIcon: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
    },
    title: {
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      zIndex: 5,
      fontSize: 'clamp(18px, 3vw, 32px)',
      fontWeight: 'bold',
      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
      textAlign: 'center',
      width: '100%',
      padding: '0 20px'
    },
    beforeLabel: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '8px 15px',
      borderRadius: '4px',
      zIndex: 4,
      fontSize: 'clamp(14px, 2vw, 20px)'
    },
    afterLabel: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '8px 15px',
      borderRadius: '4px',
      zIndex: 3,
      fontSize: 'clamp(14px, 2vw, 20px)'
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div ref={sectionRef} style={styles.sectionContainer}>
        <div ref={containerRef} style={styles.imageContainer}>
          <h1 style={styles.title}>Scroll Down to Reveal Transformation</h1>
          
          <img
            ref={afterImageRef}
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="After"
            style={styles.afterImage}
          />
          
          <img
            ref={beforeImageRef}
            src="https://images.unsplash.com/photo-1605007493699-af65834f8a05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Before"
            style={styles.beforeImage}
          />
          
          <div style={styles.slider}>
            <div ref={sliderHandleRef} style={styles.sliderHandle}>
              <div style={styles.sliderIcon}>
                <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '10px solid #333', marginRight: '5px' }}></div>
                <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '10px solid #333', marginLeft: '5px' }}></div>
              </div>
            </div>
          </div>
          
          <div style={styles.beforeLabel}>Before</div>
          <div style={styles.afterLabel}>After</div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;