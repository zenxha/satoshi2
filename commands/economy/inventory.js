const Discord = require("discord.js")
const {users} = require('../../db.js')
const items = require('../../json/treasure.js')
module.exports.run = async (client, message, args, prefix) => {
   
  let target =
  message.mentions.members.first() ||
  message.guild.members.cache.get(args[0]) ||
  message.guild.members.cache.find(
    r =>
      r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
  ) ||
  message.guild.members.cache.find(
    r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
  ) ||
  client.users.cache.get(args[0]) || 
  message.member;

  let all = []
  const stats = users.get(`${target.id}.stats`)


  for(const rarity of Object.values(items)) {
    for(const item of Object.values(rarity)) {
      all.push(item)
    }
  }
  
  let statsArray = []
  for(const [a, count] of Object.entries(stats)) {
  
    let allInv = all.filter(item => item.id === a)
    let inv = allInv.filter(item => ['love letter', 'alien dna', 'alien rna', 'treasure', 'kenshi 1'].includes(item.id))
    inv.forEach(thing => {
      statsArray.push({'name': thing.name, 'count': count, 'worth': thing.worth})
    })
    
  }
  let msgContent = ""
  statsArray.forEach(item => {
    const total = item.worth * item.count
    msgContent+=`\n**${item.name}**\n> Times found: **${item.count}**x\n> Total Earnings: $**${total}**`
  })
  const embed = new Discord.MessageEmbed()
  .setDescription(msgContent + "\n\n **Total mines:** "+ users.get(`${target.id}.totalMines`))
  .setAuthor(target.user.tag+'\'s mining stats', target.user.avatarURL())
  message.channel.send(embed)
} 

module.exports.config = {
  name: "inventory",
  aliases: ["inv"], 
  usage: "!inventory"
}
