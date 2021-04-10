const Discord = require("discord.js")
const {users} = require('../../db.js')
const {randomValue} = require('../../functions/itemFunctions')
const coolDowned = new Set()
const items = require('../../json/treasure.js')

module.exports.run = async (client, message, args, prefix) => {
  //if(message.guild.id == '750219495485997086') return
    if(coolDowned.has(message.author.id)) {
      const msg = await message.channel.send("please wait your cooldown like the good human being you are :p")
      setTimeout(() => {
        msg.delete()
      }, 250)
    }
    else {
      let factor = Math.floor(Math.random() * 1000)
      let item;
   
      if (factor > 600) item = "nothing"
      else if (factor > 300) item = randomValue(items.trash)
      else if(factor > 50) item = randomValue(items.cool)
      else if(factor > 10) item = randomValue(items.rare)
      else if(factor == 1) item = randomValue(items.ultra)
      else item = randomValue(items.superrare)
      console.log(factor)
      console.log(item)
      





      /*
        const stuff = [
        `you find $${amount} on the streets. As a poor, pitiful victim of capitalism, you pick it up with hasty reluctance to ease your materialistic mind.`, 

        `You meet satocchan out in the city. He gives you a copy of <:universe:797697360557768774> Universe single and $${amount}`,
        `You successfully convert someone to jpop, have $${amount}`,
        `You stumble upon zeph, your favorite kpop idol, in public. She gives you $${amount} and a huge smile`,
        `Kenshi Yonezu materializes 3 centimeters away from you and drops $${amount}. Before you have time to recover from your shock, he disappears with a "nyan" <:pepega:715355087152873513>`,
        `On your nightly stroll, someone recognizes you and gives you $${amount}. Since when were you popular? 🤨`,
       
         ]
      */
        // let themsg = stuff[Math.floor(Math.random() * stuff.length)]
        if(item!="nothing") {
          let text = item.text
          if(Array.isArray(item.text)) text = item.text[Math.floor(Math.random() * item.text.length)]
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${item.name}**\n> ${item.text}`)
        .setFooter(`Added $${item.worth} to your balance`, message.author.avatarURL())
        .setColor(item.color)
        message.channel.send("You find...", {embed: embed}) 
        users.add(`${message.author.id}.stats.${item.id}`, 1)
        users.add(`${message.author.id}.totalMines`, 1)
        users.add(`${message.author.id}.balance`, item.worth)
        } else {
          const embed2 = new Discord.MessageEmbed()
          .setDescription('> Nothing, not even boring rocks')
          message.channel.send("You find...", {embed: embed2})  
        }
        // if(message.author.id != client.config.ownerid) coolDowned.add(message.author.id)
        coolDowned.add(message.author.id)

      setTimeout(() => {
        // Removes the user from the set after a minute
        coolDowned.delete(message.author.id);
      }, 60000);
    }

} 

module.exports.config = {
  name: "mine",
  aliases: ["m"], 
  description: "Mining away, I don't know what to mine. I'll mine it anyway",
  usage: "!mine",
  category: 'economy',
}
