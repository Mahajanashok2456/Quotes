import dotenv from 'dotenv';
import path from 'path';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import bcrypt from 'bcryptjs';

async function createAdmin() {
  try {
    const { default: connectToDatabase } = await import('../lib/mongodb.js');
    const { db } = await connectToDatabase();
    
    const adminCollection = db.collection('admins');
    const existingAdmin = await adminCollection.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await adminCollection.insertOne({
      email: 'admin@example.com',
      password: hashedPassword,
      created_at: new Date(),
    });
    
    console.log('Admin created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();