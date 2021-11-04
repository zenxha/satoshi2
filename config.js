const db = require('quick.db')


module.exports = {
    "ownerid": "303901005710360576",
    "prefix": "!",
    "token": "insert token here",
    "inviteURL": "https://discord.com/oauth2/authorize?client_id=702380673624703047&scope=bot&permissions=8",
    "supportServer": "https://discord.gg/gMtauTz", //if any
    "testers": ["303901005710360576", "702380673624703047"],
    "logChannels": ['824470041155207188',  '810243870246961182'],
    "logchannels": db.get('rollLogChannels'),
    "colors": {
      "error": 15866927,
      "success": "#1880e4",
      "warning": "0xFFD100",
      "common": "#F8F8FF",
      "uncommon": "GREEN",
      "rare": "#40E0D0",
      "legendary": "7B19C8",

    },
    "price": {
      "common": 500,
      "uncommon": 1000,
      "rare": 2000,
      "legendary": 5000,
    },
    "emotes": {
        "music": "🎶 ",
        "error": "<:notlikethis:758569844630093855>",
        "errorID": "758569844630093855",
        "success": "<:02Deal:717110338440658994>",
        "successID": "717110338440658994",
        'loading': "<a:loading:833410989059080222>",
        "repeat": "🔁",
        "pause": "⏸️",
        "resume": "⏯️",
        "stop": "⏹️"
    }
}
