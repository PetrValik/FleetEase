const supabase = require("../../src/database/supabase");

(async () => {
  try {
    const { data, error } = await supabase.from("Countries").select("*");
    if (error) {
      throw error;
    }
    console.log("Countries:", data);
  } catch (error) {
    console.error("Error fetching countries:", error.message);
  }
})();
