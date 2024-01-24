FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./.env ./
COPY ./config.js ./

EXPOSE 3000

CMD ["npm", "start"]
