const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {
  



if(args[0]) {
  const command = client.commands.get(args[0])
  if(!command) return message.channel.send(`It seems like that command doesn't exist ${client.emotes.error}`)
  
  const embed = new Discord.MessageEmbed()
    .setAuthor("Command help", client.user.displayAvatarURL(), "https://google.com")
    .setDescription(`**Command: **${command.config.name}\n**Description:** ${command.config.description}`)
  message.channel.send(embed)
}


else {
  message.channel.send('Do !help {command name}')
}



} 

module.exports.config = {
  name: "help",
  aliases: ['h',"hlp", "halp"]
}
