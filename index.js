const http = require('http');
const fs = require('node:fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    return res.end('Hello World!');
  }
  if (req.url === '/about') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    return res.end('About Page');
  }
  res.writeHead(200, { 'Content-type': 'text/html' });
  return res.end('Page Not Found');
});

const PORT = process.env.PORT || 8080;

server.listen(PORT);
