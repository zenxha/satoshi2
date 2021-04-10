const Discord = require("discord.js")
const {users} = require('../../db.js')
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
    return b.bal-a.bal
  })
  lb.length = 10


  const table = new ascii()
  table.setHeading('#', "Bal", "Mines", 'User')
  table.setHeadingAlignLeft()
  table.removeBorder()
  lb.forEach(person => {
    client.users.fetch(person.id)
    //.then(user => {
      table.addRow(lb.indexOf(person) + 1, person.bal,person.mines, client.users.cache.get(person.id).tag)
      //console.log(person.mines)
    //})
})
  const embed = new Discord.MessageEmbed()
  .setDescription(`\`\`\`css\n`+ table+ `\`\`\`\n`)
  .setColor(message.member.displayHexColor)
  .setAuthor('Wealthiest Users', message.guild.iconURL())
message.channel.send(embed)


} 

module.exports.config = {
  name: "baltop",
  description: "View the richest users",
  category: "economy",
  aliases: ["ballb", "balancelb", "richest", "lb"]
}
