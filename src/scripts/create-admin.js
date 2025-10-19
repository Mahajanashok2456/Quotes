import dotenv from 'dotenv';
import path from 'path';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { connectToMongoose } from '../lib/mongodb.js';
import User from '../models/User.js';

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await connectToMongoose();
    
    // Check if admin user already exists
    const existingUser = await User.findOne({ email: 'admin@example.com' });
    
    if (existingUser) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Create admin user
    const adminUser = new User({
      email: 'admin@example.com',
      password: 'mahajanadmin'
    });
    
    await adminUser.save();
    
    console.log('Admin user created successfully');
    console.log('Email:', adminUser.email);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();