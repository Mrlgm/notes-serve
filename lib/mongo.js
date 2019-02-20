const config = require('../config/default')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(config.mongodb, { useNewUrlParser: true })

const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

// 根据 id 生成创建时间 created_at
// mongoose.plugin('addCreatedAt', {
//   afterFind: function (results) {
//     results.forEach(function (item) {
//       item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
//     })
//     return results
//   },
//   afterFindOne: function (result) {
//     if (result) {
//       result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
//     }
//     return result
//   }
// })

const Schema = mongoose.Schema;

const user = new Schema({
  username: { type: 'string', required: true },
  password: { type: 'string', required: true },
  avatar: { type: 'string', required: true },
  date: { type: Date, default: Date.now },
})

const note = new Schema({
  username: { type: 'string', required: true },
  content: { type: 'string', required: true },
  grade: { type: 'number', default: 0 },
  complete:{type: 'boolean', default:false},
  createAt: { type: Date, required: true },
})

exports.User = mongoose.model('User', user)

exports.Note = mongoose.model('Note', note)