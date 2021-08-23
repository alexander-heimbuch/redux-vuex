#!/usr/bin/env node
const { resolve } = require('path')
const { omit } = require('ramda')
const fs = require('fs-extra')

//  npm run clean && npm run build && mkdir -p publish && cp -R dist/ publish/ && cp package.json publish/
const path = (file) => resolve(__dirname, '..', file)

const stripProperties = (pkg) => {
  return omit(['scripts', 'devDependencies'], pkg)
}

const copyPackage = () =>
  fs
    .readJson(path('package.json'))
    .then(stripProperties)
    .then((pkg) => fs.writeJson(path('dist/package.json'), pkg))

copyPackage()
  .then()
  .then(fs.copy(path('README.md'), path('dist/README.md')))
