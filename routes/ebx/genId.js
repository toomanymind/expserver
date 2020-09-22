
const apiBasePath = 'http://localhost:8829/api/'

function genId({path, url}, isHar) {
  let api = isHar ? url : path
  if (isHar) {
    api = api.slice(0, api.indexOf('?'))
  }
  api = api.replace(apiBasePath, '')
  api = api.replace(/^\/|\/$/g, '')
  api = api.replace(/\d+/g, '0D')
  api = api.replace(/\//g, '_')
  return api
}


module.exports = genId