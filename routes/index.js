const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const todosController = require('../controllers/todos') 
const coinController = require('../controllers/coins') 

//GET '/'
router.get('/', ensureGuest, (req,res)=>{
    res.render('login', {
        layout: 'login'
    })
})

//GET '/dashboard'
router.get('/dashboard', todosController.getTodos, coinController.getCoins, ensureAuth,(req,res)=>{
    res.render('dashboard')
})


module.exports = router