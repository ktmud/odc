FROM ktmud/odc@sha256:3ed7855584cf9e5b9417c709c63fd562d5233adc73d7f5a7721dab6cdec9eb3b
WORKDIR /app

COPY *.js .env.* CHECKS /app/
COPY src /app/src

EXPOSE 80
CMD env PORT=80 node server.js
