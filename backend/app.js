const express = require('express');
require('dotenv').config(); // Načtení `.env`
const cors = require('cors');
const supabase = require('./src/config/supabaseClient');
const path = require('path');

// Routes import
const roleRoutes = require('./src/routes/users/roleRoutes');
const authProviderRoutes = require('./src/routes/users/authProviderRoutes');
const userRoutes = require('./src/routes/users/userRoutes');
const userAuthProviderRoutes = require('./src/routes/users/userAuthProviderRoutes');
const companyRoutes = require('./src/routes/companies/companyRoutes')
const defectTypeRoutes = require('./src/routes/defects/defectTypeRoutes');
const defectRoutes = require('./src/routes/defects/defectRoutes');
const insuranceCompanyRoutes = require('./src/routes/insurances/insuranceCompanyRoutes');
const insuranceRoutes = require('./src/routes/insurances/insuranceRoutes');
const reservationRoutes = require('./src/routes/reservations/reservationRoutes');
const countryRoutes = require('./src/routes/vehicles/countryRoutes');
const vehicleBrandRoutes = require('./src/routes/vehicles/vehicleBrandRoutes');
const vehicleModelRoutes = require('./src/routes/vehicles/vehicleModelRoutes');
const vehicleCategoryRoutes = require('./src/routes/vehicles/vehicleCategoryRoutes');
const vehicleInspectionRoutes = require('./src/routes/vehicles/vehicleInspectionRoutes');
const vehicleRoutes = require('./src/routes/vehicles/vehicleRoutes');
auditLogsRoutes = require('./src/routes/auditLog/auditLogRoutes')

const app = express();
app.use(cors()); // all origins allowed

const PORT = process.env.PORT || 8080; // default port
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Middleware for json 
app.use(express.json());

// Comment for classic backend to frontend functionality
// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

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

// Comment for classic backend to frontend functionality
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  
// Server start
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    // console.log(`Server running on http://localhost:${PORT}`); uncomment it for easier url to your sollution
});
