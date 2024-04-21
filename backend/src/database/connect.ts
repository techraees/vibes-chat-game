import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to database');
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(`Error connecting to mongoose database: ${error.message}`);
    }
  }
};

export default connectToDatabase;
