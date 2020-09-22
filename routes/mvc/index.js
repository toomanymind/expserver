const express = require('express')
let router = express.Router()

let list = require('./listByMobile.json')
// let list = require('./single.json')
// let list = require('./notfound.json')

router.all('/invite/listbyMobileOrName', function(req, res, next) {
  res.send(JSON.stringify(list))
})

router.all('/invite/addColleague', function(req, res, next) {
  res.send(JSON.stringify({status: 200}))
})

router.all('/message/add', function(req, res, next) {
  res.send(JSON.stringify({status: 200}))
})


module.exports = router