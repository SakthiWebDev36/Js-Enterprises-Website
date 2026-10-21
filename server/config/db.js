import mongoose from 'mongoose';

let isConnecting = false;

const connectDB = async () => {
  if (isConnecting || mongoose.connection.readyState === 1) return;
  isConnecting = true;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnecting = false;
    console.log(`[MongoDB] Connected: ${conn.connection.host} → DB: ${conn.connection.name}`);
  } catch (err) {
    isConnecting = false;
    console.error(`[MongoDB] Connection notice: ${err.message}`);
    if (err.message.includes('Could not connect to any servers') || err.message.includes('whitelist')) {
      console.warn('  👉 IMPORTANT: Ensure your IP (or 0.0.0.0/0) is whitelisted in MongoDB Atlas Network Access:');
      console.warn('     https://cloud.mongodb.com -> Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0)');
    }
  }
};

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log('[MongoDB] Mongoose connected to database.');
});

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Disconnected. Will attempt reconnection...');
  setTimeout(connectDB, 8000);
});

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB Error]', err.message);
});

export default connectDB;
