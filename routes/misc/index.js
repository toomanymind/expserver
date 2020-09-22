const express = require('express')
let router = express.Router()

const axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'


const hostWeixin = 'https://api.weixin.qq.com'
const appId = 'wx8db4bc821dcf4290'
const appSecret = '7799f33522b3671c5231af0ab5d659d0'


router.all('/send', function(req, res, next) {
  Promise.resolve()
    .then(() => axios.get(`${hostWeixin}/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`))
    // .then(response => res.send(response.data.access_token))
    .then(response => axios.post(`${hostWeixin}/cgi-bin/message/subscribe/send?access_token=${response.data.access_token}`, {
      touser: 'oMojW5WBh0p4Uxhn-OvGF4qF5vZM',
      template_id: 'uv2V6xsIFDewZcPoQcXQAszK75LTJ8ydqT_Hrs9TXo0',
      page: 'pages/main/record-account/index',
      miniprogram_state: 'developer',
      data: {
        thing1: {
          value: 'AAA'
        },
        thing4: {
          value: 'BBB'
        }
      }
    }))
    .then(response => res.send(response))
    .catch(err => res.send(err))
})



module.exports = router