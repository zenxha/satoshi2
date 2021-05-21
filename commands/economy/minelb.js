const Discord = require("discord.js")
const {users, configDB} = require('../../db.js')
const ascii = require('ascii-table');
module.exports.run = async (client, message, args, prefix) => {
  const all  = users.all()
  let lb = []

  all.forEach(user => {
    userobj = {
      id: user['ID'],
      bal:  user["data"]['balance'],
      mines: user['data']['totalMines']
    }
    
    lb.push(userobj)
  })
  
  lb.sort((a, b) => {
    return b.mines-a.mines
  })
  lb.length = 10


  const table = new ascii()
  // table.setHeading('#', "Bal", "Mines", 'User')
  table.setHeading('#', "Trips", 'User')
  table.setHeadingAlignLeft()
  table.removeBorder()
  lb.forEach(person => {
    client.users.fetch(person.id)
    //.then(user => {
      // table.addRow(lb.indexOf(person) + 1, person.bal,person.mines, client.users.cache.get(person.id).tag)
      table.addRow(lb.indexOf(person) + 1, person.mines, client.users.cache.get(person.id).tag)
      //console.log(person.mines)
    //})
})
configDB.set('minersTop10', lb.map(a => a.id))
  const embed = new Discord.MessageEmbed()
  .setDescription(`\`\`\`fix\n`+ table+ `\`\`\`\n`)
  .setColor(message.member.displayHexColor)
  .setAuthor('Most Mines', message.guild.iconURL())
  .setThumbnail(client.users.cache.get(lb[0].id).avatarURL({'dynamic': 'true'}))
message.channel.send(embed)


} 

module.exports.config = {
  name: "minelb",
  description: "View the richest users",
  category: "economy",
  aliases: ["tm", "topmines", 'topminers']
}
