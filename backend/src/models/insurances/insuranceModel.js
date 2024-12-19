module.exports = {
    tableName: 'Insurances',
    fields: {
        id: 'insurance_id', // Primary key
        insuranceType: 'insurance_types', // Enum: Driver, Vehicle, Liability
        registrationNumber: 'registration_number', // Optional field, nullable
        startDate: 'start_date', // Required: Start date of the insurance
        endDate: 'end_date', // Required: End date of the insurance
        name: 'name', // Optional: Insurance name, nullable
        paymentMethod: 'payment_method', // Enum: Monthly, Quarterly, Yearly, One-Time
        insuranceCompanyId: 'insurance_company_id', // Required: FK to insurance companies
        insuranceStatus: 'insurance_status', // Enum: Active, Pending, Expired, Cancelled
        companyId: 'company_id', // Required: FK to company
        description: 'description', // Optional: Additional description, nullable
    },
};
