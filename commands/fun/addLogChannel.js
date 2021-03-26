const Discord = require("discord.js")
const db = require('quick.db')
var configdb = new db.table('configdb')
module.exports.run = async (client, message, args, prefix) => {
    
    if (!client.channels.cache.get(args[0])) return message.channel.send('invalid channel')
    const channelid = args[0]
    configdb.push('rollLogChannels', channelid) 
    const embed = new Discord.MessageEmbed()
    .setDescription(`Will now log all gacha rolls to <#${channelid}>`)
    .setColor(client.colors.success)
    message.channel.send(embed)
} 

module.exports.config = {
  name: "addrolllogchannel",
  aliases: ["arlc"], 
  usage: "!alc"
}
