const Discord = require("discord.js")
const ms = require('parse-ms')
const {users} = require('../../db.js')
module.exports.run = async (client, message, args, prefix) => {
    const dailyCooldown = 72000000 // 20 hours// 43200000 12 hours

    let lastDaily = users.fetch(`${message.author.id}.cooldowns.daily`)
    
    if(message.author.id == client.config.ownerid) lastDaily = 0
    
    
    if (lastDaily !== null && dailyCooldown - (Date.now() - lastDaily) > 0) {
      let time = ms(dailyCooldown - (Date.now() - lastDaily));
      console.log(dailyCooldown - (Date.now() - lastDaily))
      let timeEmbed = new Discord.MessageEmbed()
          .setColor(client.colors.error)
          .setDescription(`<:pepega:715355087152873513> You've already claiemd your daily today. Try again in ${time.hours}h ${time.minutes}m `);
      return message.channel.send(timeEmbed)
    }




const embed = new Discord.MessageEmbed()
.setDescription(`${client.emotes.success} You have  recieved your daily $**250** credits`)
.setColor(client.colors.success)
message.channel.send(embed)
users.set(`${message.author.id}.cooldowns.daily`, Date.now())
users.add(`${message.author.id}.balance`, 250)
} 

module.exports.config = {
  name: "daily",
  description: "Earn your well deserved money",
  category: "economy",
  aliases: ["d", 'givememoney']
}
