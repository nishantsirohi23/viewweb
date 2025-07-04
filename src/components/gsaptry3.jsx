import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LongImageScroll = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: "-100vh", // Scrolls image upwards
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom+=100% top",
          scrub: true,
          pin: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "200vh", // Tall section to enable scroll
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        ref={imageRef}
        src="https://source.unsplash.com/1080x1920/?nature"
        alt="Long Scroll Image"
        style={{
          height: "200vh", // Make it very tall
          width: "100%",
          objectFit: "cover",
          transform: "translateY(0%)",
        }}
      />
    </div>
  );
};

export default LongImageScroll;
