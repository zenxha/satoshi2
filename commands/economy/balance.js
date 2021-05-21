const Discord = require("discord.js")
const {users} = require('../../db.js')
const {getUser} = require('../../functions/user.js')
const fix = (x)=> {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


module.exports.run = async (client, message, args, prefix) => {
    let target = getUser(client, message, args)
    const bal = users.get(`${target.id}.balance`) || 0
    const embed = new Discord.MessageEmbed()
    .setDescription(`<@!${target.id}> has a balance of $**${fix(bal)}**`)
      
    if(bal > 10000) embed.setColor(1044734)
    message.channel.send(embed)
} 

module.exports.config = {
  name: "balance",
  description: "View a user's balance",
  category: "economy",
  aliases: ["bal", "$", "money", "credits"]
}
