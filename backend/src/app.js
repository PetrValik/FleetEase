const express = require('express');
require('dotenv').config(); // Načtení `.env`
const cors = require('cors');
const supabase = require('./config/supabaseClient');

// Routes import
const roleRoutes = require('./routes/users/roleRoutes');
const authProviderRoutes = require('./routes/users/authProviderRoutes');
const userRoutes = require('./routes/users/userRoutes');
const userAuthProviderRoutes = require('./routes/users/userAuthProviderRoutes');
const companyRoutes = require('./routes/companies/companyRoutes')
const defectTypeRoutes = require('./routes/defects/defectTypeRoutes');
const defectRoutes = require('./routes/defects/defectRoutes');
const insuranceCompanyRoutes = require('./routes/insurances/insuranceCompanyRoutes');
const insuranceRoutes = require('./routes/insurances/insuranceRoutes');
const reservationRoutes = require('./routes/reservations/reservationRoutes');
const countryRoutes = require('./routes/vehicles/countryRoutes');
const vehicleBrandRoutes = require('./routes/vehicles/vehicleBrandRoutes');
const vehicleModelRoutes = require('./routes/vehicles/vehicleModelRoutes');
const vehicleCategoryRoutes = require('./routes/vehicles/vehicleCategoryRoutes');
const vehicleInspectionRoutes = require('./routes/vehicles/vehicleInspectionRoutes');
const vehicleRoutes = require('./routes/vehicles/vehicleRoutes');
auditLogsRoutes = require('./routes/auditLog/auditLogRoutes')

const app = express();

app.use(cors()); // all origins allowed

const PORT = process.env.PORT || 3000; // default port
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Middleware for json 
app.use(express.json());
app.use(express.static('../frontend/fleetease/build'))

// Add role routes
app.use('/api/roles', roleRoutes);

// Add authProviders routes
app.use('/api/auth-providers', authProviderRoutes);

// Add user routes
app.use('/api/users', userRoutes);

// Add UserAuthProviders routes
app.use('/api/user-auth-providers', userAuthProviderRoutes);

// Add company routes
app.use('/api/companies', companyRoutes);

// Add defect type routes
app.use('/api/defect-types', defectTypeRoutes);

// Add defect routes
app.use('/api/defects', defectRoutes);

// Add insurance companies routes
app.use('/api/insurance-companies', insuranceCompanyRoutes);

// Add insurances routes
app.use('/api/insurances', insuranceRoutes);

// Add reservations routes
app.use('/api/reservations', reservationRoutes);

// Add countries routes
app.use('/api/countries', countryRoutes);

// Add vehicle brands routes
app.use('/api/vehicle-brands', vehicleBrandRoutes);

// Add vehicle models routes
app.use('/api/vehicle-models', vehicleModelRoutes);

// Add vehicle categories routes
app.use('/api/vehicle-categories', vehicleCategoryRoutes);

// Add vehicle inspections routes
app.use('/api/vehicle-inspections', vehicleInspectionRoutes);

// Add vehicless routes
app.use('/api/vehicles', vehicleRoutes);

// Add auditLogs routes
app.use('/api/logs', auditLogsRoutes);

// Server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
