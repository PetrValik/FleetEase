const insuranceService = require('../../services/insurances/insuranceService');

const insuranceController = {
  getAllInsurances: async (req, res) => {
    try {
      const insurances = await insuranceService.getAllInsurances();
      res.json(insurances);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getInsuranceById: async (req, res) => {
    try {
      const { id } = req.params;
      const insurance = await insuranceService.getInsuranceById(id);
      
      if (!insurance) {
        return res.status(404).json({ message: 'Insurance not found' });
      }
      
      res.json(insurance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createInsurance: async (req, res) => {
    console.log('Received insurance data:', req.body); // přidáme log
    try {
      const newInsurance = await insuranceService.createInsurance(req.body);
      res.status(201).json(newInsurance);
    } catch (error) {
      console.error('Error creating insurance:', error); // přidáme detailnější log
      res.status(400).json({ message: error.message });
    }
  },

  updateInsurance: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedInsurance = await insuranceService.updateInsurance(id, req.body);
      
      if (!updatedInsurance) {
        return res.status(404).json({ message: 'Insurance not found' });
      }
      
      res.json(updatedInsurance);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteInsurance: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await insuranceService.deleteInsurance(id);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Insurance not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getInsuranceCompanies: async (req, res) => {
    console.log('Getting insurance companies'); // debug log
    try {
      const companies = await insuranceService.getInsuranceCompanies();
      console.log('Companies found:', companies); // debug log
      res.json(companies);
    } catch (error) {
      console.error('Error getting companies:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = insuranceController;