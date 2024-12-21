const companyService = require('../../services/companies/companyService');

// Get all companies
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await companyService.getAllCompanies();
        res.status(200).json(companies);
    } catch (error) {
        console.error('Error in getAllCompanies:', error);
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
};

// Get a company by ID
exports.getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await companyService.getCompanyById(id);
        res.status(200).json(company);
    } catch (error) {
        console.error('Error in getCompanyById:', error);
        res.status(500).json({ error: 'Failed to fetch company' });
    }
};

// Create a new company
exports.createCompany = async (req, res) => {
    try {
        const company = await companyService.createCompany(req.body);
        res.status(201).json({ message: 'Company created successfully', company });
    } catch (error) {
        console.error('Error in createCompany:', error);
        res.status(500).json({ error: 'Failed to create company' });
    }
};

// Update a company
exports.updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const company = await companyService.updateCompany(id, updates);
        res.status(200).json({ message: 'Company updated successfully', company });
    } catch (error) {
        console.error('Error in updateCompany:', error);
        res.status(500).json({ error: 'Failed to update company' });
    }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        await companyService.deleteCompany(id);
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error('Error in deleteCompany:', error);
        res.status(500).json({ error: 'Failed to delete company' });
    }
};
