const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {
  
    if(!args || args.length < 1) return message.reply("Must provide a command name to reload.");
    const commandName = args[0];
    // Check if the command exists and is valid
    if(!client.commands.has(commandName)) {
      return message.reply("That command does not exist");
    }
    // the path is relative to the *current folder*, so just ./filename.js
    fs.readdirSync("./commands").forEach(dir => {
      commandFile = fs.readdirSync(`./commands/${dir}/`).filter(f => f.split(".").shift() === commandName)
      console.log(`./commands/${dir}/commandFile`)
      delete require.cache[require.resolve(`./commands/${dir}/${commandFile}`)]
      const props = require(`./commands/${dir}/commandFile`)
      client.commands.set(commandName, props)
      message.channel.send(`${client.emotes.success} Successfully reloaded ${commandName}`)
    })
    /*
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // We also need to delete and reload the command from the client.commands Enmap
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.channel.send("Reloaded "+ commandName + " command")
    */
} 

module.exports.config = {
  name: "reload",
  category: "owner",
  description: "Reload a command",
  usage: "!reload whohas",
  aliases: []
}
