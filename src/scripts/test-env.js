import dotenv from 'dotenv';
import path from 'path';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('All env vars:', Object.keys(process.env));