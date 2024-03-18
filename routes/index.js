const fs = require('fs')
const { renderPage: renderHomePage } = require('../views/home')
const { renderPage: renderStudentPage } = require('../views/student')

function handleHome(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(renderHomePage())
}

function handleStudent(req, res) {
  if (req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(renderStudentPage())
  } else if (req.method === 'POST') {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      console.log('Dane formularza:', body)

      const formData = JSON.parse(body)
      const studentId = formData.code
      const fileName = `${studentId}.txt`
      fs.writeFile(fileName, body, err => {
        if (err) {
          console.error('Błąd podczas zapisywania danych formularza:', err)
          return
        }
        console.log(`Dane formularza zapisano w pliku ${fileName}`)
      })

      res.writeHead(302, {'Location': '/student'})
      res.end()
    })
  }
}

function handleNotFound(req, res) {
  res.writeHead(404, {'Content-Type': 'text/html'})
  res.end('404 Not Found')
}

module.exports = {
  handleHome,
  handleStudent,
  handleNotFound
}