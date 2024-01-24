import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, index: true },
  publishedAt: { type: Date, required: true },
  thumbnails: {
    default: { type: mongoose.Schema.Types.Mixed },
    medium: { type: mongoose.Schema.Types.Mixed },
    high: { type: mongoose.Schema.Types.Mixed },
  },
  channelId: { type: String },
  channelTitle: { type: String },
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

export default Video;