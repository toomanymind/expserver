
const config = require('../../config')
const express = require('express')
let router = express.Router()

let initParams = require('./initParams.json')
let generatecode = require('./generatecode.json')
let voucher = require('./voucher.json')
let account = require('./account.json')
let currency = require('./currency.json')
let cashTypeAction = require('./cashTypeAction.json')
let cashierAccountAction = require('./cashierAccountAction.json')
let employee = require('./employee.json')
let salaryKind = require('./salaryKind.json')
let assist = require('./assist.json')
let reportview = require('./reportview.json')
let voucherfindLatestVoucher = require('./voucherfindLatestVoucher.json')
let voucherlist = require('./voucherlist.json')
let reportgetIndexValue = require('./reportgetIndexValue.json')
let reportgetDataForNewPage = require('./reportgetDataForNewPage.json')
let operatenewThirdBoardForKJ3 = require('./operatenewThirdBoardForKJ3.json')
let getCommonFunctions = require('./getCommonFunctions.json')
let latestNews = require('./latestNews.json')
let banking = require('./banking.json')
let checkouts = require('./checkouts.json')
let scmServiceList = require('./scmServiceList.json')



let getAllYearPeriod = require('./app/getAllYearPeriod.json')
let getServiceList = require('./app/getServiceList.json')
let getParams = require('./app/getParams.json')
let getAllCurrency = require('./app/getAllCurrency.json')
let getAllGenerateCode = require('./app/getAllGenerateCode.json')
let getAllItem = require('./app/getAllItem.json')
let getAllexplanation = require('./app/getAllexplanation.json')
let getIndexTable = require('./app/getIndexTable.json')
let grossIncome = require('./app/grossIncome.json')
let getMoney = require('./app/getMoney.json')
let getIncomeNProfitsTrend = require('./app/getIncomeNProfitsTrend.json')
let getExpenseTrend = require('./app/getExpenseTrend.json')
let getAccountBalanceByName = require('./app/getAccountBalanceByName.json')
let getAccountBalanceByName_2 = require('./app/getAccountBalanceByName_2.json')
let getDebiTOrCreditAccountList = require('./app/getDebiTOrCreditAccountList.json')
let getTopAccount = require('./app/getTopAccount.json')
let getBlalanceReportByAccount = require('./app/getBlalanceReportByAccount.json')
let getAllAccount = require('./app/getAllAccount.json')
let getAuthList = require('./app/getAuthList.json')
let getRoleList = require('./app/getRoleList.json')
let VoucherAction_findList = require('./app/VoucherAction_findList.json')
let getProfit = require('./app/getProfit.json')
let getBalance = require('./app/getBalance.json')
let getJdyUserRltQywxUserList = require('./app/getJdyUserRltQywxUserList.json')
let getTemVoucherById = require('./app/getTemVoucherById.json')
let getInitVoucherMessage = require('./app/getInitVoucherMessage.json')
let VoucherTempAction_findList = require('./app/VoucherTempAction_findList.json')
let qywxSignature = require('./app/qywxSignature.json')
let getProfitTable = require('./app/getProfitTable.json')

// 明细账
let subLedgerTree = require('./subLedgerTree.json')
let subLedgerGrid = require('./subLedgerGrid.json')




const Chance = require('chance')
const moment = require('moment')
const chance = new Chance()


