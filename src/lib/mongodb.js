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
  if (cached.conn) {
    // Ensure we return the correct structure even for cached connections
    return { 
      db: cached.conn.connection.db,
      mongoose: cached.conn 
    };
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
    cached.conn = await cached.promise;
    
    // 🛑 MOVE THE FINAL RETURN STATEMENT HERE (Only executed on SUCCESS)
    return { 
      db: cached.conn.connection.db, // Extracts the native database instance
      mongoose: cached.conn 
    };
    
  } catch (error) {
    // Executes only on FAILURE (e.g., bad auth, timeout)
    cached.promise = null; 
    throw error; // Re-throws the error, stopping execution cleanly
  }

  // DELETE the redundant code that used to be here!
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