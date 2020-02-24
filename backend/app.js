const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require('node-fetch')

app.use(cors())
app.options('*', cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))

app.get('/ttt', async (req, res) => {
  let N = req.query.n
  let dataObject = {}
  let answerArr = []
  fetch('https://terriblytinytales.com/test.txt')
    .then((response) => response.text())
    .then((data) => {
      let dataArray = data
        .replace(/\n/g, ' ')
        .split(' ')
        .filter((string) => string !== '')
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i] in dataObject)
          dataObject[dataArray[i]] = dataObject[dataArray[i]] + 1
        else dataObject[dataArray[i]] = 1
      }
      let keysSortedArr = Object.keys(dataObject)
        .sort((a, b) => dataObject[a] - dataObject[b])
        .reverse()

      N = Math.min(N, keysSortedArr.length - 1)
      for (let i = 0; i < N; i++) {
        let key = keysSortedArr[i]
        answerArr.push({
          key: key,
          value: dataObject[key]
        })
      }

      res.json(JSON.stringify(answerArr))
      // res.send(keysSortedArr[keysSortedArr.length - 1])
    })
})

app.listen(process.env.PORT || '3001', () => {})
