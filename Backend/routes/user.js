const express = require('express')
const {handleLogin,handleUser, handleLogout} = require('../controllers/user')

const router = express.Router()

router.post('/',handleUser)
router.post('/login',handleLogin)
router.post('/logout',handleLogout)

module.exports = router