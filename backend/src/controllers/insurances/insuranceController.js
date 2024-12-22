const insuranceService = require('../../services/insurances/insuranceService');

// Controller to fetch all insurances
exports.getAll = async (req, res) => {
  try {
    const insurances = await insuranceService.getAll();
    res.status(200).json(insurances);
  } catch (error) {
    console.error('Failed to fetch insurances:', error);
    res.status(500).json({ error: 'Failed to fetch insurances' });
  }
};

// Controller to fetch one insurance by ID
exports.getById = async (req, res) => {
  try {
    const insurance = await insuranceService.getById(req.params.id);
    res.status(200).json(insurance);
  } catch (error) {
    console.error('Failed to fetch insurance:', error);
    res.status(404).json({ error: error.message });
  }
};

// Controller to create a new insurance
exports.create = async (req, res) => {
  try {
    const insurance = await insuranceService.create(req.body);
    res.status(201).json({
      message: 'Insurance created successfully',
      insurance,
    });
  } catch (error) {
    console.error('Failed to create insurance:', error);
    res.status(400).json({ error: 'Failed to create insurance' });
  }
};

// Controller to update an insurance
exports.update = async (req, res) => {
  try {
    const updatedInsurance = await insuranceService.update(req.params.id, req.body);
    res.status(200).json({
      message: 'Insurance updated successfully',
      insurance: updatedInsurance,
    });
  } catch (error) {
    console.error('Failed to update insurance:', error);
    res.status(400).json({ error: 'Failed to update insurance' });
  }
};

// Controller to delete an insurance
exports.delete = async (req, res) => {
  try {
    await insuranceService.delete(req.params.id);
    res.status(200).json({ message: 'Insurance deleted successfully' });
  } catch (error) {
    console.error('Failed to delete insurance:', error);
    res.status(400).json({ error: 'Failed to delete insurance' });
  }
};

// Controller to fetch insurances by type and company ID
exports.getInsurancesByTypeAndCompany = async (req, res) => {
  try {
    const { type, company_id } = req.query;

    if (!type || !company_id) {
      return res.status(400).json({ error: 'Type and company_id are required' });
    }

    const insurances = await insuranceService.getInsurancesByTypeAndCompany(type, parseInt(company_id));
    res.json(insurances);
  } catch (error) {
    console.error('Error retrieving insurances:', error);
    res.status(500).json({ error: 'Failed to retrieve insurances' });
  }
};

// Controller to fetch insurances by company ID
exports.getInsurancesByCompany = async (req, res) => {
    try {
      const insurances = await insuranceService.getInsurancesByCompany(req.params.companyId);
      res.status(200).json(insurances); // Return the insurances array directly
    } catch (error) {
      console.error('Error in getInsurancesByCompany controller:', error);
      res.status(500).json({ error: 'Failed to fetch insurances' });
    }
  };
