import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Code, 
  Palette, 
  Rocket, 
  Lightning, 
  Brain,
  Database,
  DeviceMobile
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'HTML5', icon: Code, level: 95 },
    { name: 'CSS3', icon: Palette, level: 95 },
    { name: 'JavaScript', icon: Lightning, level: 90 },
    { name: 'React', icon: Globe, level: 92 },
    { name: 'GSAP', icon: Rocket, level: 88 },
    { name: 'Node.js', icon: Database, level: 85 },
    { name: 'TypeScript', icon: Brain, level: 87 },
    { name: 'Mobile Dev', icon: DeviceMobile, level: 80 }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image entrance animation
      gsap.fromTo(imageRef.current, 
        {
          opacity: 0,
          x: -100,
          scale: 0.8,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%"
          }
        }
      );

      // Content entrance animation
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
            trigger: contentRef.current,
            start: "top 80%"
          }
        }
      );

      // Skills animation with stagger
      gsap.fromTo(skillsRef.current?.children || [],
        {
          opacity: 0,
          y: 30,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%"
          }
        }
      );

      // Skill bars animation
      skills.forEach((skill, index) => {
        gsap.fromTo(`.skill-bar-${index}`,
          { width: '0%' },
          {
            width: `${skill.level}%`,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%"
            },
            delay: index * 0.1
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative max-w-md mx-auto">
              {/* Glow border */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-30 blur-xl scale-110" />
              
              {/* Image container */}
              <div className="relative glass-card rounded-full p-4 group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-secondary rounded-full flex items-center justify-center overflow-hidden">
                  {/* Placeholder for profile image */}
                  <div className="w-full h-full bg-gradient-primary opacity-20 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-foreground/20 rounded-full mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Profile Image</p>
                    </div>
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-full transition-all duration-300" />
              </div>

              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-cyan/20 rounded-full blur-sm float" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-neon-pink/20 rounded-full blur-sm float-delayed" />
              <div className="absolute top-1/2 -right-8 w-6 h-6 bg-accent/30 rounded-full blur-sm float" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Section title */}
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold text-gradient mb-4">
                About Me
              </h2>
              <div className="w-20 h-1 bg-gradient-primary rounded-full" />
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <p className="text-lg text-foreground/90 leading-relaxed">
                I'm a passionate web developer with over 5 years of experience crafting 
                digital experiences that blur the line between art and technology. My expertise 
                lies in creating immersive, interactive websites that push the boundaries of 
                what's possible on the web.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring the latest web technologies, 
                contributing to open-source projects, or experimenting with 3D graphics and animations. 
                I believe in creating not just websites, but digital experiences that leave a lasting impression.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gradient">50+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gradient">5+</div>
                <div className="text-sm text-muted-foreground">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gradient">20+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 lg:mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">
              Technical Skills
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div key={skill.name} className="glass-card p-6 rounded-xl group hover:scale-105 transition-all duration-300">
                  <div className="text-center space-y-4">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={32} className="text-primary-foreground" />
                    </div>
                    
                    {/* Skill name */}
                    <h4 className="font-semibold text-foreground">{skill.name}</h4>
                    
                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Proficiency</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div 
                          className={`skill-bar-${index} bg-gradient-primary h-2 rounded-full transition-all duration-300`}
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;