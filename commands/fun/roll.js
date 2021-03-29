const Discord = require("discord.js")
const fs = require("fs")
const {db} = require("../../db.js")
const ms = require('parse-ms')
const items = require("../../json/items.js")
const { randomValue } = require("../../functions/itemFunctions.js")
module.exports.run = async (client, message, args) => {
// if(!client.config.testers.includes(message.author.id)) return message.channel.send("still in testing")
//if(message.guild.id != "673285174800416768") return

const cooldown = 39600000 // 11 hours// 43200000 12 hours

const lastRoll = db.fetch(`${message.author.id}.lastRoll`)




if (lastRoll !== null && cooldown - (Date.now() - lastRoll) > 0) {
  let time = ms(cooldown - (Date.now() - lastRoll));

  let timeEmbed = new Discord.MessageEmbed()
      .setColor(client.colors.warning)
      .setDescription(`<:pepega:715355087152873513> You've already rolled today. Try again in ${time.hours}h ${time.minutes}m `);
  return message.channel.send(timeEmbed)
}

const random = Math.floor(Math.random() * 1000)
console.log(random)
let rarity;
if(random > 550)  rarity = "common"
else if(random > 200) rarity = "uncommon"
else if(random > 25) rarity = "rare"
else rarity = "legendary" // .55, .3, .175, .025

const initial = new Discord.MessageEmbed()
  .setDescription(`<a:loading:823243026390450176> Rolling... `)
const msg = await message.channel.send(initial)


// rarity = 'legendary' // rigged here
const rolled = randomValue(items[rarity])
console.log(rolled)

console.log(`${message.author.tag} rolled ${rolled.name}`)
const embed = new Discord.MessageEmbed()
  .setAuthor(rolled.name, "https://images.emojiterra.com/google/android-pie/512px/1f3b6.png")
  .setDescription(` **Rarity**: ${rolled.rarity}\n**Band/Unit:** ${rolled.unit}\n**Role:** ${rolled.role}\n**Year of Birth:** ${rolled.birthyear}\n**Info**\n> ${rolled.description}`)
  .setThumbnail(rolled.image)
  .setFooter(`${message.author.username}'s roll`, message.author.avatarURL())
  .setColor(client.colors[rarity])
// if(rarity=='legendary') embed.setColor('7B19C8')
db.set(`${message.author.id}.lastRoll`, Date.now()) // remove for no cooldown
db.add(`${message.author.id}.inventory.${rolled.name.toLowerCase()}`, 1)
db.add(`${message.author.id}.stats.${rolled.rarity}`, 1)
db.add(`${message.author.id}.totalRolls`, 1)


setTimeout(() => {
  msg.edit("**You rolled...**", {embed: embed});
}, 4000)
const msgLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${msg.id}`
const logEmbed = await new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL())
.setDescription(`<@${message.author.id}> rolled ${rolled.name} in [**${message.guild.name}**](${msgLink})\n**Rarity**: ${rolled.rarity}\n**User ID** ${message.author.id} \n**Guild ID** ${message.guild.id}`)
.setColor(client.colors[rarity])
.setTimestamp()
.setThumbnail(rolled.image)
client.config.logChannels.forEach(channel => {
  client.channels.cache.get(channel).send(logEmbed)
})


}






  
module.exports.config = {
  name: "roll",
  description: "roll for someone",
  aliases: ['r'],
  usage: ['!r'],
  category: 'fun',
}




