const express = require('express')
let router = express.Router()

let authList = require('./authList.json')
let roleList = require('./roleList.json')
let rightList = require('./rightList.json')

router.all('/rest', function(req, res, next) {
  let data
  switch (req.query.method) {
    case 'jdy.app.service.authList':
      data = authList
      break
    case 'jdy.app.role.list':
      data = roleList
      break
    case 'jdy.app.right.list':
      data = rightList
      break
    case 'jdy.app.service.unAuthToUser':
    case 'jdy.app.service.authToUser':
      data = {result: 200}
      break
    case 'jdy.app.member.addShareUser':
      data = {data: {returnCode: 200}}
      break
  }
  res.send(JSON.stringify(data))
})


module.exports = router