const http = require('http');
const path = require('path');
const fs = require('node:fs');

const server = http.createServer((req, res) => {
  // Build file path
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );

  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = 'text/html';

  // Check ext and set content type
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'g';
      break;
  }
  // Check if contentType is text/html but no .html file extention
  if (contentType == 'text/html' && extname == '') filePath += '.html';
  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // Page not found
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end(content, 'utf8');
          }
        );
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-type': contentType });
      res.end(content, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT);
