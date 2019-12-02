const createServer = require('http').createServer;
const parseUrl = require('url').parse;
const static = require('node-static');
const file = new static.Server('./public');

function runCommand(cmd, args, callback) {
  const { spawn } = require('child_process');
  const p = spawn(cmd, args);

  p.stdout.on('data', (data) => {
    data = String(data);
    process.stdout.write(data);
  });

  p.stderr.on('data', (data) => {
    data = String(data);
    process.stdout.write(data);
  });

  p.on('close', () => {
    process.stdout.write('\n>> Done.\n\n');
    if (callback) {
      callback();
    }
  });
}

function startServer() {
  const port = process.env.PORT || process.env.GATSBY_REBUILD_PORT || 1984;
  const secret = process.env.GATSBY_REBUILD_SECRET || 'keyboardcat';

  let running = 0;

  function rebuild(res) {
    if (running === 1) {
      running = 2;
    }
    if (running > 1) {
      if (res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`Another task already in progress.\n`);
        res.end();
      }
      return;
    }
    running = 1;
    if (res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(`Rebuilding... ${new Date()}\n\n`);
      res.flushHeaders();
      res.end();
    }
    runCommand('yarn', ['build'], () => {
      // if another run is triggered while still running, return
      if (running > 1) {
        running = 0;
        rebuild();
      }
      running = 0;
    });
  }

  createServer((req, res) => {
    req
      .addListener('end', function() {
        const parsedUrl = parseUrl(req.url);
        const { pathname, query } = parsedUrl;
        if (
          pathname === '/__rebuild__' &&
          query === secret
          // || (req.headers.host.split(':')[0] === 'localhost' && pathname === '/__rebuild__')
        ) {
          rebuild(res);
        } else {
          // Serve files!
          file.serve(req, res, (e) => {
            if (e && e.status === 404) {
              // If the file wasn't found
              file.serveFile('/404.html', 404, {}, req, res);
            }
          });
        }
      })
      .resume();
  }).listen(port);
  console.log(`Listening on http://localhost:${port}`);
}

// run `gatsby build` before starting the server
runCommand('npm', ['run', 'build'], startServer);
