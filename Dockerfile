FROM ktmud/odc@sha256:8e22b90d2d5211e493e3025d4b9e1fdd486dca7de6688cd7b3ac89909cb3baa1
WORKDIR /app

COPY *.js .env.* CHECKS /app/
COPY src /app/src

EXPOSE 80
CMD env PORT=80 node server.js
