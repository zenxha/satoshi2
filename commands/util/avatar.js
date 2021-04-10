const Discord = require("discord.js")

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
    const pfp = target.user.avatarURL({'dynamic': true, 'size': 4096, 'format': 'png'})
    const embed = new Discord.MessageEmbed()
    .setImage(pfp)
    .setDescription(`**[${target.user.tag}'s beautiful profile picture](${pfp})**`)
    message.channel.send(embed)
} 

module.exports.config = {
  name: "avatar",
  description: "View a profile picture (High Quality)",
  category: "util",
  aliases: ["pfp", 'pp']
}
