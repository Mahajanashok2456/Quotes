import dotenv from 'dotenv';
import path from 'path';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('MONGODB_URI:', process.env.MONGODB_URI);

import mongoose from 'mongoose';

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');
    
    // Define a simple schema
    const userSchema = new mongoose.Schema({
      email: String,
      password: String
    });
    
    const User = mongoose.model('User', userSchema);
    
    // Try to find a user
    const users = await User.find({});
    console.log('Found users:', users.length);
    
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
}

testConnection();