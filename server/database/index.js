const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');

const urlInfoSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  url: String,

});

const urlInfo = mongoose.model('urlInfo', urlInfoSchema);

const saveUrl = (url) => {
  return urlInfo.create(url);
}

module.exports.saveUrl = saveUrl;