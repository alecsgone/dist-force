#!/usr/bin/env node

const path = require('path')
const program = require('commander')
const ghpages = require('gh-pages')

const pkg = require('../package.json')
const runPublish = require('./runPublish')

program
  .version(pkg.version, '-v, --version')
  .option('-f, --folder [path]', 'Change target folder for the build')
  .parse(process.argv);

const pathPkg = path.resolve(process.cwd(), 'package.json')
const foreignPkg = require(pathPkg)

runPublish(foreignPkg)
  .on('error', function( err ){ throw err })
  .on('close', (code) => {
    if (code !== 0) {
      console.log(`grep process exited with code ${code}`);
    }

    ghpages.publish('lib', {
      branch: 'npm',
      push: false,
      repo: 'https://github.com/alecsgone/loglvl.git'
    }, function(err) {
      if (err) {
        return console.log('err: ', err);
      }

      console.log('Module build was deployed to the npm branch');
    });
  });
