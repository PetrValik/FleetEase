const supabase = require('../../config/supabaseClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getRoleById } = require('./roleService');

// Register a new user
exports.registerUser = async (user) => {
  const { email, password, first_name, last_name } = user;

  // Check if the user already exists
  const { data: existingUser, error: checkError } = await supabase
    .from('Users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('User already exists');
  }

  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError; // Handle unexpected errors
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user in the database with default role (3) and active status
  const { data, error } = await supabase.from('Users').insert({
    email,
    password_hash: hashedPassword,
    first_name,
    last_name,
    roles_id: 3, // Default role ID
    is_active: true, // Active by default
  });

  if (error) throw error; // Throw error if the insertion fails
  return data; // Return inserted data
};

// Log in an existing user
exports.loginUser = async (email, password) => {
  // Fetch the user based on the provided email
  const { data: user, error } = await supabase
    .from('Users')
    .select('user_id, email, password_hash, first_name, last_name, phone_number, roles_id, company_id')
    .eq('email', email)
    .single();

  if (!user || error) {
    throw new Error('Invalid email or password'); // If user not found
  }

  // Verify the password
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    throw new Error('Invalid email or password'); // Password does not match
  }

  // Retrieve role based on roles_id
  const role = await getRoleById(user.roles_id);

  // Generate JWT token for the user
  const token = jwt.sign(
    { user_id: user.user_id, email: user.email, role }, // Add role to the token payload
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token expires in 1 day
  );

  // Return the user data and token to the frontend
  return {
    token,
    user: {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      company_id: user.company_id,
      role, // User role
    },
  };
};

// Verify a user using JWT token
exports.verifyUser = async (token) => {
  try {
    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // Fetch the user from the database by `user_id`
    const { data: user, error } = await supabase
      .from("Users")
      .select(
        "user_id, email, first_name, last_name, phone_number, company_id, roles_id"
      )
      .eq("user_id", decoded.user_id)
      .single();

    if (!user || error) {
      throw new Error("User not found or invalid token");
    }

    // Retrieve role based on `roles_id`
    const role = await getRoleById(user.roles_id);

    // Create the user object for response
    const userResponse = {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      company_id: user.company_id,
      role,
    };

    return { user: userResponse };
  } catch (error) {
    console.error("Error verifying user:", error);
    throw new Error("Invalid token or user verification failed");
  }
};

// Get all users sorted by user_id
exports.getAllUsers = async () => {
  // Fetch all users with selected fields and sort by user_id
  const { data, error } = await supabase
    .from('Users')
    .select('user_id, email, phone_number, first_name, last_name, roles_id, company_id')
    .order('user_id', { ascending: true }); // Sort by user_id in ascending order

  if (error) throw error; // Throw error if fetching fails
  return data; // Return sorted list of users
};

// Get a single user by ID
exports.getUserById = async (id) => {
  // Fetch a user based on user ID
  const { data, error } = await supabase
    .from('Users')
    .select('user_id, email, first_name, last_name, roles_id, company_id')
    .eq('user_id', id)
    .single();

  if (error) throw error; // Throw error if fetching fails
  return data; // Return user data
};

// Update a user by ID
exports.updateUser = async (id, updatedFields) => {
  // If the password is included, hash it before updating
  if (updatedFields.password) {
    updatedFields.password_hash = await bcrypt.hash(updatedFields.password, 10);
    delete updatedFields.password; // Remove plain password from payload
  }

  const { data, error } = await supabase
    .from('Users')
    .update(updatedFields)
    .eq('user_id', id);

  if (error) throw error;
  return data;
};

// Delete a user by ID
exports.deleteUser = async (id) => {
  const { data, error } = await supabase
    .from('Users')
    .delete()
    .eq('user_id', id);

  if (error) throw error;
  return data;
};

// Check if an email exists in the database
exports.checkEmailExists = async (email) => {
  // Search for the email in the database
  const { data, error } = await supabase
    .from('Users')
    .select('email') // Fetch only the email field
    .eq('email', email)
    .single(); // Expect a single record

  if (error && error.code !== 'PGRST116') {
    throw error; // Handle unexpected errors except "no rows found"
  }

  return !!data; // Return true if email exists, otherwise false
};

// Get all users from a specific company, excluding a given user
exports.getAllUsersFromCompany = async (companyId, excludeUserId) => {
  const { data, error } = await supabase
    .from('Users')
    .select('user_id, email, first_name, last_name, roles_id, company_id')
    .eq('company_id', companyId)
    .neq('user_id', excludeUserId); // Exclude the current user

  if (error) {
    throw new Error('Failed to fetch users from the specified company');
  }

  return data;
};

// Get all users without a company
exports.getAllUsersWithoutCompany = async () => {
  const { data, error } = await supabase
    .from('Users')
    .select('user_id, email, first_name, last_name, roles_id, company_id')
    .is('company_id', null) // Fetch users where company_id is null
    .neq('roles_id', 1); // Exclude users with roles_id = 1 (Admin)

  if (error) {
    throw new Error('Failed to fetch users without a company');
  }

  return data;
};

// Handle Google Sign-In
exports.googleSign = async (firstName, lastName, email, localId, providerId) => {
  try {
    // Check if the user already exists in the UserAuthProviders table
    const { data: existingAuth, error: fetchError } = await supabase
      .from('UserAuthProviders')
      .select('id, user_id')
      .eq('provider_user_id', localId)
      .eq('auth_provider_name', providerId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error('Failed to fetch existing user from UserAuthProviders');
    }

    let userId;
    let user;

    if (existingAuth) {
      // If the user exists, fetch their details
      userId = existingAuth.user_id;

      if (!userId) {
        throw new Error('User ID is missing in the existingAuth record');
      }

      const { data: existingUser, error: userFetchError } = await supabase
        .from('Users')
        .select('user_id, email, first_name, last_name, phone_number, company_id, roles_id')
        .eq('user_id', userId)
        .single();

      if (userFetchError) {
        throw new Error('Failed to fetch user details');
      }

      user = existingUser;
    } else {
      // If the user does not exist, create a new record in Users
      const { data: newUser, error: createUserError } = await supabase
        .from('Users')
        .insert({
          email,
          first_name: firstName,
          last_name: lastName,
          roles_id: 3, // Default role
          is_active: true, // Active user
        })
        .select('user_id, email, first_name, last_name, phone_number, company_id, roles_id')
        .single();

      if (createUserError) {
        throw new Error('Failed to create new user');
      }

      user = newUser;

      // Link the user to the authentication provider
      const { error: authInsertError } = await supabase
        .from('UserAuthProviders')
        .insert({
          user_id: user.user_id,
          auth_provider_name: providerId,
          provider_user_id: localId,
        });

      if (authInsertError) {
        throw new Error('Failed to link user with authentication provider');
      }
    }

    // Fetch the user's role
    const role = await getRoleById(user.roles_id);

    // Generate a JWT token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Token expires in 24 hours
    );

    return {
      token,
      user: {
        user_id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        company_id: user.company_id,
        role,
      },
    };
  } catch (error) {
    console.error('Error in Google Sign-In:', error.message);
    throw new Error(error.message);
  }
};
