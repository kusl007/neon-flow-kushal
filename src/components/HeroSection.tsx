import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkle } from 'phosphor-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 4 }); // Start after loading screen

    // Set initial states
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    });

    gsap.set(splineRef.current, {
      opacity: 0,
      x: 200,
      scale: 0.8
    });

    // Entrance animations
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power2.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    }, "-=0.6")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    // Floating orbs animation
    gsap.to(orbsRef.current?.children || [], {
      y: -20,
      duration: 3,
      stagger: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // CTA button hover animation setup
    const ctaButton = ctaRef.current;
    if (ctaButton) {
      const handleMouseEnter = () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      ctaButton.addEventListener('mouseenter', handleMouseEnter);
      ctaButton.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        ctaButton.removeEventListener('mouseenter', handleMouseEnter);
        ctaButton.removeEventListener('mouseleave', handleMouseLeave);
        tl.kill();
      };
    }

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      {/* Floating orbs */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-neon-cyan/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-neon-pink/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8 lg:space-y-12">
          {/* Title */}
          <div ref={titleRef} className="space-y-4">
            <div className="flex items-center space-x-2 text-primary mb-4">
              <Sparkle size={24} className="animate-pulse" />
              <span className="text-sm font-medium tracking-widest uppercase">Web Developer</span>
            </div>
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              Hi, I'm{' '}
              <span className="text-gradient">Kushal</span>
            </h1>
            <h2 className="text-2xl lg:text-4xl font-light text-foreground/80">
              Crafting futuristic digital experiences
            </h2>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef}>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
              I specialize in creating immersive web applications with cutting-edge animations, 
              3D elements, and premium user experiences that push the boundaries of modern web development.
            </p>
          </div>

          {/* CTA */}
          <div>
            <button
              ref={ctaRef}
              onClick={scrollToContact}
              className="btn-neon group inline-flex items-center space-x-3"
            >
              <span>Hire Me</span>
              <ArrowRight 
                size={20} 
                className="transform group-hover:translate-x-1 transition-transform duration-300" 
              />
            </button>
          </div>
        </div>

        {/* Spline 3D Model */}
        <div ref={splineRef} className="relative">
          <div className="relative aspect-square max-w-lg mx-auto">
            {/* Spline embed placeholder */}
            <div className="w-full h-full glass-card rounded-3xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto opacity-20 animate-pulse" />
                <p className="text-muted-foreground">3D Model Loading...</p>
                <p className="text-xs text-muted-foreground">
                  Spline integration will be added here
                </p>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-xl scale-110 -z-10" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;