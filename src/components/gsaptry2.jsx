import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageScrollReveal = () => {
  // Refs for all elements
  const containerRef = useRef(null);
  const mainContainerRef = useRef(null);
  const bigImageRef = useRef(null);
  const smallImagesRef = useRef([]);
  const titleRef = useRef(null);
    const descriptiontextRef = useRef(null);
  const scrollPromptRef = useRef(null);
  const descriptionRef = useRef(null);
  const phoneImageRef = useRef(null);
  const phase1TopImagesRef = useRef([]);
  const phase1BottomImagesRef = useRef([]);
  const phase2TopImagesRef = useRef([]);
  const phase2BottomImagesRef = useRef([]);
  
  // State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const [isMobile, setIsMobile] = useState(false);

  // Helper function to parse values
  const parseValue = (value, vw, vh) => {
    if (typeof value === 'number') return value;
    if (value.endsWith('vw')) return parseFloat(value) * vw / 100;
    if (value.endsWith('vh')) return parseFloat(value) * vh / 100;
    if (value.endsWith('px')) return parseFloat(value);
    return parseFloat(value);
  };

  // Image configurations
  const phaseImagesTopConfig = [
    { url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2FPhase2Images%2Fbox.png?alt=media&token=c3b2dd17-1c11-46ea-bfbf-bdd9bc8e5d20', size: 'clamp(80px, 15vw, 120px)' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2FPhase2Images%2Fbrush.png?alt=media&token=89aac41d-d4fa-4229-934d-7dd4e7d8baf5', size: 'clamp(70px, 9vw, 110px)' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2FPhase2Images%2Fmakeup.png?alt=media&token=11d53707-7fed-4fa0-8653-3a0592c66813', size: 'clamp(90px, 12vw, 140px)' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2FPhase2Images%2Fbulb.png?alt=media&token=34bc4c3f-f1f0-4383-8806-474f37cf9152', size: 'clamp(90px, 12vw, 140px)' }
  ];
  const phaseImagesBottomConfig = [
    { url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2FPhase2Images%2Fvacuum.png?alt=media&token=aad663d4-bb28-4c92-a5f6-45ec24067f3e', size: 'clamp(80px, 10vw, 120px)' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2FPhase2Images%2Ftoilet.png?alt=media&token=62313ed9-9118-49fb-ba7c-9d50c7655cfb', size: 'clamp(70px, 9vw, 110px)' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2FPhase2Images%2Ffarming-tools.png?alt=media&token=43497ed2-0279-498b-8dfa-cb75a6f74223', size: 'clamp(90px, 12vw, 140px)' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2FPhase2Images%2Fwoman.png?alt=media&token=b2793fd8-c215-4697-a881-ad9b5da4428f', size: 'clamp(90px, 12vw, 140px)' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2FPhase2Images%2Fcar-wash.png?alt=media&token=757fbe62-413b-493f-907b-417f132ae681', size: 'clamp(90px, 12vw, 140px)' }
  ];

  const smallImagesConfig = [
    
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FTutions%20Instagram%20Post%20in%20Light%20Pink%20Blue%20Bold%20Style%20.png?alt=media&token=27bc5075-782a-4a97-94c3-d22f8ae976b2',
        size: { 
          width: 'clamp(10px, 15vw, 400px)', 
          height: 'clamp(10px, 27vh, 400px)' 
        },
        position: { 
          angle: 0, 
          radius: 'clamp(150px, 19vw, 360px)' 
        },
        delay: 0.0
      },
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iPhone%2016e%20-%202025-07-01%20at%2015.36.58.png?alt=media&token=bf630cb9-cf58-4a6e-bafb-44b14207c1b6',
        size: { 
          width: 'clamp(20px, 29vw, 400px)', 
          height: 'clamp(20px,8vw, 400px)' 
        },
        position: { 
          angle: 30, 
          radius: 'clamp(20px, 22vw, 450px)' 
        },
        delay: 0.03
      },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FUntitled%20(700%20x%20200%20px).png?alt=media&token=3e9c4d6d-d0f8-4d2e-a2e8-4adc0c9e5bf8',
      size: { 
        width: 'clamp(40px, 30vw, 400px)', 
        height: 'clamp(40px, 20vh, 200px)' 
      },
      position: { 
        angle: 40, 
        radius: 'clamp(150px, 35vw, 350px)' 
      },
      delay: 0.07
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iPhone%2016e%20-%202025-07-01%20at%2012.47.18.png?alt=media&token=5b6b81b6-6179-4e19-a4a7-b0a730f3ad8f',
      size: { 
        width: 'clamp(180px, 22vw, 260px)', 
        height: 'clamp(120px, 12vh, 200px)' 
      },
      position: { 
        angle: 90, 
        radius: 'clamp(140px, 22vw, 320px)' 
      },
      delay: 0.14
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FScreenshot%202025-07-01%20at%201.51.37%E2%80%AFPM.png?alt=media&token=860256ad-2340-46b2-86e1-8fb4f32493ce',
      size: { 
        width: 'clamp(40px, 23vw, 400px)', 
        height: 'clamp(40px, 25vh, 200px)' 
      },
      position: { 
        angle: 142, 
        radius: 'clamp(180px, 33vw, 420px)' 
      },
      delay: 0.21
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FKids%20Yoga%20SEL%20Ice%20Breaker%20Presentation.png?alt=media&token=bfb3a1c8-514a-4bee-8704-24f9040ad19d',
      size: { 
        width: 'clamp(180px, 22vw, 260px)', 
        height: 'clamp(120px, 18vh, 200px)' 
      },
      position: { 
        angle: 160, 
        radius: 'clamp(120px, 21vw, 280px)' 
      },
      delay: 0.28
    },
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FKids%20Yoga%20SEL%20Ice%20Breaker%20Presentation.png?alt=media&token=bfb3a1c8-514a-4bee-8704-24f9040ad19d',
        size: { 
          width: 'clamp(180px, 22vw, 260px)', 
          height: 'clamp(120px, 18vh, 200px)' 
        },
        position: { 
          angle: 200, 
          radius: 'clamp(120px, 29vw, 280px)' 
        },
        delay: 0.28
      },
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iPhone%2016e%20-%202025-07-01%20at%2013.34.51.png?alt=media&token=7fc0afc0-78dd-431f-96d3-30739c1465f6',
        size: { 
          width: 'clamp(40px, 28vw, 400px)', 
          height: 'clamp(40px, 19vh, 200px)' 
        },
        position: { 
          angle: 220, 
          radius: 'clamp(180px, 33vw, 420px)' 
        },
        delay: 0.21
      },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FScreenshot%202025-07-01%20at%203.57.05%E2%80%AFPM.png?alt=media&token=481c147c-7e1b-4084-9921-5aa5b2ebe07e',
      size: { 
        width: 'clamp(140px, 21vw, 400px)', 
        height: 'clamp(150px, 20vh, 240px)' 
      },
      position: { 
        angle: 270, 
        radius: 'clamp(160px, 20vw, 380px)' 
      },
      delay: 0.42
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iPhone%2016e%20-%202025-07-01%20at%2012.47.06.png?alt=media&token=14a6c477-46b9-4aec-9dd6-0e04f5f3f367',
      size: { 
        width: 'clamp(10px, 25vw, 400px)', 
        height: 'clamp(10px, 15vh, 400px)' 
      },
      position: { 
        angle: 330, 
        radius: 'clamp(150px, 34vw, 360px)' 
      },
      delay: 0.49
    },
   
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fphase3images%2FSimulator%20Screenshot%20-%20iPhone%2016e%20-%202025-07-01%20at%2015.44.42.png?alt=media&token=c82f7da5-ca7f-4fe4-aa70-89db2d4160f8',
        size: { 
          width: 'clamp(200px, 25vw, 300px)', 
          height: 'clamp(200px, 25vw, 300px)' 
        },
        position: { 
          angle: 360, 
          radius: 'clamp(20px, 40vw, 450px)' 
        },
        delay: 0.49
      },
  ];



  // Effect for mobile detection
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Effect for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main animation effect
  useEffect(() => {
    if (!smallImagesRef.current.length) return;

    // Initial setup
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
    gsap.set(descriptiontextRef.current, { opacity: 1, y: 0 });

    gsap.set(scrollPromptRef.current, { opacity: 1, y: 0 });
    gsap.set(phoneImageRef.current, { opacity: 1, scale: 1, rotate: 0 });
    gsap.set(bigImageRef.current, { 
      opacity: 0, rotation: 90, scale: 0.8, xPercent: -50, yPercent: -50 
    });
    gsap.set(descriptionRef.current, { opacity: 0, x: 100 });
    smallImagesRef.current.forEach(img => img && gsap.set(img, { opacity: 0, scale: 0.3 }));
    
    // Set initial state for phase images
    [...phase1TopImagesRef.current, ...phase1BottomImagesRef.current, 
     ...phase2TopImagesRef.current, ...phase2BottomImagesRef.current]
      .forEach(img => img && gsap.set(img, { opacity: 0, scale: 0.5 }));

    const calculateRadius = (radiusValue) => {
      return parseValue(
        typeof radiusValue === 'string' ? 
          radiusValue.replace(/clamp\(([^,]+),\s*([^,]+),\s*([^)]+)\)/, '$2') : 
          radiusValue,
        windowSize.width,
        windowSize.height
      );
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainerRef.current,
        start: "top top",
        end: "+=800%",
        scrub: 1,
        pin: true,
        onUpdate: self => {
            setScrollProgress(self.progress);
            // Hide phone after it fades out (when progress > 0.5)
            if (self.progress > 0.5) {
              gsap.set(phoneImageRef.current, { visibility: 'hidden' });
            } else {
              gsap.set(phoneImageRef.current, { visibility: 'visible' });
            }
          },
        markers: false
      }
    });

    // PHASE 0: Phone image animation
    tl.to(phoneImageRef.current, {
      opacity: 1,
      scale: 1.2,
      rotate: 10,
      duration: 0.5
    }, 0)
    
    tl.to(phoneImageRef.current, {
      opacity: 0,
      duration: 1
    }, 0.5);

    tl.to(titleRef.current, { opacity: 0, y: -50, duration: 0.5 }, 0.5)
      .to(scrollPromptRef.current, { opacity: 0, y: 50, duration: 0.5 }, 0.5);
    tl.to(descriptiontextRef.current, { opacity: 0, y: -50, duration: 0.5 }, 0.5);

    // PHASE 1: Title section with images
    phase1TopImagesRef.current.forEach((img, index) => {
      tl.to(img, {
        opacity: 0.7,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, 0.1 * index);
    });

    phase1BottomImagesRef.current.forEach((img, index) => {
      tl.to(img, {
        opacity: 0.7,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, 0.1 * index + 0.15);
    });

    // Hide title and scroll prompt
    tl.to(titleRef.current, { 
        opacity: 0,      // Fade from current opacity to 0
        y: -50,          // Move up by 50 units
        duration: 1,     // Animation lasts 1 second
        delay: 0.5       // Starts after 0.5 seconds
      })
      .to(scrollPromptRef.current, { opacity: 0, y: 50, duration: 0.5 }, 0.5);

    tl.to(descriptiontextRef.current, {
        opacity: 0,      // Fade from current opacity to 0
        y: -50,          // Move up by 50 units
        duration: 1,     // Animation lasts 1 second
        delay: 0.5    
    });

    // Hide phase 1 images
    [...phase1TopImagesRef.current, ...phase1BottomImagesRef.current].forEach((img, index) => {
      tl.to(img, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3
      }, 0.7 + (0.05 * index));
    });

    // PHASE 2: Split screen with description
    tl.to(bigImageRef.current, { 
      opacity: 1,
      left: '25%',
      duration: 1 
    }, 1.0)
      .to(descriptionRef.current, { 
        opacity: 1,
        x: '25%',
        duration: 1 
      }, 1.0);

    // Show phase 2 top images
    phase2TopImagesRef.current.forEach((img, index) => {
      tl.to(img, {
        opacity: 0.7,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, 1.2 + (0.1 * index));
    });

    // Show phase 2 bottom images
    phase2BottomImagesRef.current.forEach((img, index) => {
      tl.to(img, {
        opacity: 0.7,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, 1.35 + (0.1 * index));
    });

    // Transition out of phase 2
    tl.to(descriptionRef.current, {
      opacity: 0,
      x: '100%',
      duration: 0.8
    }, 2.0)
    .to(bigImageRef.current, {
      left: '50%',
      duration: 1.2,
      ease: "power2.inOut"
    }, 2.2)
    .to(bigImageRef.current, {
      rotation: 0,
      duration: 1,
      ease: "power2.inOut"
    }, 3.4);

    // Hide phase 2 images
    [...phase2TopImagesRef.current, ...phase2BottomImagesRef.current].forEach((img, index) => {
      tl.to(img, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3
      }, 2.0 + (0.05 * index));
    });

    // PHASE 3: Final small images animation
    smallImagesRef.current.forEach((img, index) => {
      const config = smallImagesConfig[index];
      if (!config || !img) return;
      
      const angle = config.position.angle * (Math.PI / 180);
      const radius = calculateRadius(config.position.radius);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      tl.to(img, {
        opacity: 1,
        scale: 0.8,
        x: x,
        y: y,
        duration: 3,
        ease: "back.out(1.7)"
      }, 4.5 + config.delay);
    });

    

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, [windowSize]);

  return (
    <div ref={mainContainerRef} style={styles.mainContainer}>
      {/* Initial View */}
      <div style={styles.initialView}>
        <div style={styles.textContent}>
            <h1 ref={titleRef} style={styles.title}>Perpenny - Superstore of Services</h1>
            <p ref={descriptiontextRef} style={styles.subtitle}>Your one-stop solution for all service needs</p>
        </div>
        
        {/* Phone Image with margin right */}
        <img
            ref={phoneImageRef}
            src="/iphone1.png"
            alt="App Preview"
            style={styles.phoneImage}
        />

        <p ref={scrollPromptRef} style={styles.scrollPrompt}>Scroll down to explore</p>
        
        {/* Rest of your phase 1 images... */}
        </div>

      {/* Split Screen View */}
      <div style={styles.splitScreen}>
        <img
          ref={bigImageRef}
          src="https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/0aeverioholi%2Fmainscreen.png?alt=media&token=50890b18-b29d-4d5f-9231-d698c5190976"
          alt="Main"
          style={styles.rotatedImage}
        />
        

{phaseImagesTopConfig.map((imgConfig, index) => {
  const totalImages = phaseImagesTopConfig.length;
  const edgePadding = 5;
  
  // Different bottom values for each image
  const bottomValues = ['15%', '10%', '5%', '12%', '10%'];
  const bottomPercentage = bottomValues[index] || '10%';
  
  const leftPosition = totalImages > 1
    ? `${edgePadding + ((100 - edgePadding * 2) / (totalImages - 1)) * index}%`
    : '50%';

  return (
    <img
      key={`phase2-top-${index}`}
      ref={el => phase2TopImagesRef.current[index] = el}
      src={imgConfig.url}
      alt={`Service ${index + 4}`}
      style={{
        ...styles.phaseImage,
        width: imgConfig.size,
        height: imgConfig.size,
        top: bottomPercentage,
        left: leftPosition,
        transform: 'translateX(-50%)',
        opacity: 0,
      }}
    />
  );
})}

{/* Bottom Images */}
{phaseImagesBottomConfig.map((imgConfig, index) => {
  const totalImages = phaseImagesBottomConfig.length;
  const edgePadding = 5;
  
  // Different bottom values for each image
  const bottomValues = ['10%', '2%', '3%', '0%', '17%'];
  const bottomPercentage = bottomValues[index] || '10%';
  
  const leftPosition = totalImages > 1
    ? `${edgePadding + ((100 - edgePadding * 2) / (totalImages - 1)) * index}%`
    : '50%';

  return (
    <img
      key={`phase2-bottom-${index}`}
      ref={el => phase2BottomImagesRef.current[index] = el}
      src={imgConfig.url}
      alt={`Service ${index + 4}`}
      style={{
        ...styles.phaseImage,
        width: imgConfig.size,
        height: imgConfig.size,
        bottom: bottomPercentage,
        left: leftPosition,
        transform: 'translateX(-50%)',
        opacity: 0,
      }}
    />
  );
})}

        
        <div
          ref={descriptionRef}
          style={{
            ...styles.description,
            display: isMobile ? 'none' : 'block',
          }}
        >
          <h2 style={styles.descriptionTitle}>Our Services</h2>
          <p style={styles.descriptionText}>
            Discover a wide range of services designed to meet all your needs in one place.
            From professional consultations to hands-on solutions, we've got you covered.
          </p>
        </div>
      </div>

      {/* Final Image View */}
      <div ref={containerRef} style={styles.imageContainer}>
        {smallImagesConfig.map((imgConfig, index) => (
          <img
            key={index}
            ref={el => smallImagesRef.current[index] = el}
            src={imgConfig.url}
            alt={`Service ${index + 1}`}
            style={{
              ...styles.smallImage,
              width: imgConfig.size.width,
              height: imgConfig.size.height,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#121212',
  },
  initialView: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: '#000000',
    paddingLeft: '10%', // Adds left padding to entire view
  },
  
  textContent: {
    width: '50%',
    textAlign: 'left', // Align text to left
    marginBottom: '2rem',
    maxWidth: '600px', // Optional: prevents text from getting too wide
  },
  
  title: {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '1rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
    opacity: 0,
    textAlign: 'left', // Ensure text alignment
  },
  
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    color: '#aaaaaa',
    lineHeight: 1.5,
    marginTop: '1rem',
    textAlign: 'left', // Ensure text alignment
  },
  
  phoneImage: {
    position: 'absolute',
    top: '50%',
    right: '10%',
    transform: 'translateY(-50%)',
    width: '20vw',
    height: 'auto',
    borderRadius: '15px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    opacity: 0,
    zIndex: 15,
    marginRight: '5%', // Added margin to the right of phone
    '@media (max-width: 768px)': {
      width: '30vw',
      right: '5%',
      marginRight: '2%',
    }
  },
  scrollPrompt: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    color: '#aaaaaa',
    opacity: 0,
    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
  },
  splitScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rotatedImage: {
    height: '70vh',
    maxWidth: '90%',
    objectFit: 'cover',
    borderRadius: '15px',
    position: 'absolute',
    left: '0%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0,
    zIndex: 20,
    willChange: 'transform, opacity',
    '@media (max-width: 768px)': {
      height: '50vh'
    }
  },
  description: {
    width: 'clamp(300px, 40%, 600px)',
    padding: '2rem',
    opacity: 0,
    transform: 'translateX(25%)',
    zIndex: 10,
    willChange: 'transform, opacity',
    backgroundColor: 'rgba(30,30,30,0.7)',
    borderRadius: '15px',
    backdropFilter: 'blur(5px)',
    margin: '0 20px 0 10vh'
},
  descriptionTitle: {
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#ffffff'
  },
  descriptionText: {
    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
    lineHeight: '1.6',
    color: '#dddddd'
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18,18,18,0.9)'
  },
  smallImage: {
    position: 'absolute',
    objectFit: 'cover',
    borderRadius: '14px',
    opacity: 0,
    zIndex: 15,

    willChange: 'transform, opacity',
    boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  phaseImage: {
    position: 'absolute',
    objectFit: 'cover',
    borderRadius: '8px',
    zIndex: 15,
    willChange: 'transform, opacity',
    filter: 'brightness(1)',
    transition: 'all 0.3s ease-out'
  }
};

export default ImageScrollReveal;