const Discord = require("discord.js")
const { db, configDB} = require('../../db.js')
const ascii = require('ascii-table')
module.exports.run = async (client, message, args, prefix) => {
    const all  = db.all()
    let lb = []
  
    all.forEach(user => {
      userobj = {
        id: user['ID'],
        count:  Object.keys(user["data"]['inventory']).length,
      }
      
      lb.push(userobj)
    })
    
    lb.sort((a, b) => {
      return b.count-a.count
    })
    const allList = lb.map(a=>a.id)
    lb.length = 10
  
  
    const table = new ascii()
    // table.setHeading('#', "Bal", "Mines", 'User')
    table.setHeading('#', "# Collected", 'User')
    table.setHeadingAlignLeft()
    table.removeBorder()
    lb.forEach(person => {
      client.users.fetch(person.id)
      //.then(user => {
        // table.addRow(lb.indexOf(person) + 1, person.bal,person.mines, client.users.cache.get(person.id).tag)
        table.addRow(lb.indexOf(person) + 1, person.count, client.users.cache.get(person.id).tag)
        //console.log(person.mines)
      //})
  })
  configDB.set('uniqueTop10', lb.map(a => a.id))
    const embed = new Discord.MessageEmbed()
    .setDescription(`\`\`\`css\n`+ table+ `\`\`\`\n`)
    .setColor()
    .setFooter('You rank ' + (allList.indexOf(message.author.id) + 1).toString() + ' out of '+ allList.length + ' • Season 1', message.author.avatarURL())
    .setAuthor('Gacha Leaderboard', message.guild.iconURL())
    .setThumbnail(client.users.cache.get(lb[0].id).avatarURL({'dynamic': 'true'}))
  message.channel.send(embed)
  
  
} 

module.exports.config = {
  name: "top",
  description: "View gacha leaderboard",
  category: "fun",
  aliases: ["lb", 'leaderboard', 'gachalb']
}
