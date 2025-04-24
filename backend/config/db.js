import mongoose from "mongoose";

async function ConnectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`DB connection error: ${error.message}`);
  }
}

export default ConnectDB;
