## FAMPAY ASSIGNMENT
submitted by Mustafiz Kaifee

## Steps to run this project
1. Clone or Download this repo.
2. run `npm i`
3. Put API_KEY in `youtubeApiKeys.js` file
4. create `.env` file in root directory or rename `.env.sample` to `.env`. Add or update the port and database url.
`	PORT=3000`
`	DB_URI=mongodb://localhost:27017/fampay_youtube`
5. To start the server run `npm run start`
6. Server will start running on the port you specify and start query YouTube video and keep adding into the database.
7. To test the search and query api. Copy the url or import the curl for that.
	i. search all video api -> http://localhost:3000/video
		`curl --location 'http://localhost:3000/video/'`
	ii search video by query -> http://localhost:3000/video/search?q=india&page=1
		`curl --location 'http://localhost:3000/video/search?q=india&page=1'`

## To run using docker
1. Download docker.
2. Build docker image using command `docker build -t <image_name> .` 
3. Before start the docker update the DB_URL inside `docker-compose.yml` file to actual db url or keep it as if you are using local mongodb.
4. Start the docker `docker compose up`
5. Server will start running on the port you specify.