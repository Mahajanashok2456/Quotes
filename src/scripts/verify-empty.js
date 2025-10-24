import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import Quote from '../models/Quote.js';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function verifyEmpty() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    const quotes = await Quote.find({});
    console.log(`Number of quotes in database: ${quotes.length}`);

    if (quotes.length === 0) {
      console.log('Database is empty - ready for your existing quotes!');
    } else {
      console.log('Database contains quotes:');
      quotes.forEach((quote, index) => {
        console.log(`  ${index + 1}. "${quote.text}" by ${quote.author}`);
      });
    }

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
}

verifyEmpty();