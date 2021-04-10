const Discord = require("discord.js")
const {users} = require('../../db.js')
const fix = (x)=> {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


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
    message.member;

    const bal = users.get(`${target.id}.balance`) || 0
    const embed = new Discord.MessageEmbed()
    .setDescription(`<@!${target.id}> has a balance of $**${fix(bal)}**`)
      message.channel.send(embed)
} 

module.exports.config = {
  name: "balance",
  description: "View a user's balance",
  category: "economy",
  aliases: ["bal", "$", "money", "credits"]
}
