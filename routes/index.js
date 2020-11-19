require('dotenv').config()
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const FileModel = require('../schemas/file')

const log = console.log

//  connecting to mLab
console.info(`${process.env.MONGODB_URI}`)
mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true })

router.get('/', (req, res) => {
  res.send('Home Route')
})

router.post('/save', async (req, res) => {
  const { key, content } = req.body
  console.log(`key: ${key} \n content: ${content}`)
  try {
    const file = await FileModel.find({
      key,
    }).exec()
    log('File: ', file)

    let fileModel
    if (file) {
      let { count } = file
      count++
      fileModel = new FileModel({
        ...file,
        count,
      })
    } else {
      fileModel = new FileModel({
        ...file,
        count,
      })
    }

    const isFileSaved = await fileModel.save()
    console.log('isFileSaved: ', isFileSaved)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
