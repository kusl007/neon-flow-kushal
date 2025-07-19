import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ArrowUp } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance animation
      gsap.fromTo(contentRef.current?.children || [],
        {
          opacity: 0,
          y: 60,
          filter: 'blur(5px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%"
          }
        }
      );

      // Floating particles animation
      gsap.to(particlesRef.current?.children || [], {
        y: -30,
        duration: 4,
        stagger: {
          each: 0.5,
          repeat: -1,
          yoyo: true
        },
        ease: "power1.inOut"
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative mt-20 pt-20 pb-8 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent" />
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-primary rounded-full blur-sm" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent rounded-full blur-sm" />
        <div className="absolute bottom-1/2 left-1/3 w-2 h-2 bg-neon-cyan rounded-full blur-sm" />
        <div className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-neon-pink rounded-full blur-sm" />
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary-glow rounded-full blur-sm" />
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-accent-glow rounded-full blur-sm" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="space-y-12">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand section */}
            <div className="space-y-6">
              <div className="text-3xl font-bold text-gradient">
                KUSHAL
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Crafting futuristic digital experiences that push the boundaries of modern web development.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart size={16} className="text-red-500 animate-pulse" />
                <span>and lots of coffee</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Navigation</h3>
              <nav className="space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-muted-foreground hover:text-foreground transition-colors duration-300 hover:translate-x-1 transform text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Let's Connect</h3>
              <div className="space-y-3">
                <a
                  href="mailto:kushal@example.com"
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  kushal@example.com
                </a>
                <div className="text-muted-foreground">
                  Available worldwide
                </div>
                <div className="text-sm text-muted-foreground">
                  Response within 24 hours
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Kushal. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="group glass-card p-3 rounded-full hover:scale-110 transition-all duration-300 hover:shadow-glow"
            >
              <ArrowUp 
                size={20} 
                className="text-foreground group-hover:text-primary transition-colors duration-300" 
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;