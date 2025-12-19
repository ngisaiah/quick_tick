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
    res.render('dashboard', {
        todo: res.locals.todos,
        left: res.locals.itemsLeft,
        user: res.locals.userName,

        coin: res.locals.coin,
        price: res.locals.price,
        hr1: res.locals.hr1,
        hr24: res.locals.hr24,
        day7: res.locals.day7,
        market_cap: res.locals.market_cap,
        volume: res.locals.volume,
        favorites: res.locals.favorites
    })
})


module.exports = router