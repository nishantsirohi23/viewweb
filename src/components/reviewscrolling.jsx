import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

gsap.registerPlugin(ScrollTrigger);

const ScrollingCards = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray('.card-wrapper');
      const cards = gsap.utils.toArray('.card');

      wrappers.forEach((wrapper, i) => {
        const card = cards[i];
        let scale = 1;
        let rotation = 0;

        if (i !== cards.length - 1) {
          scale = 0.9 + 0.025 * i;
          rotation = -10;
        }

        gsap.to(card, {
          scale: scale,
          rotationX: rotation,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top+=100',
            end: 'bottom top+=150',
            scrub: true,
            pin: wrapper,
            pinSpacing: false,
            markers: false,
          }
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ background: '#000', padding: '40px 0' }}>
      <div style={{ height: '10vh' }}></div>
      <div style={{ width: '90%', maxWidth: '800px', margin: '0 auto' }}>
        {cardData.map((card, index) => (
          <div
            className="card-wrapper"
            key={index}
            style={{ marginBottom: '40px', perspective: '1000px' }}
          >
            <div
              className={`card gradient-${card.color}`}
              style={{
                height: '75vh',
                minHeight: 500,
                width: '44vw',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease',
                background: gradientMap[card.color] || '#333'
              }}
            >
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h3 style={{ marginBottom: 10, textAlign: 'center' }}>
                  <span
                    style={{
                      background: 'rgba(0,0,0,0.85)',
                      color: 'white',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {card.heading}
                  </span>
                </h3>
                <p style={{ color: '#fff', fontSize: '1rem', lineHeight: 1.5 }}>{card.description}</p>
                <div style={{ flex: 1, overflow: 'hidden', position: 'relative', marginTop: 20 }}>
                  <DotLottieReact src={card.image} loop autoplay />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: '10vh' }}></div>
    </div>
  );
};

const cardData = [
  {
    heading: 'Featured',
    description: 'Discover our premium solution for all your needs. Perfect for professionals and beginners alike.',
    image: 'public/images/searchprofile.lottie',
    color: 'red'
  },
  {
    heading: 'Summer',
    description: 'Our newest seasonal lineup featuring innovative designs and comfortable materials.',
    image: 'https://source.unsplash.com/random/800x600?fashion,1',
    color: 'blue'
  },
  {
    heading: 'Tech',
    description: 'Cutting-edge technology to boost your productivity and entertainment experience.',
    image: 'https://source.unsplash.com/random/800x600?tech,1',
    color: 'orange'
  },
  {
    heading: 'Home',
    description: 'Transform your living space with our carefully curated home decor items.',
    image: 'https://source.unsplash.com/random/800x600?interior,1',
    color: 'purple'
  }
];

// Background gradients
const gradientMap = {
  red: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  blue: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  orange: 'linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)',
  purple: 'linear-gradient(135deg, #b993d6 0%, #8ca6db 100%)'
};

export default ScrollingCards;
