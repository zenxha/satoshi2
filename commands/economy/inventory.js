const Discord = require("discord.js")
const {users} = require('../../db.js')
const items = require('../../json/treasure.js')
const { getUser } = require('../../functions/user')
module.exports.run = async (client, message, args, prefix) => {
   
  let target = getUser(client, message, args)

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
    let inv = allInv.filter(item => ['love letter', 'alien dna', 'alien rna', 'treasure', ].includes(item.id))
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
  aliases: ["inv", 'i'], 
  usage: "!inventory",
  description: "Check out your mining inventory"
}
