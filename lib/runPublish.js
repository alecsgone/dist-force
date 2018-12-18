const path = require('path')
const cliParser = require('./cliParser')
const { spawn } = require('child_process')

function runPublish (packagejson) {

  if (!packagejson.scripts) {
    return
  }

  const [command, ...args] = (packagejson.scripts.prepublishOnly ||
      packagejson.scripts.prepublish ||
      packagejson.scripts.prepare).split(' ')

  if (!command) {
    return
  }

  return spawn(command, cliParser(args.join(" ")), { stdio: 'inherit' })

}

module.exports = runPublish