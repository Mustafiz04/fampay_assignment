import express from 'express';
import connectToMongoDB from './mongodb.js';
import videoRouter from './routes/videos.js';
import config from '../config.js';
import startJobToFetchYouTubeVideos from './jobs/index.js';
// Import port from config or assign 3000 by default
const { PORT = 3000 } = config

// Create Express app
const app = express();

// Connect to MongoDB database
await connectToMongoDB()

app.use(express.json());

// Routes
app.use('/video', videoRouter)

// Jobs to fetch youtube video and upload data
startJobToFetchYouTubeVideos()

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
