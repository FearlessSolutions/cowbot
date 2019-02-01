FROM node:8-alpine

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app

RUN apk add sqlite yarn

COPY . ./
COPY yarn.lock package.json ./
RUN yarn install

EXPOSE 3001

CMD ["yarn", "start"]
