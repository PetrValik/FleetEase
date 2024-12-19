import React from 'react';
import { Truck, Shield, Clock, BarChart, Users, PenToolIcon as Tool } from 'lucide-react';
import * as Database from '../../../database/database';


const Dashboard: React.FC = () => {
  const handleTestAPI = async () => {
    console.log('API Response get all insurances:', await Database.getAllInsurances());
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Here's an overview of your fleet management activities.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: Truck, title: "Total Vehicles", value: "24" },
          { icon: Shield, title: "Vehicles Due for Inspection", value: "3" },
          { icon: Clock, title: "Scheduled Maintenances", value: "7" },
          { icon: BarChart, title: "Fleet Efficiency", value: "92%" },
          { icon: Users, title: "Active Drivers", value: "18" },
          { icon: Tool, title: "Open Repair Tickets", value: "5" },
        ].map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center">
            <item.icon className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <p className="text-2xl font-bold text-indigo-600">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={handleTestAPI}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
        >
          Test API Call
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
