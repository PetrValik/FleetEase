import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
      const token = localStorage.getItem('token');
      
      const response = await axios.get(config.INSURANCES_ENDPOINT, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (Array.isArray(response.data)) {
        setInsurances(response.data);
      } else {
        console.error('Received non-array insurance data:', response.data);
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
      const token = localStorage.getItem('token');
      console.log('Fetching companies with token:', token); // debug log
      
      const response = await axios.get(config.INSURANCE_COMPANIES_ENDPOINT, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Companies response:', response.data); // debug log
      
      if (Array.isArray(response.data)) {
        setInsuranceCompanies(response.data);
      } else {
        console.error('Received non-array company data:', response.data);
        setInsuranceCompanies([]);
      }
    } catch (error) {
      console.error('Error fetching insurance companies:', error);
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
        const response = await axios.delete(`${config.API_BASE_URL}/insurances/${insuranceId}`);
        if (response.status === 200) {
          await fetchInsurances();
        }
      } catch (error) {
        console.error('Error deleting insurance:', error);
      }
    }
  };

  const handleSaveInsurance = async (insuranceData: Partial<Insurance>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const formattedData = {
        insurance_types: insuranceData.insurance_types,
        policy_number: insuranceData.policy_number,
        start_date: insuranceData.start_date,
        end_date: insuranceData.end_date,
        premium_amount: Number(insuranceData.premium_amount),
        payment_method: insuranceData.payment_method,
        insurance_status: insuranceData.insurance_status,
        insurance_company_id: Number(insuranceData.insurance_company_id),
        company_id: Number(insuranceData.insurance_company_id),
        description: insuranceData.description || ''
      };

      console.log('Sending data:', formattedData);

      const axiosConfig = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(config.INSURANCES_ENDPOINT, formattedData, axiosConfig);
      
      if (response.status === 201 || response.status === 200) {
        console.log('Insurance saved successfully:', response.data);
        setIsDialogOpen(false);
        await fetchInsurances();
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Server error:', error.response?.data);
        console.error('Status:', error.response?.status);
      } else {
        console.error('Error saving insurance:', error);
      }
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
                  className={`px-4 py-2 rounded ${activeTab === 'Vehicle' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveTab('Vehicle')}
                >
                  Vehicle
                </button>
                <button 
                  className={`px-4 py-2 rounded ${activeTab === 'Driver' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveTab('Driver')}
                >
                  Driver
                </button>
                <button 
                  className={`px-4 py-2 rounded ${activeTab === 'Liability' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveTab('Liability')}
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