import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import GSAPScrollPanels from "./gsaptut";
import ClampParallaxSite from "./ClampParallaxSite";

/**
 * Hero component that displays a animated title and subtitle.
 */
const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);


 

  return (
    <>
      <section id="hero" className="noisy">
        <h1 ref={titleRef} className="title">
          MOJITO
        </h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p ref={subtitleRef} className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      
      <GSAPScrollPanels/>
      <ClampParallaxSite />
    </>
  );
};

export default Hero;