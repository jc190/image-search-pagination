const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  searchTerm: String,
  timeStamp: String
});

const searchRecord = module.exports = mongoose.model('Record', recordSchema);

module.exports.recordSearch = (record) => {
  return record.save();
};

module.exports.getLatest = () => {
   return searchRecord.find().sort({ timeStamp: -1 }).limit(10).exec();
};
