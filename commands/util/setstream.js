const Discord = require("discord.js")

module.exports.run = async (client, message, args, prefix) => {
    if(message.author.id != client.config.ownerid) return message.channel.send('owner only')
    if(!args[0]) return message.channel.send(`${client.emotes.error} You need to provide a link`)
    client.user.setPresence({ activity: { name: args.join(" "), type: "STREAMING", url: 'https://twitch.tv/piptea_' } })
    message.channel.send('Updated stream status')
  
} 

module.exports.config = {
  name: "setstream",
  aliases: ["stream"], 
  category: 'owner',
  usage: "!setstream {text}"
}
