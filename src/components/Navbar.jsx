import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const downloadBtnRef = useRef(null);
  const hamburgerRef = useRef(null);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const collapsedDownloadRef = useRef(null);
  const collapsedHamburgerRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Menu items
  const menuItems = ['About Us', 'Pricing', 'Contact Us'];

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      let lastScroll = window.scrollY;
  
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top+=1 top',
        onUpdate: () => {
          const currentScroll = window.scrollY;
  
          if (currentScroll > 50 && currentScroll > lastScroll) {
            setIsScrolled(true); // scrolling down
          } else if (currentScroll < lastScroll) {
            setIsScrolled(false); // scrolling up
          }
  
          lastScroll = currentScroll;
        },
        id: "navbar-scroll",
      });
    });
  
    return () => {
      ctx.revert();
      ScrollTrigger.getById("navbar-scroll")?.kill();
    };
  }, []);
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isScrolled) {
        // Collapsed state - desktop only
        gsap.to(navRef.current, {
          scale: 0.9,
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(collapsedDownloadRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(collapsedHamburgerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        // Expanded state - desktop only
        gsap.to(navRef.current, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(collapsedDownloadRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: 'power2.in'
        });
        gsap.to(collapsedHamburgerRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: 'power2.in'
        });
      }
    });

    return () => ctx.revert();
  }, [isScrolled]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isSidebarOpen) {
        // Open sidebar animation
        gsap.to(sidebarRef.current, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          pointerEvents: 'auto'
        });
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger to close icon
        gsap.to(hamburgerRef.current.children, {
          backgroundColor: '#000',
          duration: 0.2
        });
        gsap.to(hamburgerRef.current.children[0], {
          y: 6,
          rotate: 45,
          duration: 0.3
        });
        gsap.to(hamburgerRef.current.children[1], {
          opacity: 0,
          duration: 0.2
        });
        gsap.to(hamburgerRef.current.children[2], {
          y: -6,
          rotate: -45,
          duration: 0.3
        });
      } else {
        // Close sidebar animation
        gsap.to(sidebarRef.current, {
          x: '100%',
          duration: 0.3,
          ease: 'power2.in'
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          pointerEvents: 'none'
        });
        document.body.style.overflow = '';
        
        // Animate close icon back to hamburger
        gsap.to(hamburgerRef.current.children, {
          backgroundColor: '#000',
          duration: 0.2
        });
        gsap.to(hamburgerRef.current.children[0], {
          y: 0,
          rotate: 0,
          duration: 0.3
        });
        gsap.to(hamburgerRef.current.children[1], {
          opacity: 1,
          duration: 0.3,
          delay: 0.1
        });
        gsap.to(hamburgerRef.current.children[2], {
          y: 0,
          rotate: 0,
          duration: 0.3
        });
      }
    });

    return () => {
      ctx.revert();
      if (!isSidebarOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [isSidebarOpen]);

  // Reset navbar on click (desktop only)
  const handleCollapsedClick = () => {
    setIsScrolled(false);
  };

  // Close sidebar when clicking on overlay
  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Main Navbar (hidden when scrolled on desktop) */}
      <header 
        ref={navRef}
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-40"
        style={{
          padding: '1rem 2rem',
          margin: '1rem',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transformOrigin: 'top center'
        }}
      >
        {/* Logo - hidden on mobile */}
        <div 
          ref={logoRef}
          className="text-2xl font-bold text-black md:block hidden"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Perpenny
        </div>

        {/* Desktop Menu */}
        <div 
          ref={menuRef}
          className="hidden md:flex space-x-8 mx-4"
        >
          {menuItems.map((item, i) => (
            <a
              key={i}
              href="#"
              className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Download Button - Desktop */}
        <button
          ref={downloadBtnRef}
          className="hidden md:block bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Download Now
        </button>

        {/* Mobile Hamburger - Only circle icon */}
        <div
          className="md:hidden flex items-center justify-center bg-white rounded-full shadow-md cursor-pointer"
          style={{
            width: 40,
            height: 40
          }}
          onClick={toggleSidebar}
        >
          <div
            ref={hamburgerRef}
            className="focus:outline-none"
            style={{
              width: 24,
              height: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className="w-6 h-0.5 bg-black mb-1.5 transition-all"></div>
            <div className="w-6 h-0.5 bg-black mb-1.5 transition-all"></div>
            <div className="w-6 h-0.5 bg-black transition-all"></div>
          </div>
        </div>
      </header>

      {/* Collapsed Desktop Elements (appear when scrolling down) */}
      <div className="fixed top-10 right-4 z-50 hidden md:flex items-center gap-2">
        {/* Collapsed Download Button */}
        <button
          ref={collapsedDownloadRef}
          className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          style={{
            opacity: 0,
            transform: 'translateY(-20px)',
            height: 40
          }}
          onClick={handleCollapsedClick}
        >
          Download Now
        </button>

        {/* Collapsed Hamburger Circle */}
        <div
          ref={collapsedHamburgerRef}
          className="flex items-center justify-center bg-white rounded-full shadow-md cursor-pointer"
          style={{
            width: 40,
            height: 40,
            opacity: 0,
            transform: 'translateY(-20px)'
          }}
          onClick={handleCollapsedClick}
        >
          <div
            className="focus:outline-none"
            style={{
              width: 24,
              height: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div className="w-6 h-0.5 bg-black mb-1.5"></div>
            <div className="w-6 h-0.5 bg-black mb-1.5"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 opacity-0 pointer-events-none transition-opacity duration-300 md:hidden"
        onClick={handleOverlayClick}
      ></div>

      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform translate-x-full md:hidden"
        style={{
          padding: '2rem 1.5rem',
          borderRadius: '12px 0 0 12px',
          overflowY: 'auto'
        }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 p-2 focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Sidebar content */}
        <div className="mt-8 flex flex-col space-y-6">
          {menuItems.map((item, i) => (
            <a
              key={i}
              href="#"
              className="text-lg font-medium text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              {item}
            </a>
          ))}
          
          <button
            className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors mt-4"
            onClick={() => setIsSidebarOpen(false)}
          >
            Download Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;