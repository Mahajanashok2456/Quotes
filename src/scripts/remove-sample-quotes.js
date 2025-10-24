import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import Quote from '../models/Quote.js';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// The sample quotes that were added by the seeding script
const sampleQuotes = [
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Your time is limited, so don't waste it living someone else's life."
];

async function removeSampleQuotes() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Removing sample quotes...');
    let removedCount = 0;

    for (const quoteText of sampleQuotes) {
      const result = await Quote.deleteOne({ text: quoteText });
      if (result.deletedCount > 0) {
        console.log(`Removed: "${quoteText}"`);
        removedCount += result.deletedCount;
      } else {
        console.log(`Not found: "${quoteText}"`);
      }
    }

    console.log(`\nRemoval complete! ${removedCount} sample quotes removed.`);

    // Show remaining quotes
    const remainingQuotes = await Quote.find({});
    console.log(`Remaining quotes in database: ${remainingQuotes.length}`);

    if (remainingQuotes.length > 0) {
      console.log('\nRemaining quotes:');
      remainingQuotes.forEach((quote, index) => {
        console.log(`  ${index + 1}. "${quote.text}" by ${quote.author}`);
      });
    }

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error removing sample quotes:', error);
    process.exit(1);
  }
}

removeSampleQuotes();