/**Hlavní komponenta pro správu pojištění.
 * Zajišťuje zobrazení, vytváření, úpravu a mazání pojištění.
 * Obsahuje filtrování podle typu pojištění a vyhledávání.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../../utils/apiClient';
import { config } from '../../config';
import { Insurance, InsuranceCompany } from './types';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import InsuranceDialog from './components/InsuranceDialog';
import InsuranceTable from './components/InsuranceTable';
import InsuranceStats from './components/InsuranceStats';

export default function InsurancePage() {
  // --- State Management ---
  const [insurances, setInsurances] = useState<Insurance[]>([]); // Seznam všech pojištění
  const [insuranceCompanies, setInsuranceCompanies] = useState<InsuranceCompany[]>([]); // Seznam pojišťoven
  const [loading, setLoading] = useState(true); // Indikátor načítání
  const [activeTab, setActiveTab] = useState('all'); // Aktivní záložka filtru
  const [searchTerm, setSearchTerm] = useState(''); // Vyhledávací výraz
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Stav dialogového okna
  const [selectedInsurance, setSelectedInsurance] = useState<Insurance | null>(null); // Vybrané pojištění pro editaci

  /**
   * Načte seznam všech pojištění z API
   * V případě chyby nastaví prázdné pole a zapíše chybu do konzole
   */
  const fetchInsurances = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(config.INSURANCES_ENDPOINT);
      
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

  /**
   * Načte seznam pojišťoven z API
   * Tato data jsou potřebná pro výběr pojišťovny v dialogu
   */
  const fetchCompanies = async () => {
    try {
      const response = await apiClient.get(config.INSURANCE_COMPANIES_ENDPOINT);
      
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

  // Načte data při prvním renderu
  useEffect(() => {
    fetchInsurances();
    fetchCompanies();
  }, []);

  // --- Event Handlers ---
  /**
   * Připraví dialog pro vytvoření nového pojištění
   * Vyčistí vybrané pojištění a otevře dialog
   */
  const handleAddNew = () => {
    setSelectedInsurance(null);
    setIsDialogOpen(true);
  };

  /**
   * Připraví dialog pro úpravu existujícího pojištění
   * @param insurance Pojištění k úpravě
   */
  const handleEdit = (insurance: Insurance) => {
    setSelectedInsurance(insurance);
    setIsDialogOpen(true);
  };

  /**
   * Smaže vybrané pojištění po potvrzení uživatelem
   * @param insuranceId ID pojištění ke smazání
   */
  const handleDelete = async (insuranceId: number) => {
    if (window.confirm('Are you sure you want to delete this insurance?')) {
      try {
        const response = await apiClient.delete(`${config.INSURANCES_ENDPOINT}/${insuranceId}`);
        if (response.status === 200) {
          await fetchInsurances();
        }
      } catch (error) {
        console.error('Error deleting insurance:', error);
      }
    }
  };

  /**
   * Zpracuje uložení nebo úpravu pojištění
   * Validuje data a odesílá je na server
   * @param insuranceData Data pojištění k uložení
   */
  const handleSaveInsurance = async (insuranceData: Partial<Insurance>) => {
    try {
      const DEFAULT_COMPANY_ID = 1; // ID vaší firmy s autoprovozem
  
      // Příprava dat pro uložení s výchozími hodnotami
      const formattedData = {
        insurance_types: insuranceData.insurance_types || 'Vehicle',
        registration_number: insuranceData.registration_number || null,
        start_date: insuranceData.start_date,
        end_date: insuranceData.end_date,
        name: insuranceData.name || null,
        payment_method: insuranceData.payment_method || 'Annual',
        insurance_status: insuranceData.insurance_status || 'Active',
        insurance_company_id: Number(insuranceData.insurance_company_id),
        company_id: DEFAULT_COMPANY_ID,
        description: insuranceData.description || null
      };

      // Rozhodnutí mezi vytvořením nového nebo aktualizací existujícího pojištění
      let response;
      if (insuranceData.insurance_id) {
        response = await apiClient.put(
          `${config.INSURANCES_ENDPOINT}/${insuranceData.insurance_id}`,
          formattedData
        );
      } else {
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
      if (error.response?.data) {
        console.error('Server error details:', error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#edf2f7] p-6">
      <div className="space-y-6">
        {/* Hlavička stránky */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Insurance overview</h1>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Insurance
          </button>
        </div>

        {/* Hlavní karta s filtry a tabulkou */}
        <Card>
          <div className="p-6">
            {/* Filtrovací tlačítka a vyhledávání */}
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
              
              {/* Vyhledávací pole */}
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

            {/* Tabulka pojištění */}
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
        </Card>

        {/* Statistiky pojištění */}
        <InsuranceStats insurances={insurances} />

        {/* Dialog pro vytvoření/úpravu pojištění */}
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