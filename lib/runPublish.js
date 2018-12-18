const path = require('path')
const cliParser = require('./cliParser')
const { spawn } = require('child_process')

function runPublish (packagejson) {

  if (!packagejson.scripts) {
    return
  }

  const command = packagejson.scripts.prepublishOnly
    ? 'prepublishOnly' :
    packagejson.scripts.prepublish
    ? 'prepublish' :
    packagejson.scripts.prepare
    ? 'prepare' : null

  if (!command) {
    return spawn('echo', ['Error, there is no publish script'])
  }

  return spawn('npm', ['run', command], { stdio: 'inherit' })

}

module.exports = runPublish