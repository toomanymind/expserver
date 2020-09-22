const express = require('express')
let router = express.Router()
const Chance = require('chance')
const moment = require('moment')
const chance = new Chance()
const genId = require('./genId')

router.all('/*', function(req, res, next) {
  if (
    req.path === '/doc/list'
    || req.path.startsWith('/kj/payinfo/')
  ) {
    next()
    return
  }
  res.send(JSON.stringify(require(`./${genId(req)}.json`)))
})


router.all(/^\/kj\/payinfo\//, (req, res, next) => res.json(require('./payinfo.json')))




let docs = Array(104).fill(0).map((doc, index) => {
  var rownum = index + 1
  return {
    id: rownum,
    desc: rownum,
    reason: rownum,
    date: 1553168967000,
    orderDate: '2019-03-21',
    status: 'checked',
    latestStatus: {
      createTime: null,
      modifiedTime: null,
      id: null,
      dbid: '10087971',
      billId: null,
      date: 1555915440000,
      action: 'checked',
      desc: "",
      from: '5a27977de4b00429662e8bad',
      fromname: '钟瑜',
      to: '5a27977de4b00429662e8bad',
      toname: '钟瑜',
      docid: 95309,
      fromavatarurl: 'http://static.yunzhijia.com/space/c/photo/load?id=5caed489db5aa6656fccb477',
      toavatarurl: 'http://static.yunzhijia.com/space/c/photo/load?id=5caed489db5aa6656fccb477',
      json: null,
      values: {}
    }
  }
})
let docsCopy = docs.slice()
let docsPaged = []
while (docsCopy.length) {
  docsPaged.push(docsCopy.splice(0, 20))
}

router.all('/doc/list', (req, res, next) => {
  let { page } = req.query
  res.json({
    status: 200,
    msg: 'success',
    data: docsPaged[page - 1],
    pager: {
      page: +page,
      rows: 20,
      records: docs.length,
      totalPage: docsPaged.length,
      start: 0
    },
    currentPageMoney: 835.6,
    totalMoney: 835.6
  })
})



module.exports = router