const createServer = require('http').createServer;
const parseUrl = require('url').parse;

const rebuild = (res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(`Rebuilding... ${new Date()}\n\n`);
  res.flushHeaders();

  const { spawn } = require('child_process');
  const p = spawn('yarn', ['build']);

  p.stdout.on('data', (data) => {
    data = String(data);
    process.stdout.write(data);
    res.write(data.split('\n').map(x => `| ${x}`).join('\n'));
  });

  p.stderr.on('data', (data) => {
    data = String(data);
    process.stdout.write(data);
    res.write(data.split('\n').map(x => `> ${x}`).join('\n'));
  });

  p.on('close', (code) => {
    res.end();
  });
};

const port = process.env.GATSBY_REBUILD_PORT || 5000;
const secret = process.env.GATSBY_REBUILD_SECRET || 'keyboardcat';

createServer(function(req, res) {
  const parsedUrl = parseUrl(req.url);
  const { pathname, query } = parsedUrl;

  if (pathname === '/__rebuild__' && query === secret) {
    rebuild(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found!');
    res.end();
  }
}).listen(port);

console.log(`Listening on http://localhost:${port}`)
