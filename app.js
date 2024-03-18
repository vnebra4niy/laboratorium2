const http = require('http')
const fs = require('fs')
const url = require('url')
const { handleHome, handleStudent } = require('./routes/index')

const PORT = 3000

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const pathname = parsedUrl.pathname

  if (pathname === '/' || pathname === '/home') {
    handleHome(req, res)
  } else if (pathname === '/student') {
    handleStudent(req, res)
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end('404 Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})