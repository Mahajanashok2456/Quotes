import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import Quote from '../models/Quote.js';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function exportQuotesToFile(filePath) {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    // Fetch all quotes
    const quotes = await Quote.find({});
    console.log(`Found ${quotes.length} quotes in database`);

    // Transform quotes to plain objects
    const quotesData = quotes.map(quote => ({
      text: quote.text,
      author: quote.author,
      font_family: quote.font_family,
      font_color: quote.font_color,
      likes: quote.likes,
      is_pinned: quote.is_pinned,
      created_at: quote.created_at
    }));

    // Write to file
    fs.writeFileSync(filePath, JSON.stringify(quotesData, null, 2));
    console.log(`Quotes exported to ${filePath}`);

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error exporting quotes:', error);
    process.exit(1);
  }
}

// Check if file path is provided as command line argument
const filePath = process.argv[2] || 'exported-quotes.json';

exportQuotesToFile(filePath);