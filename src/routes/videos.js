import { Router } from 'express';
import { fetchVideos, searchVideo } from '../controllers/videos.js';
const videoRouter = Router();

videoRouter.get('/', fetchVideos);
videoRouter.get('/search', searchVideo);

export default videoRouter
