import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, Globe } from 'phosphor-react';

// Import project images
import project1 from '../assets/project-1.jpg';
import project2 from '../assets/project-2.jpg';
import project3 from '../assets/project-3.jpg';
import project4 from '../assets/project-4.jpg';
import project5 from '../assets/project-5.jpg';
import project6 from '../assets/project-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "NeuraLink Interface",
      description: "A futuristic brain-computer interface dashboard with real-time neural activity visualization.",
      image: project1,
      tech: ["React", "GSAP", "WebGL", "D3.js"],
      github: "#",
      live: "#"
    },
    {
      id: 2,
      title: "CyberSpace Portfolio",
      description: "An immersive 3D portfolio experience featuring interactive particle systems and spatial navigation.",
      image: project2,
      tech: ["Three.js", "React", "TypeScript", "Spline"],
      github: "#",
      live: "#"
    },
    {
      id: 3,
      title: "Quantum Dashboard",
      description: "Real-time quantum computing visualization with advanced data analytics and predictive modeling.",
      image: project3,
      tech: ["Next.js", "WebGL", "Python", "TensorFlow"],
      github: "#",
      live: "#"
    },
    {
      id: 4,
      title: "Metaverse Hub",
      description: "A virtual reality social platform with customizable avatars and immersive environments.",
      image: project4,
      tech: ["Vue.js", "A-Frame", "WebXR", "Socket.io"],
      github: "#",
      live: "#"
    },
    {
      id: 5,
      title: "AI Creative Studio",
      description: "Machine learning-powered design tool for generating unique visual assets and animations.",
      image: project5,
      tech: ["React", "TensorFlow.js", "Canvas API", "Python"],
      github: "#",
      live: "#"
    },
    {
      id: 6,
      title: "Blockchain Explorer",
      description: "Advanced cryptocurrency portfolio tracker with DeFi integration and market analytics.",
      image: project6,
      tech: ["React", "Web3.js", "Solidity", "Chart.js"],
      github: "#",
      live: "#"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 60,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%"
          }
        }
      );

      // Projects stagger animation
      gsap.fromTo(projectsRef.current?.children || [],
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
          filter: 'blur(5px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 85%"
          }
        }
      );

      // Horizontal scroll setup for desktop
      if (window.innerWidth > 1024) {
        const projectCards = gsap.utils.toArray('.project-card');
        const totalWidth = projectCards.length * 400; // Approximate card width
        
        gsap.to(projectCards, {
          xPercent: -100 * (projectCards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: projectsRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (projectCards.length - 1),
            end: () => `+=${totalWidth}`
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Exploring the intersection of creativity and technology through immersive digital experiences
          </p>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mt-6" />
        </div>

        {/* Projects Grid/Scroll */}
        <div 
          ref={projectsRef}
          className="flex lg:flex-row flex-col gap-8 lg:gap-12 overflow-x-auto lg:overflow-visible hide-scrollbar"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card flex-shrink-0 w-full lg:w-96 group"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full hover:scale-105 transition-all duration-500 cursor-pointer">
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-all duration-300" />
                  
                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={project.github}
                      className="p-3 glass-card rounded-full hover:scale-110 transition-transform"
                    >
                      <GithubLogo size={20} className="text-foreground" />
                    </a>
                    <a
                      href={project.live}
                      className="p-3 glass-card rounded-full hover:scale-110 transition-transform"
                    >
                      <Globe size={20} className="text-foreground" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-6">
                  {/* Title and Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground/80">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Project */}
                  <div className="pt-4">
                    <a
                      href={project.live}
                      className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow transition-colors group/link"
                    >
                      <span className="font-medium">View Project</span>
                      <ArrowUpRight 
                        size={16} 
                        className="transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" 
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint for mobile */}
        <div className="lg:hidden flex justify-center mt-8">
          <div className="flex items-center space-x-2 text-muted-foreground text-sm">
            <span>Swipe to explore more projects</span>
            <div className="w-8 h-1 bg-primary/30 rounded-full">
              <div className="w-3 h-1 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;