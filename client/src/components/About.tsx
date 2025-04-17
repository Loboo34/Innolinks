import React from 'react';
import { Check } from 'lucide-react';

const About = () => {
  const features = [
    {
      title: "Technical Excellence",
      description: "Industry-leading development practices with cutting-edge technologies for robust, scalable solutions"
    },
    {
      title: "Client-Centric Approach",
      description: "Deep collaboration and understanding of your business needs, ensuring solutions that truly matter"
    },
    {
      title: "Proven Track Record",
      description: "Consistent delivery of high-quality solutions with measurable business impact and client satisfaction"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Company Description - Left Side */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Who we are ?
            </h2>
            <div className="w-24 h-1 bg-[#0FFCBE] mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              At Innolink Softwares, we're more than just a technology company – we're your partner 
              in digital transformation. Our mission is to empower businesses with innovative 
              software solutions that drive growth and efficiency in today's digital landscape.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              With a perfect blend of technical expertise and creative thinking, we transform 
              complex challenges into elegant, user-friendly solutions that help businesses thrive 
              in an increasingly connected world.
            </p>
          </div>

          {/* Why Choose Us - Right Side */}
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Why Choose Innolink Softwares
            </h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-6 w-6 text-[#0FFCBE]" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;