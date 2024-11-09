const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in your .env file"
  );
}

// Global cached variable for MongoDB connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log("Connected to MongoDB");
      return mongoose;
    }).catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = dbConnect;
