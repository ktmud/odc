const createServer = require('http').createServer;
const parseUrl = require('url').parse;

let running = 0;

const rebuild = (res) => {
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

  const { spawn } = require('child_process');
  const p = spawn('yarn', ['build']);

  p.stdout.on('data', (data) => {
    data = String(data);
    process.stdout.write(data);
    // res.write(data.split('\n').map(x => `| ${x}`).join('\n'));
  });

  p.stderr.on('data', (data) => {
    data = String(data);
    process.stdout.write(data);
    // res.write(data.split('\n').map(x => `> ${x}`).join('\n'));
  });

  p.on('close', () => {
    process.stdout.write('\nDone.\n\n');
    // if another run is triggered while still running, return
    if (running > 1) {
      running = 0;
      rebuild();
    }
    running = 0;
  });
};

const port = process.env.GATSBY_REBUILD_PORT || 1984;
const secret = process.env.GATSBY_REBUILD_SECRET || 'keyboardcat';

createServer(function(req, res) {
  const parsedUrl = parseUrl(req.url);
  const { pathname, query } = parsedUrl;

  if (
    (pathname === '/__rebuild__' && query === secret) ||
    (req.headers.host.split(':')[0] === 'localhost' && pathname === '/__rebuild__')
  ) {
    rebuild(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found!');
    res.end();
  }
}).listen(port);

console.log(`Listening on http://localhost:${port}`);
