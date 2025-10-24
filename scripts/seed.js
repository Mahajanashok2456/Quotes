import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { MongoClient } from 'mongodb'

dotenv.config({ path: '.env.local' })

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error('Please add your MongoDB URI to .env.local')
  process.exit(1)
}

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    const db = client.db();
    
    // Create admin user
    const adminCollection = db.collection('admins');
    const existingAdmin = await adminCollection.findOne({ email: 'admin@example.com' });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await adminCollection.insertOne({
        email: 'admin@example.com',
        password: hashedPassword,
        created_at: new Date(),
      });
    }
    
    // Create sample quotes
    const quotesCollection = db.collection('quotes');
    
    const sampleQuotes = [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        font_family: "Arial",
        font_color: "#000000",
        likes: 0,
        is_pinned: false,
        created_at: new Date(),
      },
      {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
        font_family: "Georgia",
        font_color: "#2D3748",
        likes: 0,
        is_pinned: false,
        created_at: new Date(),
      },
      {
        text: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs",
        font_family: "Verdana",
        font_color: "#4A5568",
        likes: 0,
        is_pinned: true,
        created_at: new Date(),
      }
    ];

    for (const quote of sampleQuotes) {
      const existingQuote = await quotesCollection.findOne({ text: quote.text });
      
      if (!existingQuote) {
        await quotesCollection.insertOne(quote);
      }
    }
    
  } catch (error) {
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase().catch(console.error);
