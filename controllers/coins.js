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
            (err, response, data) => {
                const cmcCoin = data.data.map(el => el.name)
                const cmcPrice = data.data.map(el => '$'+Number(el.quote.USD.price).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2}))
                const cmcVol = data.data.map(el => '$'+Number(el.quote.USD.volume_24h).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2}))
                const cmcMarketCap = data.data.map(el => '$'+Number(el.quote.USD.market_cap).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2}))
                const cmc1hr = data.data.map(el => Number(el.quote.USD.percent_change_1h).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2})+'%')
                const cmc24hr = data.data.map(el => Number(el.quote.USD.percent_change_24h).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2})+'%')
                const cmc7day = data.data.map(el => Number(el.quote.USD.percent_change_7d).toLocaleString('en-US',{minimumFractionDigits: 2,maximumFractionDigits: 2})+'%')

                if (err) return res.send({err:err})
                res.render('coin',{
                    coin: cmcCoin,
                    price: cmcPrice,
                    hr1: cmc1hr,
                    hr24: cmc24hr,
                    day7: cmc7day,
                    market_cap: cmcMarketCap,
                    volume: cmcVol,
                })
            })

            //res.render('dashboard',{todo: itemString, left: itemsLeft, user: user.firstName,})
        }catch(err){
            console.log(err)
        }
    },
}    