router.all('/basedata/initParams', (req, res, next) => {
  let data
  switch (req.query.m) {
    case 'getCommonFunctions':
      data = getCommonFunctions
      // data.data.wizard = ''
      data.data.wizard = JSON.stringify({open: true})
      // data.data.wizard = JSON.stringify({
        // open: false,
        // finished: false
      // })
      data.data.wizard = JSON.stringify({
        open: true,
        finished: false,
        active: true,
        settings: [
          { id: 'system', finished: true, count: 0 },
          // { id: 'item', finished: false, count: 0 },
          { id: 'item', finished: true, count: 1 },
          { id: 'subject', finished: false, count: 0 },
          // { id: 'subject', finished: true, count: 1 },
          { id: 'initial', finished: false, count: 0 }
        ]
      })
      break
    case 'getLatestNews':
      data = latestNews
      break
    case 'getSystemParams':
      data = initParams
      break
    case 'getPassResult':
      data = {
        status: 200,
        data: {
          order: JSON.stringify({
            level: 2,
            finished: [
              // 'video-import',
              // 'video-voucher',
              // 'video-share',
              'setting-init',
              'setting-bindSCM',
              // 'voucher-add',
              'voucher-print',
              // 'assests-manage',
              // 'book-ledger',
              // 'book-general',
              // 'book-multi',
              // 'checkout-gainloss',
              // 'reports-balance',
              // 'reports-profit'
            ].join(',')
          })
        }
      }
      break
    case 'updatePassResult':
      data = {status: 200}
      break
    case 'integral':
      res.send(JSON.stringify({status: 200, msg: '{\"integral\":0}'}))
      break
  }
  res.send(JSON.stringify(data))
})

router.all('/gl/acctgroup/query', (req, res, next) => {
  let { classId } = req.query
  let groups = [
    [],
    [
      {classId:1,name:'流动资产',id:101,cash:true,dc:1},
      {classId:1,name:'非流动资产',id:102,cash:false,dc:1}
    ],
    [
      {classId: 2, name: "流动负债", id: 201, cash: false, dc: -1},
      {classId: 2, name: "非流动负债", id: 202, cash: false, dc: -1}
    ],
    [
      {classId: 3, name: "所有者权益", id: 301, cash: false, dc: -1}
    ],
    [
      {classId: 4, name: "成本", id: 401, cash: false, dc: 1}
    ],
    [
      {classId: 5, name: "营业收入", id: 501, cash: false, dc: -1},
      {classId: 5, name: "其他收益", id: 502, cash: false, dc: -1},
      {classId: 5, name: "期间费用", id: 503, cash: false, dc: 1},
      {classId: 5, name: "其他损失", id: 504, cash: false, dc: 1},
      {classId: 5, name: "营业成本及税金", id: 505, cash: false, dc: 1},
      {classId: 5, name: "以前年度损益调整", id: 506, cash: false, dc: 1},
      {classId: 5, name: "所得税", id: 507, cash: false, dc: 1}
    ]
  ]
  let group = groups[classId]
  if (classId === '-1') {
    group = groups.flat(Infinity)
  }
  res.json({
    status: 200,
    msg: '操作成功',
    data: {
      items: group,
      totoalSize: group.length
    }
  })
})

router.all('/gl/voucher', (req, res, next) => {
  let data
  switch (req.query.m) {
    case 'findUsedVchNO':
      data = voucher
      break
    case 'findLatestVoucher':
      data = voucherfindLatestVoucher
      break
    case 'addNew':
      data = {status: 200, data: {id: 123456}}
      break
    case 'auditVoucher':
      data = {status: 200, data: {id: 123456}}
      break
    case 'findList':
      data = voucherlist
      break
    case 'getVchById':
      // next()
      // return
      data = require('./voucherDetail.json')
      let entries = []
      for (let i = 1; i <= 2e5; i++) {
        entries.push({
            amount: chance.floating({ fixed: 2, min: 1, max: 1e8}),
            accountName: '库存现金',
            explanation: i,
            accountNumber: "1001",
            acctCur: "[\"RMB\"]",
            id: i,
            dc: chance.bool() ? 1 : -1,
          })
      }
      data.data.entries = entries
      res.json(data)
  }
  res.send(JSON.stringify(data))
})

