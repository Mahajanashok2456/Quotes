import dotenv from 'dotenv';
import path from 'path';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('MONGODB_URI:', process.env.MONGODB_URI);

import mongoose from 'mongoose';
import Quote from '../models/Quote.js';

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');
    
    // Test the Quote model specifically
    console.log('Testing Quote model...');
    const quotes = await Quote.find({});
    console.log(`Found ${quotes.length} quotes using Mongoose model`);
    
    // Display all quotes with full details
    quotes.forEach((quote, index) => {
      console.log(`\nQuote ${index + 1}:`);
      console.log(`  ID: ${quote._id}`);
      console.log(`  Text: ${quote.text}`);
      console.log(`  Author: ${quote.author}`);
      console.log(`  Font Family: ${quote.font_family}`);
      console.log(`  Font Color: ${quote.font_color}`);
      console.log(`  Likes: ${quote.likes}`);
      console.log(`  Is Pinned: ${quote.is_pinned}`);
      console.log(`  Created At: ${quote.created_at}`);
    });
    
    await mongoose.connection.close();
    console.log('\nConnection closed');
  } catch (error) {
    console.error('Error:', error);
  }
}

testConnection();