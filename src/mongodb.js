import mongoose from 'mongoose';
import config from '../config.js'
const { DB_URI } = config

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    const mongoURI = DB_URI;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    process.exit(1)
  }
}

export default connectToMongoDB;
