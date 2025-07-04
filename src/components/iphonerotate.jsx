import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollImageEffect = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      {
        scale: 1,
        rotate: 0,
      },
      {
        scale: 1.2,
        rotate: 10,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 40%',
          end: 'bottom top',
          scrub: true,
        },
        ease: 'power1.out',
      }
    );
  }, []);

  return (
    <div
      style={{
        height: '150vh',
        background: '#111',
        position: 'relative',
      }}
    >
      <img
        ref={imageRef}
        src="/iphone1.png"
        alt="Zoom Rotate"
        style={{
          position: 'absolute',
          top: '25%',
          right: '10%', // increased from 5% to add right-side margin
          transform: 'translateY(-25%) rotate(0deg) scale(1)',
          width: '20vw',
          height: 'auto',
          borderRadius: '15px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          transition: 'transform 0.3s ease-out',
        }}
      />
    </div>
  );
};

export default ScrollImageEffect;
