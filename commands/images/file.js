
const Discord = require("discord.js")

module.exports.run = async (client, message, args, prefix) => {
    if(message.author.id != client.config.ownerid) return message.channel.send("あはっ☆")
  
    const channelid = args[0]
    const file = "../mediafiles/" + args.splice(1).join(' ')
    if(!args[0]) return message.channel.send('you didnt specify correct arguments')
    if(client.channels.cache.get(channelid)) {
      client.channels.cache.get(channelid).send({files: [file]})
      message.channel.send(`Sent file ${file} to <#${channelid}>`)
      return 
    }
    if(client.users.cache.get(channelid)){ 
      client.users.cache.get(channelid).send({files: [file]})
      message.channel.send(`Sent file ${file} to <@${channelid}>`)
      return;
    }
} 

module.exports.config = {
  name: "file",
  aliases: ["f"], 
  category: "owner",
  usage: "!file {channel ID} {file name.mp4}",
  description: "Send a file to a specified channel"
}









