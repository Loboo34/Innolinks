import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1920",
      alt: "Modern technology workspace",
      title: "Transform Your Digital Presence",
      description: "Expert web development and design services that turn your vision into reality. Create stunning, responsive websites that drive results.",
      cta: "Start Your Web Project"
    },
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920",
      alt: "Digital innovation concept",
      title: "Innovative Software Solutions",
      description: "Custom software development that streamlines your business operations. From enterprise applications to mobile apps, we build it all.",
      cta: "Explore Solutions"
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
      alt: "Software development",
      title: "Digital Marketing Excellence",
      description: "Boost your online presence with our comprehensive digital marketing strategies. SEO, social media, and content that drives growth.",
      cta: "Boost Your Growth"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`max-w-3xl transition-all duration-700 ${
                currentSlide === index
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-0 transform translate-y-4 absolute'
              }`}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                {slide.description}
              </p>
              <div className="flex gap-4">
                <button className="bg-[#0FFCBE] hover:bg-[#106EBE] text-gray-900 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 flex items-center group">
                  {slide.cta}
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-[#0FFCBE]' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;