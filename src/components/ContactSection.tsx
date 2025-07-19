import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, LinkedinLogo, GithubLogo, TwitterLogo, Envelope } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: GithubLogo, 
      url: 'https://github.com', 
      color: 'hover:text-primary' 
    },
    { 
      name: 'LinkedIn', 
      icon: LinkedinLogo, 
      url: 'https://linkedin.com', 
      color: 'hover:text-primary' 
    },
    { 
      name: 'Twitter', 
      icon: TwitterLogo, 
      url: 'https://twitter.com', 
      color: 'hover:text-accent' 
    },
    { 
      name: 'Email', 
      icon: Envelope, 
      url: 'mailto:kushal@example.com', 
      color: 'hover:text-neon-cyan' 
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

      // Form inputs animation
      gsap.fromTo(formRef.current?.children || [],
        {
          opacity: 0,
          x: -60,
          filter: 'blur(5px)'
        },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%"
          }
        }
      );

      // Social icons animation
      gsap.fromTo(socialsRef.current?.children || [],
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialsRef.current,
            start: "top 90%"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    // Success animation
    gsap.to('.submit-btn', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's create something amazing together.
          </p>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Send a Message</h3>
              <p className="text-muted-foreground">
                Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can work together.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-glass"
                  placeholder="Your full name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-glass"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="input-glass resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn btn-neon w-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center space-x-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <PaperPlaneTilt 
                        size={20} 
                        className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                      />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-12">
            {/* Contact Info */}
            <div className="glass-card p-8 rounded-2xl space-y-8">
              <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground/90 mb-2">Response Time</h4>
                  <p className="text-muted-foreground">Usually within 24 hours</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground/90 mb-2">Availability</h4>
                  <p className="text-muted-foreground">Open to new projects and collaborations</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground/90 mb-2">Location</h4>
                  <p className="text-muted-foreground">Available worldwide (Remote)</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Follow Me</h3>
              
              <div ref={socialsRef} className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group glass-card p-4 rounded-full hover:scale-110 transition-all duration-300 ${social.color}`}
                    >
                      <IconComponent size={24} className="transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Stay updated with my latest work and insights
              </p>
            </div>

            {/* Call to Action */}
            <div className="glass-card p-6 rounded-2xl bg-gradient-primary/10 border-primary/20">
              <div className="text-center space-y-4">
                <h4 className="text-lg font-bold text-gradient">Ready to Start?</h4>
                <p className="text-sm text-muted-foreground">
                  Let's discuss your project and bring your vision to life
                </p>
                <a
                  href="mailto:kushal@example.com"
                  className="inline-block btn-glass"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;