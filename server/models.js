const db = require('./database');

exports.getUrls = async function ({}, callback) {
  console.log('Get urls');
  callback(null, true);
},

exports.getLatestUrl = async function ({}, callback) {
  console.log('get latest url');
  callback(null, true);
}

exports.postUrl = async function ({}, callback) {
  console.log('post url');
  callback(null, true);
}
