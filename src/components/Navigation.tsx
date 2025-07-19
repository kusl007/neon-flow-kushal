import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    // Entrance animation for navigation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: "power2.out" }
    );

    gsap.fromTo(logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: 3.7, ease: "back.out(1.7)" }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Open menu animation
      gsap.fromTo(mobileMenuRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      // Close menu animation
      gsap.to(mobileMenuRef.current,
        { x: '100%', opacity: 0, duration: 0.3, ease: "power2.in" }
      );
    }
  };

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 opacity-0"
      >
        <div className="glass-card mx-4 mt-4 md:mx-8 md:mt-6 rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              ref={logoRef}
              className="text-2xl font-bold text-gradient cursor-pointer"
              onClick={() => scrollToSection('#home')}
            >
              K.
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* CTA Button (Desktop) */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="hidden md:block btn-neon"
            >
              Hire Me
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm glass-card"
          style={{ transform: 'translateX(100%)' }}
        >
          <div className="flex flex-col h-full p-8">
            {/* Close button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={toggleMenu}
                className="p-2 text-foreground hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu items */}
            <div className="flex flex-col space-y-6 flex-1">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    toggleMenu();
                  }}
                  className="text-left text-2xl font-medium text-foreground/80 hover:text-foreground transition-all duration-300 hover:translate-x-2"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                scrollToSection('#contact');
                toggleMenu();
              }}
              className="btn-neon w-full mt-8"
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;