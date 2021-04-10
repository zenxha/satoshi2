const Discord = require("discord.js")
const {users} = require('../../db.js')
module.exports.run = async (client, message, args, prefix) => {

message.channel.send(users.get(`${message.author.id}.totalMines`))
} 

module.exports.config = {
  name: "mines",
  description: "View some sweet deals",
  category: "economy",
  aliases: []
}
