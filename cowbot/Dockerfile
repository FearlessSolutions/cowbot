FROM node:8-stretch 
RUN mkdir /app
WORKDIR /app

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

COPY yarn.lock package.json ./
RUN yarn install --pure-lockfile

COPY hubot-scripts.json external-scripts.json ./
COPY scripts/*.coffee scripts/

EXPOSE 3000

CMD npm start
