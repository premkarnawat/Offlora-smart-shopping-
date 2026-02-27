// Run this script locally to generate a bcrypt hash to copy-paste into Supabase SQL Editor
const bcrypt = require('bcryptjs');

const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    console.log(`\nPassword: ${password}`);
    console.log(`Bcrypt Hash: ${hash}\n`);

    console.log('Copy and run this SQL in your Supabase SQL Editor:');
    console.log(`INSERT INTO public."Admin" (email, "passwordHash", role) VALUES ('offlora.contact@gmail.com', '${hash}', 'SUPER_ADMIN');`);
};

// Generate a secure hash for "admin123" (Or change this to whatever password you want to use)
generateHash('admin123');
