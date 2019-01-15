FROM node:8-alpine

RUN mkdir /app
WORKDIR /app

RUN apk add yarn
COPY . ./
COPY yarn.lock package.json ./
RUN yarn install
RUN yarn run db:create

EXPOSE 3001

CMD ["yarn", "start"]
