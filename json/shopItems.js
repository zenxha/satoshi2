const ms = require('parse-ms')
const cooldown = 39600000
const {db, users} = require('../db.js')
module.exports = {
    "boost": {
        "name": "Boost",
        "price": 750,
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
    "caffeine": {
        "name": "Caffeine",
        "price": 3000,
        "id": "caffeine",
        "description": "Reduce your roll cooldown by 5 hours.",
        "emote": ':coffee:',
        run: async (client, message, lastRoll) => {
            let time = cooldown - (Date.now() - lastRoll);
           
            if(time<=0) return {worked: false, msg: "You can roll rn, no need to buy this", color: client.colors.error}
            
                db.subtract(`${message.author.id}.lastRoll`, 18000000)
                
                const newCooldown = cooldown - (Date.now() - db.get(`${message.author.id}.lastRoll`))
                const newParsed = ms(newCooldown)
                console.log(newParsed)
               
               return {worked: true, msg: `You can now roll in **${newParsed.hours}**h **${newParsed.minutes}**m`, color: client.colors.success}
            
        }
    },
    "sax.mp4" : {
        "name": "sax.mp4",
        "price": 100,
        "id": "sax.mp4",
        "description": "zero no mama de iraretara~",
        "emote": ':musical_note:',
        run: async (client, message, lastRoll) => {
            const Discord = require('discord.js')
                returnmsg = ['Enjoy :musical_note:'][Math.floor(Math.random() * 1)]      
                
                message.author.send('Here is your sax.mp4' )    
                message.author.send('https://cdn.discordapp.com/attachments/822304165153079326/843531070350950410/owo_whats_this.mp4')     
               return {worked: true, msg: returnmsg, color: client.colors.success}
            
        }
        
    },
    "last song.mp4" : {
        "name": "last song.mp4",
        "price": 200,
        "id": "last song.mp4",
        "description": "piano insta live ver.",
        "emote": ':musical_note:',
        run: async (client, message, lastRoll) => {
            const Discord = require('discord.js')
                returnmsg = ['Enjoy :musical_note:'][Math.floor(Math.random() * 1)]      
                
                message.author.send('Here is your last song.mp4' )    
                message.author.send('https://cdn.discordapp.com/attachments/837038571830902805/837038774768500743/Last_Song_2.mp4')     
               return {worked: true, msg: returnmsg, color: client.colors.success}
            
        }
        
    },
    /*
    "<:tamagowo:784491893316255844>": {
        "name": "",
        "price": 100000009,
        "id": "<:tamagowo:784491893316255844>",
        "description": "(does nothing)",
        "emote": '<:tamagowo:784491893316255844>',
        run: async (client, message, lastRoll) => {

               return {worked: true, msg: `what have u done`, color: client.colors.success}
            
        }
    },
   
 
    /*
    "yesterday.mp4" : {
        "name": "yesterday.mp4",
        "price": 500,
        "id": "yesterday.mp4",
        "description": "Bye bye yesterday, gomenne",
        "emote": ':musical_note:',
        run: async (client, message, lastRoll) => {
            const Discord = require('discord.js')
                returnmsg = ['Enjoy :musical_note:'][Math.floor(Math.random() * 1)]      
                const file = new Discord.MessageAttachment('../mediafiles/yesterday.mp4')
                message.author.send('Here is your audio02', file)         
               return {worked: true, msg: returnmsg, color: client.colors.success}
            
        }
        
    },
    
*/

}