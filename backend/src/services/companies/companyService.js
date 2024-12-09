const pool = require('../../config/supabaseClient');

// Získání jedné firmy podle ID
exports.getCompanyById = async (id) => {
  const query = 'SELECT * FROM "Companies" WHERE company_id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Získání všech firem
exports.getAllCompanies = async () => {
  const query = 'SELECT * FROM "Companies"';
  const result = await pool.query(query);
  return result.rows;
};
