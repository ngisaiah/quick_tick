const User = require('../models/User')
const request = require('request')

module.exports = {
    getCoins: (req,res)=>{
        try{
            const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest` 

            request.get({
                url: url,
                json: true,
                headers: {'X-CMC_PRO_API_KEY': process.env.API_KEY}
            },
            async (err, response, data) => {
                const user = await User.findById(req.user)
                const cmcCoin = await data.data.map(el => el.name)
                const cmcPrice = await data.data.map(el => '$'+Number(el.quote.USD.price).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2}))
                const cmcVol = await data.data.map(el => '$'+Number(el.quote.USD.volume_24h).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2}))
                const cmcMarketCap = await data.data.map(el => '$'+Number(el.quote.USD.market_cap).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2}))
                const cmc1hr = await data.data.map(el => Number(el.quote.USD.percent_change_1h).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2})+'%')
                const cmc24hr = await data.data.map(el => Number(el.quote.USD.percent_change_24h).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2})+'%')
                const cmc7day = await data.data.map(el => Number(el.quote.USD.percent_change_7d).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2})+'%')

                res.render('coin',{
                    coin: cmcCoin,
                    price: cmcPrice,
                    hr1: cmc1hr,
                    hr24: cmc24hr,
                    day7: cmc7day,
                    market_cap: cmcMarketCap,
                    volume: cmcVol,
                    favorites: user.favorites,
                })
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
                    // ADD
                    if (!user.favorites.includes(coinId)) {
                        user.favorites.push(coinId);
                    }
                } else {
                    // REMOVE
                    user.favorites = user.favorites.filter(id => id !== coinId);
                }
    
                await user.save();
    
                res.json({ success: true });
            }catch(err){
                console.log(err)
            }
        },
}    