const path = require('path')
const fs = require('fs')
const jsonfile = require('jsonfile')
const genId = require('./genId')

const config = { spaces: 2 }

const entriesFilter = ({response}) => response.content.mimeType === 'application/json'

const entriesFinder = har => har.log.entries

fs.readFile(path.resolve(__dirname, './localhost.har'), 'utf-8', (err, har) => {
  if (err) {
    throw err
  }

  let entries = entriesFinder(JSON.parse(har))
  entries = entries.filter(entriesFilter)

  for(let {request, response} of entries) {
    jsonfile.writeFile(
      path.resolve(__dirname, `./${genId(request, true)}.json`),
      JSON.parse(response.content.text),
      config
    )
      .then(res => {
        console.log('Write complete')
      })
      .catch(error => console.error(error))
  }
})





