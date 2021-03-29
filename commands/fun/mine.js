const Discord = require("discord.js")
const {economy} = require('../../db.js')
const coolDowned = new Set()
module.exports.run = async (client, message, args, prefix) => {
    if(coolDowned.has(message.author.id)) {
      const msg = await message.channel.send("please wait your cooldown like the good human being you are :p")
      setTimeout(() => {
        msg.delete()
      }, 250)
    }
    else {
      let amount = Math.floor(Math.random() * 100)
      if(message.author.id == '222557195970019330') {
        coolDowned.add(message.author.id)
        economy.add(`${message.author.id}.balance`, amount)
         message.channel.send(`you find ${amount}  DOLPHINS :dolphin:`)
      }
      
      else {
        const stuff = [
        `you find $${amount} on the streets. As a poor, pitiful victim of capitalism, you pick it up with hasty reluctance to ease your materialistic mind.`, 
        `you find $${amount} in your mom\'s sweatshirt while doing laundry. *yoink*`,
        `You meet satocchan out in the city. He gives you a copy of <:universe:797697360557768774> Universe single and $${amount}`,
        `You earn an undeserved $${amount}. Why undeserved? Because a child is starving in Africa. `,
        `You successfully convert someone to jpop, have $${amount}`,
        `You stumble upon zeph, your favorite kpop idol, in public. She gives you $${amount} and a huge smile`,
        `Out of nowhere, Kenshi Yonezu materializes 3 centimeters away from you and drops $${amount}. Before you have time to recover from your shock, he disappears with a "nyan" <:pepega:715355087152873513>`,
        `On your nightly stroll, someone recognizes you and gives you $${amount}. Since when were you popular? 🤨`
         ]
      
      const themsg = stuff[Math.floor(Math.random() * stuff.length)]
      if(amount == 69) themsg + ' (nice)'
        message.channel.send(themsg) 
        if(message.author.id != client.config.ownerid) coolDowned.add(message.author.id)
        economy.add(`${message.author.id}.balance`, amount)
      }


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