router.all('/gl/voucher', (req, res, next) => {
  if (req.query.m !== 'getVchById') {
    next()
    return
  }
  //////////////////////////////////////////////////
  let data = require('./voucherDetail.json')
  // data.data.entries = Array(1e3).fill(0).map((e, i) => ({
  //   explanation: i + 1,
  //   accountName: '库存现金',
  //   accountNumber: "1001",
  //   dc: 1,
  //   amount: 100
  // }))
  // data.data.entries = []
  res.json(data)
})





let entries = Array(42).fill(0).map((entry, index) => {
  let isDebit = chance.bool()
  let ammount = chance.floating({ min: 0, max: 2e4, fixed: 0 })
  let subjects = ['1001 库存现金', '1002 银行存款', '2201 应付票据', '4001 生产成本']
  return {
    id : index,
    summary: index + 1,
    subject: subjects[chance.integer({ min: 0, max: 3 })],
    debit: isDebit ? ammount : 0,
    credit: isDebit ? 0 : ammount
  }
})



router.all('/gl/voucher/getEntries', ({query}, res) => {
  let { page, rows } = query
  let data = entries.slice()
  let pagedData = []
  let total = 0
  while (data.length) {
    pagedData.push(data.splice(0, rows))
    total += 1
  }
  setTimeout(() => {
    res.json({
      total,
      records: entries.length,
      page,
      rows: pagedData[page - 1]
    })
  }, 200)
})

router.all('/user/acct', (req, res) => res.json(require('./userAcct.json')))



router.all('/getQywxUserInfo', (req, res) => {
  var { callback } = req.query
  res.set({
    'Content-Type': 'text/plain'
  })
  res.send(`${callback}(null)`)
})
router.all('/getJdyUserRltQywxUserList', (req, res) => {
  var { callback } = req.query
  res.set({
    'Content-Type': 'text/plain'
  })
  res.send(`${callback}([])`)
})












router.all('/report/report', (req, res, next) => {
  let data
  switch (req.query.m) {
    case 'getIndexValue':
      data = reportgetIndexValue
      break
    case 'getDataForNewPage':
      data = reportgetDataForNewPage
      break
    case 'getItemProfitReport':
    case 'getProfiltValue':
      data = require('./profitSheet.json')
      break
    case 'getItemList':
      data = require('./itemList.json')
      break
    case 'getItemProfitFilter':
      data = require('./itemFilter.json')
      break
    case 'getItemProfitReport':
      data = require('./itemFilter.json')
      break
    case 'getAccountBal':
      data = require('./getAccountBal.json')
      break
    case 'getReportValue':
      data = require('./balanceSheet.json')
      break
    case 'getAcctReportValue':
      data = require('./balanceFormula.json')
      break
    case 'getAcctReportItem':
      data = require('./getAcctReportItem.json')
      break
    case 'getReportItem':
      data = require('./getReportItem.json')
      break
    case 'addRptItem':
      data = require('./addRptItem.json')
      break
    case 'deleteRptItem':
      data = {"msg":"操作成功","data":{"reportItem":"114209268065056"},"status":200}
      break
    case 'getCashReportValue':
      data = require('./cashflow.json')
      break
  }
  res.json(data)
})

router.all('/report/reportview', (req, res, next) => {
  res.send(JSON.stringify(reportview))
})

router.all('/ntboards/query', (req, res, next) => {
  res.send(JSON.stringify(operatenewThirdBoardForKJ3))
})

router.all('/gl/remark', (req, res, next) => {
  res.json(require('./summaries.json'))
})

router.all('/gl/account', (req, res, next) => {
  let {m, classId} = req.query
  let data = {
    findAll: account,
    isUsed: {"msg":"操作成功","data":{"isUsed":0},"status":200},
    update: {"msg":"操作成功","data":{"isUsed":0},"status":200}
  }
  let subjects = {
    '1': require('./subjects1.json'),
    '2': require('./subjects2.json'),
    '3': require('./subjects3.json'),
    '4': require('./subjects4.json'),
    '5': require('./subjects5.json')
  }
  if (classId) {
    res.json(subjects[classId])
  } else {
    setTimeout(() => {
      res.json(data[m])
    }, 2000)
  }
})

