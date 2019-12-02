FROM node:10
WORKDIR /app
ARG NODE_ENV=production
ARG NPM_REGISTRY=https://registry.npm.taobao.org

COPY package*.json ./
RUN env NODE_ENV=${NODE_ENV} npm install --registry ${NPM_REGISTRY}

RUN apt install -y build-essential libpng-dev


COPY src /app/src
COPY *.js .env.* CHECKS /app/

EXPOSE 80
CMD env PORT=80 node server.js
