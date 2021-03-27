const Discord = require("discord.js")
const db = require('quick.db')

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

    const bal = db.get(`${target.id}.balance`) || 0
    const embed = new Discord.MessageEmbed()
    .setDescription(`<@!${target.id}> has a balance of $${bal}`)
      message.channel.send(embed)
} 

module.exports.config = {
  name: "balance",
  description: "View a user's balance",
  category: "fun",
  aliases: ["bal", "$", "money", "credits"]
}
