import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

// Load environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = 'quotes_app';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null, mongoose: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGODB_URI).then((client) => {
      return {
        client,
        db: client.db(DATABASE_NAME),
      };
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

async function connectToMongoose() {
  if (cached.mongoose && cached.mongoose.connection.readyState === 1) {
    return cached.mongoose;
  }

  try {
    const opts = {
      bufferCommands: false,
    };

    await mongoose.connect(MONGODB_URI, opts);
    cached.mongoose = mongoose;
    return cached.mongoose;
  } catch (error) {
    throw error;
  }
}

export { connectToMongoose };
export default connectToDatabase;