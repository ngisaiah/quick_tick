const User = require('../models/User')
const request = require('request')

module.exports = {
    getCoins: (req,res,next)=>{
        try{
            // API request 
            const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest` 

            request.get({
                url: url,
                json: true,
                headers: {'X-CMC_PRO_API_KEY': process.env.API_KEY}
            },
            async (err, response, data) => {
                if (err) return next(err);

                try {
                    const user = await User.findById(req.user)
                    const coins = data.data
                    
                    //store response local variables only available during reqs
                    res.locals.coin = await coins.map(el => el.name)
                    res.locals.price = await coins.map(el => '$'+Number(el.quote.USD.price).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2}))
                    res.locals.volume = await coins.map(el => '$'+Number(el.quote.USD.volume_24h).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2}))
                    res.locals.market_cap = await coins.map(el => '$'+Number(el.quote.USD.market_cap).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2}))
                    res.locals.hr1 = await coins.map(el => Number(el.quote.USD.percent_change_1h).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2})+'%')
                    res.locals.hr24 = await coins.map(el => Number(el.quote.USD.percent_change_24h).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2})+'%')
                    res.locals.day7 = await coins.map(el => Number(el.quote.USD.percent_change_7d).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2})+'%')

                    res.locals.favorites = user.favorites || [];

                    next()
                }
                catch(err){
                    console.log(err)
                }
            })

            //res.render('dashboard',{todo: itemString, left: itemsLeft, user: user.firstName,})
        }catch(err){
            console.log(err)
        }
    },
    toggleFavorite: async (req,res)=>{
            try{
                const user = await User.findById(req.user)
                const { coinId, favorite } = req.body;
    
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
    
                if (favorite) {
                    // add coin to fav
                    if (!user.favorites.includes(coinId)) {
                        user.favorites.push(coinId);
                    }
                } else {
                    // remove coin from favs
                    user.favorites = user.favorites.filter(id => id !== coinId);
                }
    
                await user.save();
    
                res.json({ success: true });
            }catch(err){
                console.log(err)
            }
        },
}    