router.all('/gl/general', (req, res, next) => {
  var data = {}
  switch (req.query.m) {
    // 总账表
    case 'queryTotal':
      // data = require('./subjects.json')
      data = require('./general_ledger_currency_all.json')
      break
    // 明细账树
    case 'queryAccount':
      data = require('./subLedgerTree.json')
      break
    // 明细账表
    case 'queryDetail':
      data = require('./subLedgerGrid.json')
      break
    case 'export':
    case 'exportDetail':
      data = {msg: '你前面已经提交相同任务在执行，请稍后重试', status: 800}
      // res.download('C:/Users/Administrator/Desktop/writing_pad.txt')
      // return
      break
  }
  res.send(JSON.stringify(data))
})
router.all('/gl/backup', (req, res) => {
  res.json(require('./queryBackupFile.json'))
})
router.all('/newBackAndRecover/getAllBackup', (req, res) => {
  res.json(require('./getAllBackup.json'))
})

router.all('/gl/closeperiod', (req, res, next) => {
  if (req.query.m === 'getTransSaleCostData') {
    res.json(require('./getTransSaleCostData.json'))
    return
  }
  res.send(JSON.stringify(checkouts))
})


router.all('/gl/generatecode', (req, res, next) => {
  res.send(JSON.stringify(generatecode))
})

router.all('/gl/cashier/cashTypeAction', (req, res, next) => {
  res.send(JSON.stringify(cashTypeAction))
})

router.all('/gl/cashier/cashierAccountAction', (req, res, next) => {
  res.send(JSON.stringify(cashierAccountAction))
})

router.all('/gl/cashier/cashierReportAction', (req, res, next) => {
  res.json(require('./cashierReportAction.json'))
})

router.all('/gl/balance/query', (req, res, next) => {
  if (req.query.m === 'queryBalance') {
    res.json(require('./initialBalance.json'))
  }
  if (req.query.m === 'addInitBalance') {
    res.json({msg: 'success', status: 200})
  }
})
router.all('/gl/balanceReport', (req, res, next) => {
  res.send(JSON.stringify(require('./subjectBalance.json')))
})
router.all('/gl/getTree', (req, res, next) => {
  res.send(JSON.stringify(require('./subjectBalance.json')))
})
router.all('/gl/getChildNodes', (req, res, next) => {
  res.send(JSON.stringify(require('./childNodes.json')))
})


router.all('/pay/employee.do', (req, res, next) => {
  res.send(JSON.stringify(employee))
})

router.all('/pay/salaryKind.do', (req, res, next) => {
  res.send(JSON.stringify(salaryKind))
})

router.all('/bs/currency', (req, res, next) => {
  res.send(JSON.stringify(currency))
})

router.all('/bs/assist.do', (req, res, next) => {
  let { type, m } = req.query
  // if (
  //     m === 'save'
  //     || m === 'update'
  //     || m === 'delete'
  //   ) {
  //   res.json(require('./voucherTempTypeAdd.json'))
  // }
  res.json(({
    salarykind: assist,
    evidbusinesscate: require('./evidbusinesscate.json'),
    voucherTempType: require('./voucherTemplateType.json'),
    getUserSetting: { status: 200 }
  })[type])
})

router.all('/gl/evidbus.do', (req, res, next) => {
  let {m} = req.query
  res.json(({
    query: require('./evidQuery.json'),
  })[m] || require('./findByType.json'))
})

// fa cards
router.all('/faType', (req, res, next) => {
  res.json(require('./faType.json'))
})
router.all('/faCard', (req, res, next) => {
  let {m} = req.query
  res.json(({
    list: require('./faCard.json'),
    getDetail: require('./faCardDetail.json')
  })[m])
})

