import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { MongoClient } from 'mongodb'

dotenv.config({ path: '.env.local' })

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error('Please add your MongoDB URI to .env.local')
  process.exit(1)
}

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
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
    
    console.log('Database seeding completed successfully!');
    console.log('Note: No sample quotes were added. Please import your existing quotes.');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase().catch(console.error);