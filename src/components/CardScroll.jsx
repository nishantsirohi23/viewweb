import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CardScroll = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrappers = gsap.utils.toArray(".card-wrapper");
    const cards = gsap.utils.toArray(".card");

    wrappers.forEach((wrapper, i) => {
      const card = cards[i];
      let scale = 1;
      let rotation = 0;

      if (i !== cards.length - 1) {
        scale = 0.9 + 0.025 * i;
        rotation = -10;
      }

      gsap.to(card, {
        scale,
        rotationX: rotation,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: `top ${60 + 10 * i}`,
          end: "bottom 550",
          endTrigger: ".wrapper",
          scrub: true,
          pin: wrapper,
          pinSpacing: false,
          markers: false,
          id: i + 1,
        },
      });
    });
  }, []);

  const gradientStyles = {
    red: { background: "linear-gradient(to right, #ff4e50, #f9d423)" },
    blue: { background: "linear-gradient(to right, #24c6dc, #514a9d)" },
    orange: { background: "linear-gradient(to right, #f7971e, #ffd200)" },
    purple: { background: "linear-gradient(to right, #a18cd1, #fbc2eb)" },
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
        }}
      />
      <div
        className="wrapper"
        ref={wrapperRef}
        style={{
          width: "100%",
          minHeight: "100vh",
          paddingTop: "100px",
          paddingBottom: "50px",
          borderTop: "2px dashed #e0e0e0",
          borderBottom: "2px dashed #e0e0e0",
        }}
      >
        <div
          className="cards"
          style={{
            width: "70%",
            margin: "0 auto",
            padding: "0 50px",
          }}
        >
          {["red", "blue", "orange", "purple"].map((color, index) => (
            <div
              className="card-wrapper"
              key={index}
              style={{
                width: "100%",
                perspective: "500px",
                marginBottom: index === 3 ? 0 : "50px",
              }}
            >
              <div
                className={`card`}
                style={{
                  ...gradientStyles[color],
                  width: "100%",
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "30px",
                  borderRadius: "10px",
                  color: "black",
                }}
              >
                Card {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
        }}
      />
    </>
  );
};

export default CardScroll;
