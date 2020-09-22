const path = require('path')
const jsonfile = require('jsonfile')
let json = require('./routes/newer/subjects1.json')
// let json = require('./data.json')



let filePath = path.resolve(__dirname, './data.json')
const config = { spaces: 2 }




jsonfile.writeFile(filePath, json, config)
  .then(res => {
    console.log('Write complete')
  })
  .catch(error => console.error(error))


// const file = './vip1.jdy.com.har'
// jsonfile.readFile(file)
//   .then(({log: {entries}}) => console.dir(entries.length))
//   .catch(error => console.error(error))