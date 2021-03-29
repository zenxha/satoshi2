const Discord = require("discord.js")
const {economy} = require('../../db.js')
const ascii = require('ascii-table');
module.exports.run = async (client, message, args, prefix) => {
  const all  = economy.all()
  let lb = []

  all.forEach(user => {
    userobj = {
      id: user['ID'],
      bal:  user["data"]['balance'],
    }
    
    lb.push(userobj)
  })
  
  lb.sort((a, b) => {
    return b.bal-a.bal
  })
  lb.length = 10


  const table = new ascii()
  table.setHeading('#', "Bal", "User")
  table.setHeadingAlignLeft()
  table.removeBorder()
  lb.forEach(person => {
    client.users.fetch(person.id)
    .then(table.addRow(lb.indexOf(person) + 1, person.bal, client.users.cache.get(person.id).tag))
})
  const embed = new Discord.MessageEmbed()
  .setDescription(`\`\`\`css\n`+ table+ `\`\`\`\n will be wiped soon `)
  .setColor(message.member.displayHexColor)
  .setAuthor('Wealthiest Users', message.author.avatarURL())
message.channel.send(embed)


} 

module.exports.config = {
  name: "baltop",
  description: "View the richest users",
  category: "fun",
  aliases: ["ballb", "balancelb", "richest", "lb"]
}
