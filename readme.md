## FAMPAY ASSIGNMENT
submitted by Mustafiz Kaifee

## Steps to run this project
1. Clone or Download this repo.
2. run `npm i`
3. create `.env` file in the root directory or rename `.env.sample` to `.env`. Add or update the port and database URL.
   
	`PORT=3000`
	`DB_URI=mongodb://localhost:27017/fampay_youtube`
5. To start the server run `npm run start`
6. The server will start running on the port you specify start query YouTube videos and keep adding them to the database.
7. To test the search and query API. Copy the URL or import the curl for that.
   
	i. Search all video API -> http://localhost:3000/video

		`curl --location 'http://localhost:3000/video/'`
	ii search video by query -> http://localhost:3000/video/search?q=india&page=1

		`curl --location 'http://localhost:3000/video/search?q=india&page=1'`

## To run using docker
1. Download docker.
2. Build a docker image using the command `docker build -t <image_name> .` 
3. Before starting the docker update the DB_URL inside `docker-compose.yml` file to the actual db URL or keep it as if you are using local Mongodb.
4. Start the docker `docker compose up`
5. The server will start running on the port you specify.
