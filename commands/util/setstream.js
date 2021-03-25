const Discord = require("discord.js")

module.exports.run = async (client, message, args, prefix) => {
    if(message.author.id != client.config.ownerid) return message.channel.send('owner only')
    if(!args[0]) return message.channel.send(`${client.emotes.error} You need to provide a link`)
    client.user.setPresence({ activity: { name: args.slice(1).join(" "), type: "STREAMING", url: args[0] } })
    message.channel.send('Updated stream status')
  
} 

module.exports.config = {
  name: "setstream",
  aliases: ["stream"], 
  usage: "!setstream {stream URL} {text}"
}
