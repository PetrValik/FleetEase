const supabase = require('../../config/supabaseClient');

const insuranceService = {
  getAllInsurances: async () => {
    const { data, error } = await supabase
      .from('Insurances')
      .select(`
        *,
        InsuranceCompanies (
          company_name
        )
      `);

    if (error) throw error;
    return data;
  },

  getInsuranceById: async (id) => {
    const { data, error } = await supabase
      .from('Insurances')
      .select(`
        *,
        InsuranceCompanies (
          company_name
        )
      `)
      .eq('insurance_id', id)
      .single();

    if (error) throw error;
    return data;
  },

  createInsurance: async (insuranceData) => {
    const { data, error } = await supabase
      .from('Insurances')
      .insert([insuranceData])
      .select();

    if (error) throw error;
    return data[0];
  },

  updateInsurance: async (id, insuranceData) => {
    const { data, error } = await supabase
      .from('Insurances')
      .update(insuranceData)
      .eq('insurance_id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  deleteInsurance: async (id) => {
    const { error } = await supabase
      .from('Insurances')
      .delete()
      .eq('insurance_id', id);

    if (error) throw error;
    return true;
  },

  getInsuranceCompanies: async () => {
    console.log('Calling Supabase for companies'); // debug log
    const { data, error } = await supabase
      .from('InsuranceCompanies')
      .select('*');
    
    console.log('Supabase response:', { data, error }); // debug log
  
    if (error) throw error;
    return data;
  }
};

module.exports = insuranceService;