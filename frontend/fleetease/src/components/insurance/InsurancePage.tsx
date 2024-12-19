import React, { useState, useEffect } from 'react';
import { config } from '../../config';
import { Insurance, InsuranceCompany } from './types';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import InsuranceDialog from './components/InsuranceDialog';
import InsuranceTable from './components/InsuranceTable';
import InsuranceStats from './components/InsuranceStats';

export default function InsurancePage() {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [insuranceCompanies, setInsuranceCompanies] = useState<InsuranceCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null);

  const fetchInsurances = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.API_BASE_URL}/insurances`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setInsurances(data);
      } else {
        console.error('Received non-array insurance data:', data);
        setInsurances([]);
      }
    } catch (error) {
      console.error('Error fetching insurances:', error);
      setInsurances([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      // Odstraníme /api z cesty, protože už je v API_BASE_URL
      const response = await fetch(`${config.API_BASE_URL}/insurances/companies`);
      const data = await response.json();
      console.log('Fetched companies:', data);
      if (Array.isArray(data)) {
        setInsuranceCompanies(data);
      } else {
        console.error('Received non-array company data:', data);
        setInsuranceCompanies([]);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setInsuranceCompanies([]);
    }
};

  useEffect(() => {
    fetchInsurances();
    fetchCompanies();
  }, []);

  const handleAddNew = () => {
    setSelectedInsurance(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (insurance: Insurance) => {
    setSelectedInsurance(insurance);
    setIsDialogOpen(true);
  };

  const handleDelete = async (insuranceId: number) => {
    if (window.confirm('Are you sure you want to delete this insurance?')) {
      try {
        const response = await fetch(`${config.API_BASE_URL}/insurances/${insuranceId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await fetchInsurances();
        }
      } catch (error) {
        console.error('Error deleting insurance:', error);
      }
    }
  };

  const handleSaveInsurance = async (insuranceData: Partial<Insurance>) => {
    try {
      console.log('Page - Starting save process:', insuranceData);
      
      const response = await fetch(`${config.API_BASE_URL}/insurances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insuranceData),
      });

      console.log('Page - Save response status:', response.status);
      
      if (response.ok) {
        console.log('Page - Save successful');
        setIsDialogOpen(false);
        await fetchInsurances();
      } else {
        const errorData = await response.text();
        console.error('Page - Failed to save insurance:', errorData);
        console.log('Full response:', response);
      }
    } catch (error) {
      console.error('Page - Error saving insurance:', error);
    }
};

  return (
    <div className="min-h-screen bg-[#edf2f7] p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Insurance overview</h1>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Insurance
          </button>
        </div>

        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button 
                  className={`px-4 py-2 rounded ${activeTab === 'vehicle' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveTab('vehicle')}
                >
                  Vehicle
                </button>
                <button 
                  className={`px-4 py-2 rounded ${activeTab === 'driver' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveTab('driver')}
                >
                  Driver
                </button>
                <button 
                  className={`px-4 py-2 rounded ${activeTab === 'liability' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveTab('liability')}
                >
                  Liability
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                  placeholder="Search insurance..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            <InsuranceTable
              insurances={insurances}
              searchTerm={searchTerm}
              activeTab={activeTab}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>
        </Card>

        <InsuranceStats insurances={insurances} />

        {isDialogOpen && (
          <InsuranceDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSave={handleSaveInsurance}
            insurance={selectedInsurance || undefined}
            insuranceCompanies={insuranceCompanies}
          />
        )}
      </div>
    </div>
  );
}