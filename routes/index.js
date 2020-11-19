require('dotenv').config()
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const FileModel = require('../schemas/file')

const log = console.log

//  connecting to mLab
console.info(`${process.env.MONGODB_URI}`)
mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false,
})

router.get('/', (req, res) => {
  res.send('Home Route')
})

router.post('/save', async (req, res) => {
  const { key, content } = req.body
  try {
    const file = await FileModel.findOne({
      key,
    }).exec()
    // log('File: ', file)

    let count
    if (file) {
      count = ++file.count
      const startTime = Date.now()
      const queryResult = await FileModel.updateOne(
        {
          key,
        },
        {
          content,
          count,
        }
      )
      log('document modified: ', queryResult.n)
      const executionTime = queryResult.opTime.ts.high_ * 1000 - startTime
      res.status(200).json({
        count,
        executionTime,
      })
    } else {
      count = 1
      const fileModel = new FileModel({
        key,
        content,
        count,
      })

      const fileSaved = await fileModel.save()
      console.log('fileSaved: ', fileSaved)
      res.status(200).json({
        count,
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

module.exports = router
