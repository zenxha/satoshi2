const Discord = require("discord.js")
const {economy} = require('../../db.js')
const ascii = require('ascii-table');
module.exports.run = async (client, message, args, prefix) => {
 const embed = new Discord.MessageEmbed()
 .setAuthor(`Satoshi's shop`, client.user.avatarURL())
 .setDescription('Nothing for sale... yet.')
 .setFooter('Use !buy to buy an item')
 .setColor('RANDOM')
message.channel.send(embed)
} 

module.exports.config = {
  name: "shop",
  description: "View some sweet deals",
  category: "fun",
  aliases: ["store", 'market']
}
