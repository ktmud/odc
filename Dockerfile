FROM node:10
WORKDIR /app
ARG NODE_ENV=production
ARG NPM_REGISTRY=https://registry.npm.taobao.org

COPY package*.json ./
RUN env NODE_ENV=${NODE_ENV} npm install --registry ${NPM_REGISTRY}

COPY src /app/src
COPY *.js .env.* CHECKS /app/

EXPOSE 80
CMD node server.js
