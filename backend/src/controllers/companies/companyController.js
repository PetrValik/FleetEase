const companyService = require('../../services/companies/companyService');

// GET jedna firma podle ID
exports.getCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await companyService.getCompanyById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET všechny firmy
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
