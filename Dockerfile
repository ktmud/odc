FROM ktmud/odc:latest
WORKDIR /app

COPY *.js .env.* CHECKS /app/
COPY src /app/src

EXPOSE 80
CMD env PORT=80 node server.js