// items
router.all('/bs/itemClass', (req, res, next) => {
  res.send(JSON.stringify(require('./itemClass_findUserDefined.json')))
})
router.all('/bs/item', (req, res, next) => {
  let {itemClassId, m} = req.query
  if (m === 'save') {
    res.json({"msg":"操作成功","data":{"number":"1111","isDelete":false,"name":"王总","remark":"","id":376471145957738,"type":-10},"status":200})
    return
  }
  let data = {
    '0': require('./item0.json'),
    '1': require('./item1.json'),
    // '1': require('./items4W.json'),
    '2': require('./item2.json'),
    '3': require('./item3.json'),
    '4': require('./item4.json'),
    '5': require('./item5.json'),
    '6': require('./item6.json'),
    '593004904760176': require('./itemZ1.json'),
    '593024903407509': require('./itemZ2.json')
  }
  res.json(data[itemClassId])
})




router.all('/scm/scmApi', (req, res) => {
  var data = {}
  switch (req.query.m) {
    case 'queryTotal':
      data = require('./subjects.json')
      break
  }
  res.send(JSON.stringify(data))
})
router.all('/cashflow', (req, res) => {
  let { m } = req.query
  res.json({
    getCashReportValue: require('./getCashReportValue.json'),
    getCashFlowDetail4Adjust: require('./getCashFlowDetail4Adjust.json'),
    getCashFlowItem4Adjust: require('./getCashFlowItem4Adjust.json'),
    getCashFlowInitBalance: require('./getCashFlowInitBalance.json')
  }[m] || {status: 200})
})



router.all('/gl/cashier/journal', (req, res, next) => {
  let { m } = req.query
  if (m === 'update' || m === 'add') {
    res.json({status: 200, msg: 'success', data: {type: 1}})
    return
  }
  if (m === 'findNotMatchedList') {
    res.json(require('./bankList.json'))
  } else if (m === 'batchUpdateAcctId') {
    res.json({ status: 200 })
  } else {
    res.json(require('./journalTable.json'))
  }
})

router.all('/bankStatement/findList', (req, res) => {
  res.json(require('./bankList.json'))
})


let foos = Array(634).fill(0).map((row, index) => {
  let dc = chance.bool()
  return {
    id: chance.integer({ min: 1000, max: 2000 }),
    balanceSource: chance.integer({ min: 1, max: 3 }),
    dc: chance.integer({ min: -1, max: 1 }),
    date: moment(chance.date({year: 2019})).format('YYYY-MM-DD'),
    explanation: chance.word(),
    oppAcctName: chance.word(),
    debit: dc ? chance.floating({ min: 0, max: 1000 }) : 0,
    credit: dc ? 0 : chance.floating({ min: 0, max: 1000 }),
    balance: chance.floating({ min: 0, max: 100 }),
    remark: chance.word()
  }
})



router.all('/bankStatement/getRows', (req, res) => {
  let { page, rows } = req.query

  let dataAll = foos.slice()
  let dataPaged = []
  let totalPage = 0
  while (dataAll.length) {
    dataPaged.push(dataAll.splice(0, rows))
    totalPage += 1
  }



  res.json({
    status: 200,
    page: +page,
    total: totalPage,
    data: {
      items: dataPaged[page - 1],
      totalCount: foos.length
    }
  })
})











router.all('/bankStatement/add', (req, res) => {
  setTimeout(() => res.json({status: 200, msg: 'success'}), 1000)
})
router.all('/bankStatement/update', (req, res) => {
  // setTimeout(() => res.json({status: 200, msg: 'success'}), 600)
  setTimeout(() => res.json({status: 500, msg: 'error'}), 600)
})
router.all('/bankStatement/getBalanceAdjust', (req, res) => {
  res.json(require('./bankBalance.json'))
})
router.all('/bankStatement/findNotMatchedList', (req, res) => {
  res.json(require('./bankList.json'))
})
router.all('/bankStatement/getMatchSetting', (req, res) => {
  res.json(require('./getMatchSetting.json'))
})
router.all('/bankStatement/findMatchedRecord', (req, res) => {
  res.json(require('./findMatchedRecord.json'))
})

