import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { hash } from 'bcryptjs';
import Quote from '../src/models/Quote.js';
import User from '../src/models/User.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Define new admin credentials
const NEW_ADMIN_EMAIL = 'mahajan@admin.com';
const NEW_ADMIN_PASSWORD = 'mahajanadmin';

/**
 * Script to completely wipe and re-seed the database
 * 
 * To run this script:
 * node scripts/resetAndSeed.js
 */

async function resetAndSeed() {
  try {
    // Connect to the database
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000
    });
    console.log('✅ Connected successfully!');

    // Wipe Data: Clear all quotes
    console.log('🗑️  Wipe Quotes...');
    const quoteResult = await Quote.deleteMany({});
    console.log(`✅ Deleted ${quoteResult.deletedCount} quotes`);

    // Wipe Users: Clear all existing users
    console.log('🗑️  Wipe Users...');
    const userResult = await User.deleteMany({});
    console.log(`✅ Deleted ${userResult.deletedCount} users`);

    // Hash New Password
    console.log('🔒 Hashing new admin password...');
    const hashedPassword = await hash(NEW_ADMIN_PASSWORD, 10);

    // Create New Admin
    console.log('👤 Creating new admin user...');
    const newAdmin = await User.create({
      email: NEW_ADMIN_EMAIL,
      password: hashedPassword
    });
    console.log(`✅ Admin Created: ${newAdmin.email} with ID: ${newAdmin._id}`);

    console.log('\n🎉 Database reset and seeding completed successfully!');
    console.log('\n📝 To run this script again, use: node scripts/resetAndSeed.js');

    await mongoose.connection.close();
    console.log('🔒 Connection closed');
  } catch (error) {
    console.error('❌ Error during reset and seed:', error);
    process.exit(1);
  }
}

// Run the script
resetAndSeed();