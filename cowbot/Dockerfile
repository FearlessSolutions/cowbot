FROM node:8-stretch 
RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY hubot-scripts.json external-scripts.json ./
COPY scripts/*.coffee scripts/

EXPOSE 3000

CMD npm start
