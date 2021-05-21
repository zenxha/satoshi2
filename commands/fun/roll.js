const Discord = require("discord.js")
const fs = require("fs")
const {db, users} = require("../../db.js")
const ms = require('parse-ms')
const items = require("../../json/items.js")
const { randomValue } = require("../../functions/itemFunctions.js")
const coolDowned = new Set()
module.exports.run = async (client, message, args) => {
// if(!client.config.testers.includes(message.author.id)) return message.channel.send("still in testing")
//if(message.guild.id != "673285174800416768") return
if(coolDowned.has(message.author.id)) {
  const msg = await message.channel.send("please wait 5s before u run this command again")

  return;
}

else {
  setTimeout(() => {
    // Removes the user from the set after a minute
    coolDowned.delete(message.author.id);
  }, 5000);
  
  
const cooldown = 39600000 // 11 hours// 43200000 12 hours

const lastRoll = db.fetch(`${message.author.id}.lastRoll`)
coolDowned.add(message.author.id)



if (lastRoll !== null && cooldown - (Date.now() - lastRoll) > 0) {
  let time = ms(cooldown - (Date.now() - lastRoll));
  console.log(cooldown - (Date.now() - lastRoll))
  let timeEmbed = new Discord.MessageEmbed()
      .setColor(client.colors.warning)
      .setDescription(`<:pepega:715355087152873513> You've already rolled today. Try again in ${time.hours}h ${time.minutes}m `);
  return message.channel.send(timeEmbed)
}

const random = Math.floor(Math.random() * 1000)
console.log('roll random number ' + random)
let rarity;
if(random > 500)  rarity = "common"
else if(random > 210) rarity = "uncommon"
else if(random > 10) rarity = "rare"
else rarity = "legendary" // .55, .3, .175, .025

const initial = new Discord.MessageEmbed()
  .setDescription(`<a:loading:823243026390450176> Rolling... `)
const msg = await message.channel.send(initial)


// rarity = 'legendary' // rigged here
const rolled = randomValue(items[rarity])
const msgLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${msg.id}`

let text = ` **Rarity**: ${rolled.rarity}\n**Band/Unit:** ${rolled.unit}\n**Role:** ${rolled.role}\n**Year of Birth:** ${rolled.birthyear}\n**Info**\n> ${rolled.description}`

let logText = `<@${message.author.id}> rolled ${rolled.name} in [**${message.guild.name}**](${msgLink})\n**Rarity**: ${rolled.rarity}\n**User ID** ${message.author.id} \n**Guild ID** ${message.guild.id}`

if(db.has(`${message.author.id}.inventory[${rolled.name.toLowerCase()}]`)) {
  text+=`\n\nYou've already rolled this person. \n$**${client.config.price[rolled.rarity]}** has been added to your account`
  logText+=`\n> Duplicate roll, rewarded an additional $**${client.config.price[rolled.rarity]}**`
  users.add(`${message.author.id}.balance`, client.config.price[rolled.rarity])
}

const embed = new Discord.MessageEmbed()
  .setAuthor(rolled.name, "https://images.emojiterra.com/google/android-pie/512px/1f3b6.png")
  .setDescription(text)
  .setThumbnail(rolled.image)
  .setFooter(`${message.author.username}'s roll`, message.author.avatarURL())
  .setColor(client.colors[rarity])
// if(rarity=='legendary') embed.setColor('7B19C8')
db.set(`${message.author.id}.lastRoll`, Date.now()) // remove for no cooldown
db.add(`${message.author.id}.inventory.${rolled.name.toLowerCase()}`, 1)
db.add(`${message.author.id}.stats.${rolled.rarity}`, 1)
db.add(`${message.author.id}.totalRolls`, 1)
if(!db.has(`${message.author.id}.inventory.${rolled.name.toLowerCase()}`)) db.add(`${message.author.id}.totalUnique`, 1)
// prank start lol
/*
const prank = new Discord.MessageEmbed()
.setAuthor('Kenshi Yonezu', "https://images.emojiterra.com/google/android-pie/512px/1f3b6.png")
.setDescription(` **Rarity**: LEGENDARY \n**Band/Unit:**N/A \n**Role:** Soloist\n**Year of Birth:** 1991 \n**Info**\n> KING OF JPOP :crown:`)
.setThumbnail('https://media.vgm.io/artists/12/15121/15121-1562982434.png')
.setFooter(`${message.author.username}'s roll`, message.author.avatarURL())
.setColor(client.colors.legendary)
*/

setTimeout(() => {
  msg.edit("**You rolled...**", {embed: embed})
  const logEmbed =  new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL())
  .setDescription(logText)
  .setColor(client.colors[rarity])
  .setTimestamp()
  .setThumbnail(rolled.image)
  client.config.logChannels.forEach(channel => {
    client.channels.cache.get(channel).send(logEmbed)
  })
}, 4000)
}



}






  
module.exports.config = {
  name: "roll",
  description: "roll for a JPOP artist",
  aliases: ['r'],
  usage: ['!r'],
  category: 'fun',
}




