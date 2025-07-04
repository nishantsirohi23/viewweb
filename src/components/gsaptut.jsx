import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GSAPScrollPanels() {
  const containerRef = useRef(null);
  const panelsContainerRef = useRef(null);
  const smoothWrapperRef = useRef(null);
  const heroRef = useRef(null);
  const cloudsLayer1Ref = useRef(null);
  const cloudsLayer2Ref = useRef(null);
  const featherRef = useRef(null);

  // State for Action Button UI
  const [selectedAction, setSelectedAction] = useState( {
    name: 'Painting Service',
    title: 'Add colors.\nWithout mess.',
    description: 'Our professional painters give your space a fresh, vibrant look with zero hassle.',
    actionDescription: 'Book a painter now and see your walls come alive in no time.',
    image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fservicephone%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-8.png?alt=media&token=cfbab571-144f-4eaf-82dd-b687855b0e37',
});

  const actions = [
    {
      name: 'Painting Service',
      title: 'Add colors.\nWithout mess.',
      description: 'Our professional painters give your space a fresh, vibrant look with zero hassle.',
      actionDescription: 'Book a painter now and see your walls come alive in no time.',
      image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fservicephone%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-8.png?alt=media&token=cfbab571-144f-4eaf-82dd-b687855b0e37',
    },
    {
        name: 'Deep Cleaning',
        title: 'Sparkling clean.\nNo corners missed.',
        description: 'From bathrooms to kitchens — our pros clean it all, deep and thorough.',
        actionDescription: 'Book a deep cleaning session that makes your home shine.',
        image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fservicephone%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-9.png?alt=media&token=ffddd67c-375f-4fbf-aa60-36a82bece7e5',
      },
    {
      name: 'Air Conditioner',
      title: 'Cool comfort.\nAt your call.',
      description: 'Expert AC repair and servicing to beat the heat anytime, anywhere.',
      actionDescription: 'Book a technician and get your AC fixed fast.',
      image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fservicephone%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-11.png?alt=media&token=bc5eae1b-a099-4e53-9e33-0a766f84c4db',
    },
    {
      name: 'Home Repairs',
      title: 'Fix it right.\nFix it now.',
      description: 'Get carpenters, electricians, and plumbers instantly for all your home issues.',
      actionDescription: 'Book verified repair experts within seconds.',
      image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fservicephone%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-10.png?alt=media&token=8e644373-77b8-4b7f-ba95-2ea91089a82b',
    },
    {
      name: 'Pet Care',
      title: 'Love pets?\nWe care too.',
      description: 'Get grooming, vet visits, walking and more — all at home for your furry friends.',
      actionDescription: 'Book trusted pet care professionals instantly.',
      image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fservicephone%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-7.png?alt=media&token=1d0d07fe-c2c5-4f92-954e-76d1d5ee6a21',
    },

    {
        name: 'Househelp',
        title: 'Daily chores?\nHandled for you.',
        description: 'From cooking to cleaning, our househelps make your home shine effortlessly.',
        actionDescription: 'Hire trusted maids and domestic help at your convenience.',
        image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fservicephone%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-6.png?alt=media&token=790f8e59-c045-4495-8241-d16865ea7c19',
      },
  ];
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const panelsContainer = panelsContainerRef.current;
      const hero = heroRef.current;
      const clouds1 = cloudsLayer1Ref.current;
      const clouds2 = cloudsLayer2Ref.current;
      const feather = featherRef.current;

      // Set up horizontal scrolling for panels
      if (container && panelsContainer) {
        const panels = gsap.utils.toArray('.panel');
        const totalWidth = panels.length * window.innerWidth;
        
        gsap.set(panelsContainer, { width: totalWidth });
        
        gsap.to(panelsContainer, {
          x: () => -(totalWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => `+=${totalWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
            id: "horizontal-panels"
          }
        });
      }

      // Parallax effects for clouds
      if (clouds1) {
        gsap.to(clouds1, {
          x: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            id: "clouds-1"
          }
        });
      }

      if (clouds2) {
        gsap.to(clouds2, {
          x: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            id: "clouds-2"
          }
        });
      }

      // Feather animation
      if (feather) {
        gsap.to(feather, {
          rotation: 360,
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            id: "feather-anim"
          }
        });
      }

      // Smooth scroll setup
      gsap.set('body', { overflow: 'hidden' });
    });

    return () => {
      ctx.revert();
      gsap.set('body', { overflow: 'auto' });
      // Clean specific ScrollTriggers
      ['horizontal-panels', 'clouds-1', 'clouds-2', 'feather-anim'].forEach(id => {
        ScrollTrigger.getById(id)?.kill();
      });
    };
  }, []);

  const panels = [
    { 
      id: 1, 
      title: 'Post your Work', 
      color: 'from-black to-black', 
      description: 'Easily describe what you need help with, like “Need someone to repair my AC, issue with compressor.” Just type your requirement in simple words and post it. No complicated forms or phone calls — it only takes a few seconds.',
      image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fpanel5images%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px).png?alt=media&token=e157063b-22fd-457a-9b91-39f91915dbe9'
    },
    { 
      id: 2, 
      title: 'Track Work', 
      color: 'from-black to-black', 
      description: 'Once your work is posted, you can monitor its status in real time. View which professionals have applied, compare their prices, estimated time, and responses — all through a clean and simple dashboard.',
      image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fpanel5images%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-2.png?alt=media&token=95ccc488-b1a1-425a-9400-ab17e44263dc'
    },
    { 
      id: 3, 
      title: 'Choose the best professionals', 
      color: 'from-black to-black', 
      description: 'Compare each professional based on their specialization, price quotes, reviews, experience, and ratings. Make an informed decision by choosing the one that perfectly matches your needs and budget.',
      image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fpanel5images%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-3.png?alt=media&token=760b41a3-a276-45f0-8b99-1762effdb946'
    },
    { 
      id: 4, 
      title: 'Track Location', 
      color: 'from-black to-black', 
      description: 'Know exactly when and where your assigned professional is. Track their live location, check estimated arrival time, and coordinate date and time as per your convenience — all within the app.',
      image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fpanel5images%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-4.png?alt=media&token=2cb6345b-8861-4e1f-9f36-2a4a150c0830'
    },
    { 
      id: 5, 
      title: 'Pay using secure methods', 
      color: 'from-black to-black', 
      description: 'After the job is completed to your satisfaction, pay securely using multiple options — UPI, credit/debit cards, or net banking. Every transaction is encrypted and protected for your peace of mind.',
      image: 'https://firebasestorage.googleapis.com/v0/b/perwork.appspot.com/o/000PerpennyWebsite%2Fpanel5images%2FUntitled%20(1179%20x%202566%20px)%20(1179%20x%202300%20px)-5.png?alt=media&token=aba5183a-a360-4c54-9284-af3109be63bb'
    }
  ];
  
  

  return (
    <div ref={smoothWrapperRef} className="w-full overflow-hidden bg-gray-900 text-white font-bold">
      {/* Feather decoration */}
      <div 
        ref={featherRef}
        className="fixed top-4 right-4 w-8 h-8 z-50 pointer-events-none"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white opacity-70">
          <path d="M12.5,2C13.26,2 13.91,2.39 14.31,2.95C14.5,3.22 14.5,3.78 14.31,4.05L12.5,6.5L10.69,4.05C10.5,3.78 10.5,3.22 10.69,2.95C11.09,2.39 11.74,2 12.5,2M12.5,8.5L15.69,12.95C16.08,13.5 16.08,14.5 15.69,15.05L12.5,19.5L9.31,15.05C8.92,14.5 8.92,13.5 9.31,12.95L12.5,8.5M12.5,21.5C11.74,21.5 11.09,21.11 10.69,20.55C10.5,20.28 10.5,19.72 10.69,19.45L12.5,17L14.31,19.45C14.5,19.72 14.5,20.28 14.31,20.55C13.91,21.11 13.26,21.5 12.5,21.5Z"/>
        </svg>
      </div>

      {/* Hero Section */}
      <section 
        id="intro" 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black to-black overflow-hidden"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-center uppercase tracking-wider z-10">
          Epic Journey
        </h1>
      </section>

      {/* Horizontal Scroll Panels */}
      <section id="panels" ref={containerRef} className="relative">
        <div 
          ref={panelsContainerRef} 
          className="flex"
          style={{ width: '500%' }}
        >
          {panels.map((panel, index) => (
            <article 
              key={panel.id}
              id={`panel-${panel.id}`}
              className={`panel w-screen h-screen flex items-center justify-center bg-gradient-to-br ${panel.color} relative`}
            >
              <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center h-full">
                  <div className="flex items-center justify-center">
                  <div className="relative w-[21rem] h-[44rem] sm:w-[20rem] sm:h-[39rem] xs:w-[18rem] xs:h-[32rem]">
                  {/* Phone frame */}
                     
                      <div className="absolute inset-1 rounded-[2rem] overflow-hidden">
                        <img 
                          src={panel.image} 
                          alt={panel.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
                      {panel.title}
                    </h2>
                    
                    <p className="text-lg md:text-xl leading-relaxed opacity-90">
                      {panel.description}
                    </p>
                    
                    <div className="flex space-x-4 pt-4">
                      {index > 0 && (
                        <button className="px-6 py-3 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300">
                          ← Previous
                        </button>
                      )}
                      {index < panels.length - 1 && (
                        <button className="px-6 py-3 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300">
                          Next →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Action Button UI Section */}
      <section 
        id="action-button-ui" 
        className="h-screen flex tems-center justify-center bg-black text-white p-8"
      >
        {/* Left Side (Text Content) */}
        <div className="flex-[0.55] ml-8 pr-8 "> {/* 60% width and margin-left */}
          <h1 className="text-5xl font-bold whitespace-pre-line mb-4">
            {selectedAction.title}
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            {selectedAction.description}
          </p>
          <hr className="border-gray-700 my-8" />
          <div className="flex flex-col gap-4">
            {actions.map((action) => (
              <button
              key={action.name}
              onClick={() => setSelectedAction(action)}
              className={`inline-flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                selectedAction.name === action.name 
                  ? 'border-2 border-white bg-black text-white' 
                  : 'bg-transparent text-gray-400 hover:bg-gray-900'
              }`}
              style={{
                width: 'fit-content' // This ensures the button only takes the space it needs
              }}
            >
              {/* Icon */}
              <span className="mr-2">
  {action.name === 'Painting Service' && (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 3h18v4H3V3zm4 7h10v10a1 1 0 01-1 1H8a1 1 0 01-1-1V10z" />
    </svg>
  )}

  {action.name === 'Househelp' && (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4 6h16M4 10h16M4 14h10m-4 4h4" />
    </svg>
  )}

  {action.name === 'Air Conditioner' && (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4 6h16M4 10h16m-8 4v4m-4-4v4m8-4v4" />
    </svg>
  )}

  {action.name === 'Home Repairs' && (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9.75 3l.92 1.84a1 1 0 00.83.56l2.03.3a1 1 0 01.56 1.7L12.1 9.4a1 1 0 00-.28.88l.39 2.03a1 1 0 01-1.45 1.05L9.3 12.9a1 1 0 00-.94 0l-1.87.98a1 1 0 01-1.45-1.05l.39-2.03a1 1 0 00-.28-.88l-1.68-1.68a1 1 0 01.56-1.7l2.03-.3a1 1 0 00.83-.56L9.75 3z" />
    </svg>
  )}

  {action.name === 'Pet Care' && (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 21c-3-1.5-6-4.5-6-8a6 6 0 1112 0c0 3.5-3 6.5-6 8zM9 8a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-3 3a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  )}

  {action.name === 'Deep Cleaning' && (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 6l3 1 2.5-2.5M6 6l2 2m2-2l2 2m2-2l2 2m2-2l3-1m-6 8v5a1 1 0 001 1h2a1 1 0 001-1v-5m-4 0h4" />
    </svg>
  )}
</span>

              {/* Button Text */}
              {action.name}
            </button>
            ))}
          </div>
          <p className="text-gray-300 mt-8">
            {selectedAction.actionDescription}
          </p>
        </div>

        {/* Right Side (Image Content) */}
        <div className="flex-[0.3] flex justify-center  items-start"> {/* 40% width */}
          <div className="max-w-xs rounded-3xl overflow-hidden shadow-lg shadow-white/10">
            <img
              src={selectedAction.image}
              alt={selectedAction.name}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>
    </div>
  );
}