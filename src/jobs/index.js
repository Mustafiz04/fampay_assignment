import SEARCH_QUERIES from "../constants/searchQueryText.js";
import fetchAndStoreVideos from "./youtubeVideos.js";


// This code defines a function fetchVideosWithRetry, which is an asynchronous function that fetches videos with a retry mechanism. It takes a search query and an optional nextPageToken as parameters. It makes use of fetchAndStoreVideos to fetch the videos and handles retry logic using setTimeout. If there is a nextPageToken, it retries fetching videos after a delay, and if not, it cycles through a list of search queries with a delay.

// The basic concept is that the API returns a maximum of 50 responses at once, together with the nextPageToken. In order to retrieve the subsequent collection of videos, we must supply the nextPageToken along with this argument. We must pass an empty string and use the next search query to get the next page token if there isn't one.
// currentIndex is used to cycle through the search queries. If it reaches the end of the array, it restarts from the beginning and also used to go back to past day and fetch videos from youtube for 1 days only.
const startJobToFetchAndYouTubeVideos = () => {
  let currentIndex = 0;

  const fetchVideosWithRetry = async (searchQuery, nextPageToken = '') => {
    console.log(searchQuery);
    console.log(nextPageToken);
    const data = await fetchAndStoreVideos(searchQuery, currentIndex + 1, nextPageToken);
    if (data && data.nextPageToken) {
      setTimeout(() => fetchVideosWithRetry(searchQuery, data.nextPageToken), 10000);
    } else {
      currentIndex = (currentIndex + 1) % SEARCH_QUERIES.length;
      if (currentIndex === 0) {
        // Restart from the beginning after a delay if we've reached the end of the array
        setTimeout(startFetchingVideos, 10000); // Delay before restarting the cycle
      } else {
        // Fetch next query after a delay
        setTimeout(() => fetchVideosWithRetry(SEARCH_QUERIES[currentIndex]), 10000);
      }
    }
  };

  const startFetchingVideos = () => {
    fetchVideosWithRetry(SEARCH_QUERIES[currentIndex]);
  };

  startFetchingVideos();
}

export default startJobToFetchAndYouTubeVideos