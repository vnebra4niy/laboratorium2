const http = require('http')
const fs = require('fs')

const PORT = 3000

const homePage = require('./views/home')
const studentPage = require('./views/student')

const routes = {
  '/': homePage.renderPage,
  '/student': studentPage.renderPage
}

const server = http.createServer((req, res) => {
  const routeHandler = routes[req.url]
  
  if (routeHandler) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(routeHandler())
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('404 Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})