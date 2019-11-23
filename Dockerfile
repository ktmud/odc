FROM node:10
WORKDIR /app
COPY package*.json yarn.lock ./
RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash

ARG NODE_ENV=production
ARG NPM_REGISTRY=https://registry.npm.taobao.org
RUN yarn config set registry ${NPM_REGISTRY} && yarn

COPY src /app/src
COPY *.js .env.* /app/

# your wordpress host url
ARG WORDPRESS_BASEURL=wordpress:5000
RUN gatsby telemetry --disable
RUN echo "WordPress base URL: ${WORDPRESS_BASEURL}" && yarn build

EXPOSE 1984
COPY nginx.conf.sigil /app/
CMD node server.js
