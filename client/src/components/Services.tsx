import React from 'react';
import { 
  Globe, 
  Code2, 
  Smartphone, 
  Palette, 
  Megaphone, 
  Headphones,
  ArrowRight 
} from 'lucide-react';

interface ServicesProps {
  onQuoteClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onQuoteClick }) => {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Custom, responsive websites that engage visitors and drive conversions. From corporate sites to e-commerce platforms, we build it all.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Code2,
      title: "Software Development",
      description: "Scalable, secure, and efficient software solutions tailored to your business needs. From enterprise applications to cloud solutions.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that provide seamless user experiences across all devices.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "User-centered design that combines aesthetics with functionality to create intuitive and engaging digital experiences.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Strategic digital marketing solutions that boost your online presence and drive sustainable business growth.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=1000"
    },
    {
      icon: Headphones,
      title: "IT Consultancy",
      description: "Expert guidance and strategic planning to help you leverage technology for maximum business impact.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-[#0FFCBE] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Comprehensive digital solutions to transform your business and drive growth in the modern world.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Service Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Service Content */}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <service.icon className="h-8 w-8 text-[#106EBE]" />
                  <h3 className="text-2xl font-bold text-gray-900 ml-3">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <button className="flex items-center text-[#106EBE] hover:text-[#0FFCBE] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <button 
            onClick={onQuoteClick}
            className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 inline-flex items-center group"
          >
            Get a Free Quote
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;