const Discord = require("discord.js")

module.exports.run = async (client, message, args, prefix) => {

message.channel.send(example)
} 

module.exports.config = {
  name: "shop",
  description: "View some sweet deals",
  category: "economy",
  aliases: ["store", 'market']
}
