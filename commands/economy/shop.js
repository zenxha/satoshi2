const Discord = require("discord.js")
const {users ,db} = require('../../db.js')
const ascii = require('ascii-table');
const shop = require('../../json/shopItems')
module.exports.run = async (client, message, args, prefix) => {
  let text = []
  for (const item in shop) {
    console.log(item)
    text.push(`${shop[item].emote} ${shop[item].name}\n> $**${shop[item].price}**\n> ${shop[item].description}`)
  }
 const embed = new Discord.MessageEmbed()
 .setAuthor(`Satoshi's shop`, 'http://owo.whats-th.is/6bngewr.png')
 .setDescription(text.join('\n'))
.setImage('https://pbs.twimg.com/media/DcUZBJOXcAECqKA.jpg')
 .setFooter('Use !buy to buy an item • Current bal: $'+users.get(`${message.author.id}.balance`), message.author.avatarURL())
 .setColor('RANDOM')
 
message.channel.send(embed)


}

module.exports.config = {
  name: "shop",
  description: "Check out some sweet deals",
  category: "economy",
  aliases: ["store", 'market']
}
