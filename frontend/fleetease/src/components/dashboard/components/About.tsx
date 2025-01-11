import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, Clock, BarChart, Users, PenTool } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    { icon: Truck, title: "Fleet Overview", description: "Get a comprehensive view of your entire fleet at a glance." },
    { icon: Shield, title: "Compliance Tracking", description: "Stay on top of vehicle inspections and regulatory requirements." },
    { icon: Clock, title: "Maintenance Scheduling", description: "Plan and track regular maintenance to prevent breakdowns." },
    { icon: BarChart, title: "Performance Analytics", description: "Gain insights into your fleet's performance and efficiency." },
    { icon: Users, title: "User Management", description: "Assign roles and permissions to your team members." },
    { icon: PenTool, title: "Repair Management", description: "Log and track repairs to keep your vehicles in top condition." },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-800 mb-6 sm:mb-8">
          FleetEase: Simplifying Vehicle Fleet Management
        </h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 mb-6 sm:mb-8">
          <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
            FleetEase is a comprehensive web application designed to streamline vehicle management for both individuals and organizations. Whether you're managing a single car or an entire fleet, our platform simplifies the process of tracking maintenance, inspections, and repairs.
          </p>
          <p className="text-base sm:text-lg text-gray-700">
            Our goal is to provide a user-friendly solution that saves time, improves vehicle safety, and minimizes operational disruptions. With FleetEase, you can ensure vehicle reliability, reduce unexpected breakdowns, and stay compliant with all necessary inspections and repairs.
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-indigo-700 mb-6">
          Key Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex items-start">
              <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mr-3 sm:mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-lg sm:text-xl text-indigo-800 font-semibold mb-3 sm:mb-4">
            Ready to simplify your fleet management?
          </p>
          <Link 
            to="/signup"
            className="inline-block bg-indigo-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Sign Up for FleetEase
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

