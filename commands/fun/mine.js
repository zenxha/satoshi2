const Discord = require("discord.js")
const {economy} = require('../../db.js')
const coolDowned = new Set()
module.exports.run = async (client, message, args, prefix) => {
    if(coolDowned.has(message.author.id)) {
      const msg = await message.channel.send("please wait your cooldown like the good human being you are")
      setTimeout(() => {
        msg.delete()
      }, 250)
    }
    else {
      const amount = Math.floor(Math.random() * 100)
      message.channel.send('you find '+ amount)
      if(message.author.id != client.config.ownerid) coolDowned.add(message.author.id)
      economy.add(`${message.author.id}.balance`, amount)
      setTimeout(() => {
        // Removes the user from the set after a minute
        coolDowned.delete(message.author.id);
      }, 80000);
    }

} 

module.exports.config = {
  name: "mine",
  aliases: ["m"], 
  usage: "!mine",
  category: 'fun',
}
