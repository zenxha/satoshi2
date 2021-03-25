const Discord = require("discord.js")

module.exports.run = async (client, message, args, prefix) => {
  
const exampleEmbed = new Discord.MessageEmbed()
	.setColor(client.config.colors.success)
  .setAuthor(`Invite links`, client.user.avatarURL())
  .setDescription(`**[Invite Link](${client.config.inviteURL})\n[Support Server](${client.config.supportServer})**`)
	.setTimestamp()
message.channel.send(exampleEmbed)
  
} 

module.exports.config = {
  name: "invite",
  aliases: ["support"]
}
