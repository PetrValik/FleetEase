const express = require('express');
require('dotenv').config(); // Načtení `.env`
const cors = require('cors');

const supabase = require('./config/supabaseClient');

// Import routerů
const roleRoutes = require('./routes/users/roleRoutes');
const authProviderRoutes = require('./routes/users/authProviderRoutes');
const userRoutes = require('./routes/users/userRoutes');
const userAuthProviderRoutes = require('./routes/users/userAuthProviderRoutes');
// Změnit tento řádek
const insuranceRoutes = require('./routes/insurances/insuranceRoutes'); // Správný import routes, ne controlleru

const app = express();

app.use(cors()); // Povolit všechny originy

const PORT = process.env.PORT || 3000; // Výchozí port, pokud není definován

// Middleware pro parsování JSON
app.use(express.json());

// Endpointy pro role
app.use('/api/roles', roleRoutes);

// Endpointy pro authProviders
app.use('/api/auth-providers', authProviderRoutes);

// Endpointy pro uživatele
app.use('/api/users', userRoutes);

// Endpointy pro UserAuthProviders
app.use('/api/user-auth-providers', userAuthProviderRoutes);

// Endpointy pro pojistky
app.use('/api/insurances', insuranceRoutes);  // Teď by mělo fungovat

// Endpoint pro test
app.get('/', (req, res) => {
    res.send('Supabase backend is working!');
});

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});