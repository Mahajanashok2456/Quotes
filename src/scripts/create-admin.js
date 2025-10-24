// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const connectToDatabase = require('../../lib/mongodb').default;

async function createAdmin() {
  try {
    const { db } = await connectToDatabase();
    
    const adminCollection = db.collection('admins');
    const existingAdmin = await adminCollection.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await adminCollection.insertOne({
      email: 'admin@example.com',
      password: hashedPassword,
      created_at: new Date(),
    });
    
    process.exit(0);
  } catch {
    process.exit(1);
  }
}

createAdmin();