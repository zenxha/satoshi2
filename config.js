const db = require('quick.db')


module.exports = {
    "ownerid": "303901005710360576",
    "prefix": "!!",
    "token": "ODI0MTQzMjMxNTg2NTMzNDE2.YFrFMg.7YzcKWJrmsohEENVg0G_LzvfN9o",
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
    "emotes": {
        "music": "🎶 ",
        "error": "<:notlikethis:758569844630093855>",
        "errorID": "758569844630093855",
        "success": "<:02Deal:717110338440658994>",
        "successID": "717110338440658994",
        "repeat": "🔁",
        "pause": "⏸️",
        "resume": "⏯️",
        "stop": "⏹️"
    }
}
