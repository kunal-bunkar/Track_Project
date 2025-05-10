const express = require('express')
const {handleLogin,handleUser} = require('../controllers/user')

const router = express.Router()

router.post('/',handleUser)
router.post('/login',handleLogin)

module.exports = router