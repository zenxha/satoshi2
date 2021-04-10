const ms = require('parse-ms')
const cooldown = 39600000
const {db, users} = require('../db.js')
module.exports = {
    "boost": {
        "name": "Boost",
        "price": 1000,
        "id": "boost",
        "description": "Reduce your roll cooldown by an hour.",
        "emote": ':syringe:',
        run: async (client, message, lastRoll) => {
            let time = cooldown - (Date.now() - lastRoll);
           
            if(time<=0) return {worked: false, msg: "You can roll rn, no need to buy this", color: client.colors.error}
            
                db.subtract(`${message.author.id}.lastRoll`, 3600000)
                
                const newCooldown = cooldown - (Date.now() - db.get(`${message.author.id}.lastRoll`))
                const newParsed = ms(newCooldown)
                console.log(newParsed)
               
               return {worked: true, msg: `You can now roll in **${newParsed.hours}**h **${newParsed.minutes}**m`, color: client.colors.success}
            
        }
    },
    "air": {
        "name": "Air",
        "price": 1,
        "id": "air",
        "description": "Does absolutely nothing",
        "emote": '🌬️',
        run: async (client, message, lastRoll) => {
                returnmsg = ['You feel a bit better about yourself', 'Was it really worth it? :thinking:'][Math.floor(Math.random() * 2)]               
               return {worked: true, msg: returnmsg, color: client.colors.success}
            
        }
    },


}