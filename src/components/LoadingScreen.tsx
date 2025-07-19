import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set([logoRef.current, progressBarRef.current, percentRef.current], {
      opacity: 0,
      y: 30
    });

    // Entrance animation
    tl.to([logoRef.current, progressBarRef.current, percentRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    })
    // Progress bar animation with counter
    .to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        if (percentRef.current) {
          const progress = Math.round(this.progress() * 100);
          percentRef.current.textContent = `${progress}%`;
        }
      }
    })
    // Logo pulse during loading
    .to(logoRef.current, {
      scale: 1.05,
      duration: 1,
      repeat: 2,
      yoyo: true,
      ease: "power1.inOut"
    }, "<")
    // Exit animation
    .to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl float" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-neon-cyan/20 rounded-full blur-2xl float" />
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo/Name */}
        <div
          ref={logoRef}
          className="text-6xl md:text-8xl font-bold text-gradient tracking-tight"
        >
          KUSHAL
        </div>

        {/* Progress container */}
        <div className="w-80 max-w-sm">
          <div className="glass-card rounded-full p-1 mb-4">
            <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute left-0 top-0 h-full bg-gradient-primary rounded-full shadow-glow"
                style={{ width: '0%' }}
              />
            </div>
          </div>
          
          {/* Percentage */}
          <div className="text-center">
            <span
              ref={percentRef}
              className="text-2xl font-medium text-foreground/80"
            >
              0%
            </span>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-muted-foreground text-sm tracking-widest uppercase">
          Loading Experience
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;