FROM node:10
WORKDIR /app
ARG NODE_ENV=production
ARG NPM_REGISTRY=https://registry.npmjs.org
COPY package*.json ./
RUN env NODE_ENV=${NODE_ENV} npm install --registry ${NPM_REGISTRY} && rm -r /root/.npm