router.all('/bankStatement/addUnaccountedRecord', (req, res, next) => {
  res.json({status: 200, msg: 'success'})
})
router.all('/bankStatement/updateUnaccountedRecord', (req, res, next) => {
  // res.json({status: 200, msg: 'success'})
  res.json({status: 500, msg: 'error'})
})
router.all('/bankStatement/delUnaccountedRecord', (req, res, next) => {
  res.json({status: 200, msg: 'success'})
})
router.all('/bankStatement/getInitPeriod', (req, res) => {
  res.json({status: 200, data: ''})
})




router.all('/bs/voucherTemp', ({ query }, res) => {
  let { m } = query
  res.json(({
    findList: require('./voucherTemplateList.json'),
    getTempById: require('./voucherTemplateDetail.json'),
    update: { status: 200, msg: 'success' }
  })[m])
})

router.all('/bs/systemprofile', ({ query }, res) => {
  let { m } = query
  res.json(({
    updateSystemParam: {"msg":"操作成功","status":200}
  })[m])
})




















router.all('/sign.do', (req, res, next) => {
  let { query: {action, method, parseResponse, callback}, path } = req
  res.app.set('jsonp callback name', 'parseResponse')
  res.jsonp(qywxSignature)
})
router.all('/acct/bs/systemprofile.do', (req, res, next) => {
  res.jsonp({status: 200, data: {lastSyncTime: 20171202, syncStatus: 0, errMsg: 'A'}})
})
// light app
router.all(/^\/qywx/, (req, res, next) => {
  let { query: {action, method, parseResponse, callback}, path } = req
  let data = {
    '/qywx/getWxJSignature': qywxSignature,
    '/qywx/getJdyUserRltQywxUserList': getJdyUserRltQywxUserList
  }
  res.app.set('jsonp callback name', 'callback')
  res.jsonp(data[path])
})
router.all('/app/api', (req, res, next) => {
  let { query: {action, method, paramData}, path } = req

  let params
  let jsonParams
  try {
    jsonParams = paramData ? eval(`params=${paramData}`) : {}
  } catch(err) {
    jsonParams = {}
  }

  let data = {
    'getAllYearPeriod': getAllYearPeriod,
    'getServiceList': getServiceList,
    'getParams': getParams,
    'getAllCurrency': getAllCurrency,
    'getAllGenerateCode': getAllGenerateCode,
    'getAllItem': getAllItem,
    'getAllexplanation': getAllexplanation,
    'getAllAccount': getAllAccount,
    'getIndexTable': getIndexTable,
    'grossIncome': grossIncome,
    'getMoney': getMoney,
    'getIncomeNProfitsTrend': getIncomeNProfitsTrend,
    'getExpenseTrend': getExpenseTrend,
    'getAccountBalanceByName': getAccountBalanceByName,
    'getAccountBalanceByName_2': getAccountBalanceByName_2,
    'getDebiTOrCreditAccountList': getDebiTOrCreditAccountList,
    'getTopAccount': getTopAccount,
    'getBlalanceReportByAccount': getBlalanceReportByAccount,
    'getAuthList': getAuthList,
    'getRoleList': getRoleList,
    'VoucherAction_findList': VoucherAction_findList,
    'getProfit': getProfit,
    'getBalance': getBalance,
    'getTemVoucherById' : getTemVoucherById,
    'getInitVoucherMessage' : getInitVoucherMessage,
    'VoucherTempAction_findList' : VoucherTempAction_findList,
    'getProfitTable': getProfitTable
  }

  res.send(JSON.stringify(
    data[path] ||
    data[`${action}_${method}`] ||
    data[`${method}_${jsonParams.type}`] ||
    data[method]
  ))
})


module.exports = router