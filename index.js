const express = require('express');
const app = express()


app.use(express.static('static'))

const openapi = require('./routes/openapi')
const mvc = require('./routes/mvc')
const newer = require('./routes/newer')
const ebx = require('./routes/ebx')
const misc = require('./routes/misc')


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})


app.use('/openapi', openapi)
app.use('/mvc', mvc)
app.use('/', newer)
app.use('/api', ebx)
app.use('/', misc)




app.all('*', (req, res, next) => {
  res.status(404)
})

app.listen(3030, () => console.log('app listening on port 3030!'))
