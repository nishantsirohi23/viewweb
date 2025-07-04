import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';

/**
 * About component that displays information about the company.
 */
const About = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create('#about h2', {
      type: 'words',
    });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center',
      },
    });

    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: 'expo.out',
        stagger: 0.02,
      })
      .from('.top-grid div, .bottom-grid div', {
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
        stagger: 0.04,
      }, '-=0.5');
  });

  return (
    <div id="about">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2>
              Where every detail matters <span className="text-white">-</span>
              from muddle to garnish
            </h2>
          </div>

          <div className="sub-content">
            <p>
              Every cocktail we serve is a reflection of our obsession with detail — from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.
            </p>

            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">
                More than +12000 customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid grid grid-cols-12 gap-4">
        <div className="md:col-span-3 col-span-6">
          <div className="noisy" />
          <img src="/images/abt1.jpeg" alt="grid-img-1" className="w-full" />
        </div>

        <div className="md:col-span-6 col-span-12">
          <div className="noisy" />
          <img src="/images/abt2.jpeg" alt="grid-img-2" className="w-full" />
        </div>

        <div className="md:col-span-3 col-span-6">
          <div className="noisy" />
          <img src="/images/abt5.jpeg" alt="grid-img-5" className="w-full" />
        </div>
      </div>

      <div className="bottom-grid grid grid-cols-12 gap-4">
        <div className="md:col-span-8 col-span-12">
          <div className="noisy" />
          <img src="/images/abt3.jpeg" alt="grid-img-3" className="w-full" />
        </div>

        <div className="md:col-span-4 col-span-12">
          <div className="noisy" />
          <img src="/images/abt4.jpeg" alt="grid-img-4" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default About;