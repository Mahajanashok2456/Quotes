import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import Quote from '../models/Quote.js';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function importQuotesFromFile(filePath) {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      console.log('Please create a JSON file with your quotes in this format:');
      console.log(`
[
  {
    "text": "Your quote text here",
    "author": "Author name",
    "font_family": "Arial",
    "font_color": "#000000",
    "likes": 0,
    "is_pinned": false
  }
]
      `);
      process.exit(1);
    }

    // Read and parse the JSON file
    const rawData = fs.readFileSync(filePath, 'utf8');
    const quotesData = JSON.parse(rawData);

    console.log(`Found ${quotesData.length} quotes in file`);

    let importedCount = 0;
    for (const quoteData of quotesData) {
      // Validate required fields
      if (!quoteData.text || !quoteData.author) {
        console.log(`Skipping invalid quote: ${JSON.stringify(quoteData)}`);
        continue;
      }

      // Check if quote already exists (based on text and author)
      const existingQuote = await Quote.findOne({ 
        text: quoteData.text, 
        author: quoteData.author 
      });
      
      if (!existingQuote) {
        const quote = new Quote({
          ...quoteData,
          created_at: quoteData.created_at ? new Date(quoteData.created_at) : new Date()
        });
        
        await quote.save();
        console.log(`Imported: "${quote.text}" by ${quote.author}`);
        importedCount++;
      } else {
        console.log(`Skipped (already exists): "${quoteData.text}" by ${quoteData.author}`);
      }
    }
    
    console.log(`\nImport complete! ${importedCount} new quotes imported.`);
    
    // Show total count
    const totalQuotes = await Quote.countDocuments();
    console.log(`Total quotes in database: ${totalQuotes}`);
    
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error importing quotes:', error);
    process.exit(1);
  }
}

// Check if file path is provided as command line argument
const filePath = process.argv[2];

if (!filePath) {
  console.log('Usage: node src/scripts/import-quotes.js <path-to-quotes.json>');
  console.log('Example: node src/scripts/import-quotes.js ./my-quotes.json');
  process.exit(1);
}

importQuotesFromFile(filePath);