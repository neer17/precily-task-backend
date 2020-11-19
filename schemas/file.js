const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fileSchema = new Schema({
  key: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
  },
  count: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('File', fileSchema)
