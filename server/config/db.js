import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host} → DB: ${conn.connection.name}`);
  } catch (err) {
    console.error(`[MongoDB] Connection failed: ${err.message}`);
    process.exit(1);
  }
};

// Log connection events
mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Disconnected. Attempting reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('[MongoDB] Reconnected successfully.');
});

export default connectDB;
