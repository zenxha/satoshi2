const Discord = require("discord.js")
const {users} = require('../../db.js') //destructuring
module.exports.run = async (client, message, args, prefix) => {
    if(message.author.id != client.config.ownerid) return
    const user =  client.users.cache.get(args[0])
    
    const amount = parseInt(args[1])
    if(isNaN(amount)) return message.channel.send('second arg not a number')
    const msg = args.splice(2).join(' ')
    if(!user)  return message.channel.send('invalid user id')
    users.add(`${user.id}.balance`, amount)
    const embed = new Discord.MessageEmbed()
    .setDescription(`${client.emotes.success} Added $**${amount}** to ${user.tag} (${user.id})'s balance`)
    .setColor(client.colors.success)
    message.channel.send(embed)
    user.send(embed.setDescription(`$**${amount}** has been added to your balance\nReason: ${msg}`))
    console.log(`Added ${amount} to ${user.id}'s balance`)
} 

module.exports.config = {
  name: "addmoney",
  description: "Add money to a user's balance",
  category: "owner",
  aliases: ["reward", 'am']
}
