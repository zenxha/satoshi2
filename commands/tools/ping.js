const Discord = require("discord.js")
const { getUserExact } = require('../../functions/user.js')
module.exports.run = async (client, message, args, prefix) => {
    message.delete()
    const msg = await message.channel.send(`<@!${getUserExact(client, message, args).id}>`)
    msg.delete()
} 

module.exports.config = {
  name: "ghostping",
  description: "ghost ping someone",
  category: "stuff",
  aliases: ["p", "ping", "gp"]
}
