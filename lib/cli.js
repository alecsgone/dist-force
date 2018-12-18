#!/usr/bin/env node

const path = require('path')
const program = require('commander')
const ghpages = require('gh-pages')

const pkg = require('../package.json')
const runPublish = require('./runPublish')

program
  .version(pkg.version, '-v, --version')
  // .option('-f, --folder [path]', 'Change target folder for the build')
  .option('-r, --remote [remote]', 'Change git remote')
  .option('-b, --branch [branch]', 'Change deploy branch')
  .parse(process.argv);

const pathPkg = path.resolve(process.cwd(), 'package.json')
const foreignPkg = require(pathPkg)

runPublish(foreignPkg)
  .on('error', ( err ) => { console.log(err) })
  .on('close', (code) => {
    if (code !== 0) {
      return console.log(`grep process exited with code ${code}`);
    }

    console.log('\nPublishing to "npm" branch...');

    ghpages.publish('./', {
      branch: program.branch || 'npm',
      tag: `v${pkg.version}`,
      message: `Bump ${pkg.version}`,
      remote: program.remote || 'origin',
      src: ['lib/*.*', 'package.json']
    }, function(err) {
      if (err) {
        return console.log('err: ', err);
      }

      console.log('Module build was deployed to the npm branch');
    });
  });
