import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollSmootherPage() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 2,
      effects: true,
    });

    gsap.from('.draw', {
      drawSVG: '0%',
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.heading',
        start: 'top center',
        scrub: true,
        pin: '.pin',
        pinSpacing: false,
        markers: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700&display=swap');

        #smooth-wrapper {
          font-family: 'Unbounded', sans-serif;
        }

        .pin-spacer {
          pointer-events: none;
        }

        :root {
          --f-5-min: 30;
          --f-5-max: 120;
          --step-5: calc(((var(--f-5-min) / 16) * 1rem) + (var(--f-5-max) - var(--f-5-min)) * var(--fluid-bp));
        }

        header {
          padding: 1.5rem;
          display: flex;
          border-bottom: 2px solid grey;
          background-color: #111;
        }

        button {
          cursor: pointer;
        }

        button:hover {
          background: purple;
          background-image: none;
        }

        .hero {
          min-height: 100vh;
        }

        .logo {
          width: 150px;
          max-width: 40vw;
          filter: invert(1);
        }

        nav {
          margin-left: auto;
        }

        ul {
          display: flex;
          list-style: none;
        }

        li + li {
          padding-left: 1rem;
        }

        a {
          color: white;
        }

        h1 {
          position: relative;
          font-size: var(--step-5);
          text-transform: uppercase;
          text-align: center;
        }

        .images {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          align-items: stretch;
          justify-items: center;
          margin-top: 2rem;
        }

        img {
          max-width: 100%;
          height: 60vh;
          object-fit: cover;
        }

        .spacer {
          height: 100vh;
        }

        .clamp {
          position: relative;
          z-index: -1;
        }

        .yt {
          z-index: 3;
        }

        .clamp svg {
          position: absolute;
          width: 112%;
          top: 50%;
          transform: translateY(-50%) rotate(2deg);
          left: -6%;
        }

        .heading {
          position: relative;
          z-index: 2;
          mix-blend-mode: difference;
          perspective: 1000px;
          backface-visibility: visible;
          transform: rotate(0.1deg);
        }

        .images {
          z-index: -1;
        }

        .logo svg {
          opacity: 0;
        }
      `}</style>

      <div id="smooth-content" ref={contentRef}>
        <header>
          <div className="logo">
            
          </div>
          <nav>
            <ul role="list">
              <li>
                <a href="https://greensock.com/forums/topic/36177-scrollsmoother-data-speed-and-firstlast-folds/#comment-183450">about</a>
              </li>
            </ul>
          </nav>
        </header>

        <section className="hero pad-l">
          <div className="heading">
            <div className="pin">
              <h1>
                <span className="clamp">
                  Clamp
                  <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 842.14 500"
                  >
                    <path
                      className="draw"
                      d="M336.2,130.05C261.69,118,16.52,122,20.65,244.29c4.17,123,484.3,299.8,734.57,108.37,244-186.65-337.91-311-546.54-268.47"
                      fill="none"
                      stroke="#8486aa"
                      strokeMiterlimit="10"
                      strokeWidth="8"
                    />
                  </svg>
                </span>
                <span className="yt">your triggers</span>
              </h1>
            </div>
          </div>

          <div className="images">
            {[2.4, 1.8, 2.2, 1.5].map((speed, i) => (
              <img
                key={i}
                data-speed={`clamp(${speed})`}
                src={`https://source.unsplash.com/random/400x600?sig=${i}`}
                alt=""
              />
            ))}
          </div>
        </section>

        <section className="spacer"></section>
      </div>
    </div>
  );
}
