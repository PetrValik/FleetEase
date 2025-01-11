import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';
import { config } from '../../config';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import InsuranceDialog from './components/InsuranceDialog';
import InsuranceTable from './components/InsuranceTable';
import InsuranceStats from './components/InsuranceStats';
import * as Database from '../../database/database';
import { useUser } from '../../contexts/UserContext';
import * as Toast from "../../utils/toastUtils";

export default function InsurancePage() {
  const [insurances, setInsurances] = useState<Database.Insurance[]>([]);
  const [insuranceCompanies, setInsuranceCompanies] = useState<Database.InsuranceCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState<Database.Insurance | null>(null);
  const { user } = useUser();

  const fetchInsurances = async () => {
    try {
      setLoading(true);
      if (user == null || user.company_id == null) {
        throw new Error();
      }
      const data = await Database.getInsurancesByCompany(user.company_id);
      setInsurances(data);
    } catch (error) {
      console.error('Error fetching insurances:', error);
      Toast.showErrorToast('Unable to fetch insurances');
      setInsurances([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await apiClient.get(config.INSURANCE_COMPANIES_ENDPOINT);

      if (Array.isArray(response.data)) {
        setInsuranceCompanies(response.data);
      } else {
        console.error('Received non-array company data:', response.data);
        Toast.showErrorToast('Unable to fetch insurance companies');
        setInsuranceCompanies([]);
      }
    } catch (error) {
      console.error('Error fetching insurance companies:', error);
      Toast.showErrorToast('Unable to fetch insurance companies');
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

  const handleEdit = (insurance: Database.Insurance) => {
    setSelectedInsurance(insurance);
    setIsDialogOpen(true);
  };

  const handleDelete = async (insuranceId: number) => {
    if (window.confirm('Are you sure you want to delete this insurance?')) {
      try {
        const response = await apiClient.delete(`${config.INSURANCES_ENDPOINT}/${insuranceId}`);
        if (response.status === 200) {
          await fetchInsurances();
          Toast.showInfoToast('Insurance succesfully deleted');
        }
      } catch (error) {
        console.error('Error deleting insurance:', error);
        Toast.showErrorToast('Error deleting insurance');
      }
    }
  };

  const handleSaveInsurance = async (insuranceData: Partial<Database.Insurance>) => {
    try {
      if (user == null || user.company_id == null) {
        throw new Error();
      }
      // Zajistíme, že máme všechna povinná pole
      const formattedData = {
        insurance_types: insuranceData.insurance_types || 'Vehicle',
        registration_number: insuranceData.registration_number || null,
        start_date: insuranceData.start_date,
        end_date: insuranceData.end_date,
        name: insuranceData.name || null,
        payment_method: insuranceData.payment_method || 'Annual',
        insurance_status: insuranceData.insurance_status || 'Active',
        insurance_company_id: Number(insuranceData.insurance_company_id),
        company_id: user.company_id,
        description: insuranceData.description || null
      };

      let response;
      if (insuranceData.insurance_id) {
        // Update
        response = await apiClient.put(
          `${config.INSURANCES_ENDPOINT}/${insuranceData.insurance_id}`,
          formattedData
        );
      } else {
        // Create
        response = await apiClient.post(
          config.INSURANCES_ENDPOINT,
          formattedData
        );
      }

      if (response.status === 200 || response.status === 201) {
        setIsDialogOpen(false);
        await fetchInsurances();
      }
    } catch (error: any) {
      console.error('Error saving insurance:', error);
      Toast.showErrorToast('Error saving insurance');
      if (error.response?.data) {
        console.error('Server error details:', error.response.data);
        Toast.showErrorToast('Error saving insurance');
      }
    }
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6">
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Insurance overview</h1>
          <button
            onClick={handleAddNew}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm md:text-base"
          >
            Add New Insurance
          </button>
        </div>

        <Card>
          <div className="p-1 md:p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2">
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'all'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'Vehicle'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => setActiveTab('Vehicle')}
                >
                  Vehicle
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'Driver'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => setActiveTab('Driver')}
                >
                  Driver
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'Liability'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => setActiveTab('Liability')}
                >
                  Liability
                </button>
              </div>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search insurance..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>
            </div>

            <div className="mt-4">
              <InsuranceTable
                insurances={insurances}
                searchTerm={searchTerm}
                activeTab={activeTab}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
                insuranceCompanies={insuranceCompanies}
              />
            </div>
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