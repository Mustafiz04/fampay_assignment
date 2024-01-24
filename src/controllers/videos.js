import Video from "../models/videos.js";


// This code defines an asynchronous function fetchVideos that retrieves a page of videos from a database using pagination based on the page query parameter. It sorts the videos by publishedAt, limits the results to a certain page size, and then sends the page number and retrieved videos as a JSON response. If an error occurs during the database operation, it sends a 500 Internal Server Error response with a JSON error message.
/**
 * Asynchronous function to fetch videos based on the request parameters.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {Promise} A Promise that resolves with the fetched videos
 */
const fetchVideos = async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 10; // Adjust as needed

  try {
    const videos = await Video.find()
      .sort({ publishedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ page, videos });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// This code defines an asynchronous function searchVideo that takes a request and response object as parameters. It uses the query parameter from the request to search for videos in a database. It constructs search terms from the query, searches for videos matching these terms using a case-insensitive regular expression, and then responds with the found videos or a 500 error in case of an error.
/**
 * Asynchronous function to search for videos based on the given query.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {Promise} A promise that resolves to the found videos or rejects with an error
 */
const searchVideo = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = 10; // Adjust as needed
  const searchTerms = query.split(' ').map(term => new RegExp(term, 'i'));
  
  try {
    const videos = await Video.find({
      $or: [
        { title: { $in: searchTerms } },
        { description: { $in: searchTerms } },
      ]
    })
    .sort({ publishedAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

    res.json({ page, videos });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { fetchVideos, searchVideo }