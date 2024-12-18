const supabase = require('../config/supabaseClient');

const checkRole = (requiredRoles) => async (req, res, next) => {
  try {
    const userRole = req.user?.role_id;

    if (!userRole) {
      return res.status(403).json({ error: 'Role not assigned to user' });
    }

    const { data: roleData, error } = await supabase
      .from('Roles')
      .select('id, role_name')
      .eq('id', userRole)
      .single();

    if (error || !roleData || !requiredRoles.includes(roleData.role_name)) {
      return res.status(403).json({ error: 'Access denied for this role' });
    }

    next();
  } catch (err) {
    console.error('Role validation error:', err);
    res.status(500).json({ error: 'Failed to validate role' });
  }
};

module.exports = checkRole;
