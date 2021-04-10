const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {
  
  const commandName = args[0].toLowerCase();
  const command = client.commands.get(commandName)
    

  if (!command) {
    return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
  }

  const commandFolders = fs.readdirSync('./commands');
  const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

  delete require.cache[require.resolve(`./${folderName}/${command.name}.js`)];

  try {
    const newCommand = require(`../${folderName}/${command.name}.js`);
    message.client.commands.set(newCommand.name, newCommand);
    message.channel.send(`Command \`${command.name}\` was reloaded!`);
  } catch (error) {
    console.error(error);
    message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
  }
} 

module.exports.config = {
  name: "reload",
  category: "owner",
  description: "Reload a command",
  usage: "!reload whohas",
  aliases: []
}
