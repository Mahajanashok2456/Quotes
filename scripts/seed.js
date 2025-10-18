require('dotenv').config({ path: '.env.local' })
const bcrypt = require('bcryptjs')
const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error('Please add your MongoDB URI to .env.local')
  process.exit(1)
}

async function seedDatabase() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db()

    console.log('Connected to MongoDB')

    // Create admin user
    const adminCollection = db.collection('admins')
    const existingAdmin = await adminCollection.findOne({ email: 'admin@example.com' })

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 12)

      await adminCollection.insertOne({
        email: 'admin@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      console.log('✅ Created admin user: admin@example.com / admin123')
    } else {
      console.log('ℹ️  Admin user already exists')
    }

    // Create sample quotes
    const quotesCollection = db.collection('quotes')

    const sampleQuotes = [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        fontFamily: "Playfair Display",
        color: "#fbbf24",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
        fontFamily: "Montserrat",
        color: "#f59e0b",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
        fontFamily: "Lora",
        color: "#10b981",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        fontFamily: "Playfair Display",
        color: "#ec4899",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        fontFamily: "Roboto",
        color: "#8b5cf6",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
        fontFamily: "Open Sans",
        color: "#06b6d4",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    // Insert sample quotes if they don't exist
    for (const quote of sampleQuotes) {
      const existingQuote = await quotesCollection.findOne({
        text: quote.text,
        author: quote.author
      })

      if (!existingQuote) {
        await quotesCollection.insertOne(quote)
        console.log(`✅ Added quote: "${quote.text.substring(0, 50)}..."`)
      } else {
        console.log(`ℹ️  Quote already exists: "${quote.text.substring(0, 50)}..."`)
      }
    }

    console.log('\n🎉 Database seeded successfully!')
    console.log('\n📋 Admin Credentials:')
    console.log('   Email: admin@example.com')
    console.log('   Password: admin123')
    console.log('\n🚀 You can now start the application with: npm run dev')

  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

seedDatabase()