var path = require('path')
var express = require('express')
var modRewrite = require('connect-modrewrite')

const PORT = 8000
const DEV_URL = 'http://localhost:8888/dist'

const app = express()

app.use('/assets', express.static('assets'))

app.use(modRewrite([
  `^/app(.*)$ ${DEV_URL}/app$1 [P]`
]))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../electron/index.html'))
})

app.listen(PORT)

console.log(`App started on port ${PORT}`) // eslint-disable-line no-console
