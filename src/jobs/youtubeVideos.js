import axios from "axios";
import YOUTUBE_API_KEYS from "../constants/youtubeApiKeys.js";
import Video from "../models/videos.js";

const apiKeys = YOUTUBE_API_KEYS
let apiKeyIndex = 0;

// This code snippet defines an asynchronous function fetchAndStoreVideos that uses the YouTube API to fetch videos based on a search query and the number of days back. It then stores the fetched videos in a database using the Video.insertMany method. If an error occurs during the process, it logs the error message.
// Here is am using dayBack as of days to go back and fetch videos from youtube for 1 days only. I am doing this to make our database with varity of video.
// Fetch and store videos from YouTube API
const fetchAndStoreVideos = async (searchQuery, daysBack, pageToken = "") => {
  try {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysBack);
    const publishedAfterDate = currentDate.toISOString();
    const publishBeforeDate = new Date(publishedAfterDate);
    publishBeforeDate.setDate(publishBeforeDate.getDate() + 1);
    const publishBefore = publishBeforeDate.toISOString();

    console.log(publishedAfterDate, publishBefore);
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        order: 'date',
        publishedAfter: publishedAfterDate,
        publishedBefore: publishBefore,
        maxResults: 50,
        key: apiKeys[apiKeyIndex],
        pageToken
      },
    });
  
    const videos = response.data.items.map((item) => {
      const { snippet: { title, description, publishedAt, thumbnails, channelId, channelTitle } = {} } = item
      return {
        title,
        description,
        publishedAt,
        thumbnails,
        channelId,
        channelTitle,
      };
    });

    await Video.insertMany(videos);
    console.log('Videos stored successfully');

    apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length;
    console.log(response.data.nextPageToken)
    return { nextPageToken: response.data.nextPageToken }
  } catch (error) {
    console.error('Error fetching and storing videos:', error.message);
    apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length;
  }
};

export default fetchAndStoreVideos