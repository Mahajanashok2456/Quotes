import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

// Load environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = 'quotes_app';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Use global variable to maintain a cached connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // Only check cached connection and proceed to main logic if not valid
  if (cached.conn && cached.conn.connection.readyState === 1 && cached.conn.connection.db) {
    // Cached connection is valid, proceed to return it from main try-catch
  } else {
    // Reset cached connection if invalid
    cached.conn = null;
  }

  if (!cached.promise) {
    // Define connection options WITH the increased timeout
    const opts = {
      bufferCommands: false, // Recommended for modern Mongoose
      serverSelectionTimeoutMS: 30000 // <-- ENSURE THIS IS SET TO 30 SECONDS
    };

    // Make the connection using the URI and options
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connected successfully with extended timeout."); // Add log
      return mongoose;
    }).catch(err => {
      console.error("MongoDB connection error:", err); // Log connection errors
      cached.promise = null; // Reset promise on error
      throw err; // Re-throw error to indicate failure
    });
  }
  
  try {
    // If we don't have a valid cached connection, establish one
    if (!cached.conn) {
      cached.conn = await cached.promise;
    }

    // Ensure the database object is available
    if (!cached.conn.connection.db) {
      throw new Error('Database connection not fully established');
    }

    // 🛑 FINAL RETURN STATEMENT - ONLY EXECUTED ON SUCCESS
    return {
      db: cached.conn.connection.db, // Extracts the native database instance
      mongoose: cached.conn
    };

  } catch (error) {
    // Executes only on FAILURE
    cached.promise = null;
    cached.conn = null; // Also reset the connection on failure
    throw error; // Re-throws the error, stopping execution cleanly
  }
}

// Unused function - keeping for backward compatibility
async function connectToMongoose() {
  if (cached.mongoose && cached.mongoose.connection.readyState === 1) {
    return cached.mongoose;
  }

  try {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
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