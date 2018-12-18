#!/usr/bin/env node

const path = require('path')
const { spawn } = require('child_process')
const program = require('commander')
const pkg = require('../package.json')
const cliParser = require('./cliParser.js')

program
  .version(pkg.version, '-v, --version')
  .parse(process.argv);


function build (folder = 'dist') {
  const pathPkg = path.resolve(process.cwd(), 'package.json')
  const foreignPkg = require(pathPkg)

  if (!foreignPkg.scripts) {
    return
  }

  const [command, ...args] = (foreignPkg.scripts.prepublishOnly ||
      foreignPkg.scripts.prepublish ||
      foreignPkg.scripts.prepare).split(' ')

  if (!command) {
    return
  }

  spawn(command, cliParser(args.join(" ")), { stdio: 'inherit' })
    .on('error', function( err ){ throw err })

}

build(program.folder)

const ghpages = require('gh-pages');

ghpages.publish('', { branch: 'npm' }, function(err) {
  console.log('Module build was deployed to the npm branch');
});
