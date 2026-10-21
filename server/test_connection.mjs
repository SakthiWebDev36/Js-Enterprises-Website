import mongoose from 'mongoose';

const uri = 'mongodb+srv://ritlizoon_db_user:jsenterprises_123@js-enterprises.pxk3lcg.mongodb.net/js_enterprises?retryWrites=true&w=majority';

console.log('Testing MongoDB Atlas connection...');

try {
  const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log('✅ SUCCESS! Connected to:', conn.connection.host);
  console.log('   Database:', conn.connection.name);
  await mongoose.disconnect();
  console.log('   Disconnected cleanly.');
  process.exit(0);
} catch (err) {
  console.error('❌ FAILED:', err.message);
  process.exit(1);
}
