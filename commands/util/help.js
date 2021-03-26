const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {
  



if(args[0]) {
  const theCommand = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))
  if(!theCommand) return message.channel.send(`It seems like that command doesn't exist ${client.emotes.error}`)
  
  const embed = new Discord.MessageEmbed()
    .setAuthor("Command help", client.user.displayAvatarURL(), "https://google.com")
    .setDescription(`**Command: **${theCommand.config.name}\n**Description:** ${theCommand.config.description}\n**Aliases:** ${theCommand.config.aliases.join(', ')}\n**Usage:** \`${theCommand.config.usage}\``)
  message.channel.send(embed)
}


else {
  if(message.guild.id == '370076230625787904') return
  if(message.guild.id == '821504863775096852') return
  const commands = await client.commands;

  let emx = new Discord.MessageEmbed()
    .setDescription(`**["Support" server](${client.config.supportServer})**`)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter('Do !help {command} for individual command help');

  let all = {};
  for (let comm of commands.array()) {
    let category = comm.config.category || "Ones I forgot to categorize";
    let name = comm.config.name;

    if (!all[category]) {
      all[category] = [];
    }
    all[category].push(name);
  }

  for(const [key, value] of Object.entries(all)) {
    let category = key;

    let desc = "`" + value.join("`, `") + "`";

    emx.addField(`${category} [${value.length}]`, desc);
  }

  return message.channel.send(emx);
}



} 

module.exports.config = {
  name: "help",
  aliases: ['h',"hlp", "halp"]
}
