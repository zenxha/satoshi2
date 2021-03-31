const Discord = require("discord.js")

module.exports.run = async (client, message, args, prefix) => {
    message.delete()
    const msg = await message.channel.send(`<@!${args[0]}>`)
    msg.delete()
} 

module.exports.config = {
  name: "ping",
  description: "ghost ping someone",
  category: "stuff",
  aliases: ["p"]
}
