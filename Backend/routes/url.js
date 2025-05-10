const express = require('express')

const  {handleURL} = require('../controllers/url')
const {handleAnalytics} = require('../controllers/url')

const urlRouter = express.Router()

urlRouter.post('/',handleURL)
urlRouter.get('/analytics/:shortId',handleAnalytics)

module.exports = urlRouter