import React from 'react';
import { UserPlus, FileText, CreditCard, Package } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create an Account",
      description: "Sign up with us to gain access to your personalized dashboard.",
      color: "bg-blue-50"
    },
    {
      icon: FileText,
      title: "Submit Your Orders",
      description: "Once registered, you can post your orders in the system. You will receive a payment notification indicating the required amount, and you can negotiate pricing through the chat section.",
      color: "bg-green-50"
    },
    {
      icon: CreditCard,
      title: "Make a Payment",
      description: "A 50% deposit is required for all orders. Payments should be made only through our official website or designated accounts.",
      color: "bg-purple-50"
    },
    {
      icon: Package,
      title: "Receive Your Completed Order",
      description: "Once your order is finished, it will be delivered to you within the agreed timeframe.",
      color: "bg-orange-50"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-[#0FFCBE] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            A Simple Step-by-Step Guide to Getting Started
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 transform -translate-x-1/2">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#0FFCBE]"></div>
                </div>
              )}

              {/* Step Content */}
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className={`${step.color} p-6 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-[#106EBE]" />
                </div>

                {/* Step Number */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-8 h-8 bg-[#106EBE] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;