FROM node:8-stretch

RUN mkdir /app
WORKDIR /app

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

COPY yarn.lock package.json ./
RUN yarn install

COPY . ./

EXPOSE 3000

CMD ["yarn", "start"]
