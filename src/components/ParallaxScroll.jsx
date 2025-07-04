import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';

const SmoothScroll = () => {
  const wrapperRef = useRef();
  const contentRef = useRef();
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: true,
      preventDefault: true
    });

    gsap.set(".heading", {
      yPercent: -150,
      opacity: 1
    });

    const mySplitText = new SplitText("#split-stagger", { type: "words,chars" });
    const chars = mySplitText.chars;

    chars.forEach((char, i) => {
      smoother.effects(char, { speed: 1, lag: (i + 1) * 0.1 });
    });

    return () => {
      smoother.kill();
    };
  }, []);

  // Styles
  const styles = {
    global: {
      boxSizing: 'border-box'
    },
    body: {
      backgroundColor: '#111',
      fontFamily: '"Open Sans", sans-serif',
      color: 'white',
      overscrollBehavior: 'none',
      margin: 0,
      padding: 0,
      fontWeight: 300,
      overflowX: 'hidden',
      fontSize: 'var(--step-0)'
    },
    section: {
      minHeight: '100vh'
    },
    p: {
      lineHeight: 1.35
    },
    content: {
      padding: '0 0.75rem',
      overflow: 'visible',
      width: '100%'
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 0.5rem'
    },
    heading: {
      position: 'absolute',
      top: '50vh',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: 0
    },
    headingText: {
      fontFamily: '"wild_worldbold"',
      fontSize: 'clamp(12px, 15.5vw, 250px)',
      textAlign: 'center',
      lineHeight: 0.67,
      margin: 0,
      color: '#111',
      WebkitTextStrokeWidth: '1.5px',
      WebkitTextStrokeColor: 'white',
      zIndex: -10
    },
    headingTextFirst: {
      color: 'white'
    },
    textContainer: {
      position: 'relative'
    },
    textContainerP: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      color: 'transparent'
    },
    title: {
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      minHeight: '50vh'
    },
    h1: {
      fontSize: 'clamp(12px, 8vw, 100px)',
      textAlign: 'center',
      lineHeight: 0.67,
      margin: '0 auto',
      fontFamily: '"wild_worldbold"'
    },
    eyebrow: {
      fontFamily: '"Open sans", sans-serif',
      fontSize: 'clamp(12px, 3vw, 40px)',
      fontWeight: 400
    },
    imageGrid: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      gridColumnGap: '0.2rem',
      gridRowGap: '0.2rem',
      width: '70vw',
      margin: '0 auto',
      paddingTop: '40vh',
      zIndex: -1
    },
    imageCont: {
      position: 'relative',
      aspectRatio: '1/1',
      overflow: 'hidden'
    },
    image: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '150%',
      objectFit: 'cover'
    },
    parallaxImages: {
      marginTop: '10vh',
      padding: '10rem 1rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridColumnGap: '1rem',
      gridRowGap: '20vh',
      alignItems: 'center',
      justifyItems: 'center'
    },
    parallaxImageCont: {
      position: 'relative',
      height: '80vh',
      overflow: 'hidden'
    },
    parallaxImg: {
      position: 'absolute',
      bottom: 0,
      margin: '0 auto',
      height: '140%',
      width: '100%',
      objectFit: 'cover'
    },
    parallaxText: {
      gridColumn: 2,
      gridRow: 1
    },
    spacer: {
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bars: {
      display: 'flex',
      flexWrap: 'wrap',
      columnGap: '4rem'
    },
    barsText: {
      flex: '1 1 300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    barsCont: {
      flex: '1 1 500px',
      display: 'flex',
      width: '100%',
      height: '60vh',
      alignItems: 'flex-end'
    },
    bar: {
      borderRadius: '10px',
      margin: '2vw',
      textAlign: 'center',
      flex: '1 0 auto',
      fontSize: 'var(--step-0)',
      justifySelf: 'flex-end',
      fontFamily: '"wild_worldbold"',
      fontSize: 'clamp(16px, 3vw, 36px)'
    },
    contentBox: {
      borderLeft: 'solid 1px white',
      padding: '0.5rem 2rem'
    },
    staggered: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      columnGap: '4rem'
    },
    staggeredText: {
      flex: '1 1 300px'
    },
    staggeredDemo: {
      flex: '1 1 500px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    staggeredH3: {
      fontFamily: '"wild_worldbold"',
      fontSize: 'clamp(16px, 6vw, 80px)',
      letterSpacing: '0.03em'
    },
    parallaxSlab: {
      position: 'relative',
      height: '500px',
      width: '100%',
      maxHeight: '500px',
      overflow: 'hidden'
    },
    slabImg: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '180%',
      objectFit: 'cover'
    },
    vCenter: {
      display: 'flex',
      alignItems: 'center'
    }
  };

  return (
    <div id="wrapper" ref={wrapperRef} style={styles.global}>
      <section id="content" ref={contentRef} style={styles.content}>
        <div className="heading" aria-hidden="true" style={styles.heading}>
          <p style={styles.headingText}>smooooth</p>
          <div className="text-container" style={styles.textContainer}>
            <p style={{...styles.headingText, ...styles.headingTextFirst}}>scrolling</p>
            <p data-speed="0.95" style={styles.textContainerP}>scrolling</p>
            <p data-speed="0.9" style={styles.textContainerP}>scrolling</p>
            <p data-speed="0.85" style={styles.textContainerP}>scrolling</p>
            <p data-speed="0.8" style={styles.textContainerP}>scrolling</p>
            <p data-speed="0.75" style={styles.textContainerP}>scrolling</p>
            <p data-speed="0.7" style={styles.textContainerP}>scrolling</p>
          </div>
        </div>

        <section className="image-grid container" style={styles.imageGrid}>
          <div className="image_cont" data-speed="1" style={styles.imageCont}>
            <img data-speed="auto" src="https://images.unsplash.com/photo-1556856425-366d6618905d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="" style={styles.image} />
          </div>
          <div className="image_cont" data-speed="1.7" style={styles.imageCont}>
            <img data-speed="auto" src="https://images.unsplash.com/photo-1520271348391-049dd132bb7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="" style={styles.image} />
          </div>
          <div className="image_cont" data-speed="1.5" style={styles.imageCont}>
            <img data-speed="auto" src="https://images.unsplash.com/photo-1609166214994-502d326bafee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="" style={styles.image} />
          </div>
        </section>

        <section className="title container" style={{...styles.title, ...styles.container}}>
          <h1 style={styles.h1}>
            <span className="eyebrow" aria-hidden="true" style={styles.eyebrow}>with </span>
            GSAP scrollsmoother
          </h1>
          <p style={styles.p}>Seamlessly integrated with GSAP and ScrollTrigger. Leveraging native scrolling - no "fake" scrollbars or event hijacking.</p>
        </section>

        <section className="bars container" style={{...styles.bars, ...styles.container}}>
          <div className="bars-text" style={styles.barsText}>
            <div className="flow content" style={styles.contentBox}>
              <h2 style={{fontSize: 'var(--step-1)', fontWeight: 500}}>Speed Control</h2>
              <p style={styles.p}>Animate elements along at different speeds, slow them down or make them whizz past.</p>
            </div>
          </div>

          <div className="bars-cont" style={styles.barsCont}>
            <div className="bar" data-speed="0.8" style={styles.bar}>
              <p>0.8</p>
            </div>
            <div className="bar" data-speed="0.9" style={styles.bar}>
              <p>0.9</p>
            </div>
            <div className="bar" data-speed="1" style={styles.bar}>
              <p>1</p>
            </div>
            <div className="bar" data-speed="1.1" style={styles.bar}>
              <p>1.1</p>
            </div>
            <div className="bar" data-speed="1.2" style={styles.bar}>
              <p>1.2</p>
            </div>
          </div>
        </section>

        <section className="v-center" style={styles.vCenter}>
          <div className="parallax-slab" style={styles.parallaxSlab}>
            <img data-speed="auto" src="https://assets.codepen.io/756881/smoothscroller-1.jpg" alt="" style={styles.slabImg} />
          </div>
        </section>

        <section className="staggered container" style={{...styles.staggered, ...styles.container}}>
          <div className="staggered_text" style={styles.staggeredText}>
            <div className="flow content" style={styles.contentBox}>
              <h2 style={{fontSize: 'var(--step-1)', fontWeight: 500}}>Add some lag (the good kind!)</h2>
              <p style={styles.p}>loosen the connection to the scroll to give a feeling of 'follow through.'</p>
            </div>
          </div>
          <div className="staggered_demo" style={styles.staggeredDemo}>
            <h3 id="split-stagger" style={styles.staggeredH3}>stagger...</h3>
          </div>
        </section>

        <section className="parallax-images container" style={{...styles.parallaxImages, ...styles.container}}>
          <div className="parallax-text" style={styles.parallaxText}>
            <div className="flow content" style={styles.contentBox}>
              <h2 style={{fontSize: 'var(--step-1)', fontWeight: 500}}>Easy parallax image effects</h2>
              <p style={styles.p}>Pop your images in a container with overflow hidden, size them a little larger than the container and set data-speed to auto. GSAP does the rest.</p>
            </div>
          </div>
          <div className="image_cont" style={{...styles.parallaxImageCont, gridColumn: '1 / span 1', gridRow: 1, width: '100%'}}>
            <img data-speed="auto" src="https://assets.codepen.io/756881/neon3.jpg" alt="" style={styles.parallaxImg} />
          </div>
          <div className="image_cont" style={{...styles.parallaxImageCont, gridColumn: '2 / span 1', gridRow: 2}}>
            <img data-speed="auto" src="https://assets.codepen.io/756881/neon2.jpg" alt="" style={styles.parallaxImg} />
          </div>
        </section>

        <section className="spacer" style={styles.spacer}></section>
      </section>
    </div>
  );
};

export default SmoothScroll;