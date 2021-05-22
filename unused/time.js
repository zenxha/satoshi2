const Discord = require("discord.js")
const ms = require('parse-ms')
module.exports.run = async (client, message, args, prefix) => {
timeLeft = ms(1620313200000 - Date.now())
if(1620313200000 - Date.now()<0) return message.channel.send('its already released go stream it https://youtu.be/O1bhZgkC4Gw')
let content = `:alarm_clock: **${timeLeft.days}**d **${timeLeft.hours}**h **${timeLeft.minutes}**m **${timeLeft.seconds}**s **${timeLeft.milliseconds}**ms until Cry Baby's release\n`
const embed = new Discord.MessageEmbed()
.setDescription(content)
.setFooter('Release Date', 'https://pbs.twimg.com/media/E0Nd6aVVEAYSbLP.jpg:large')
.setTimestamp(1620313200000)

const number = Math.floor(Math.random() * 100)
if(number == 1) embed.setDescription(content+'o')

message.channel.send(embed)

} 

module.exports.config = {
  name: "time",
  description: "View countdown until Cry Baby Release",
  category: "fun",
  aliases: ["timeuntil", 'crybabywhen', 't']
}
