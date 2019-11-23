FROM node:10
WORKDIR /app
COPY package*.json ./

ARG NODE_ENV=production
ARG NPM_REGISTRY=https://registry.npm.taobao.org
RUN env NODE_ENV=${NODE_ENV} npm install --registry ${NPM_REGISTRY}

COPY src /app/src
COPY *.js .env.* /app/
COPY nginx.conf.sigil CHECKS app.json /app/

# your wordpress host url
# ARG WORDPRESS_BASEURL=wordpress:5000
# RUN echo "WordPress base URL: ${WORDPRESS_BASEURL}" && npm run build

EXPOSE 1984
CMD node server.js
