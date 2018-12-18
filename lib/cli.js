#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version, '-v, --version')
  .option('-f, --folder [path]', 'Change target folder for the build')
  .parse(process.argv);

const { spawn } = require('child_process')
const path = require('path')
const cliParser = require('./cliParser.js')

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

  console.log('args: ', cliParser(args.join(" ")));

  spawn(command, cliParser(args.join(" ")), { stdio: 'inherit' })
    .on('error', function( err ){ throw err })

}

build(program.folder)

// const ghpages = require('gh-pages');

// ghpages.publish('dist', function(err) {

// });
