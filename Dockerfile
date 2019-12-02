FROM node:10
WORKDIR /app
ARG NODE_ENV=production
ARG NPM_REGISTRY=https://registry.npm.taobao.org

COPY package*.json ./
RUN env NODE_ENV=${NODE_ENV} npm install --registry ${NPM_REGISTRY}

RUN apt-get install apt-transport-https
RUN echo '\
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch main contrib non-free \n\
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-updates main contrib non-free \n\
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-backports main contrib non-free \n\
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security stretch/updates main contrib non-free \n\
' >> /etc/apt/sources.list
RUN apt-get update && apt-get install -y build-essential libpng-dev


COPY src /app/src
COPY *.js .env.* CHECKS /app/

EXPOSE 80
CMD env PORT=80 node server.js
