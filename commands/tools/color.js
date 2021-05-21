const Discord = require("discord.js")

module.exports.run = async (client, message, args, prefix) => {

    if(message.guild.id != '750219495485997086') return

    const role = message.guild.roles.cache.find(r => {
        r.id === '773083898128105492'
        if(message.member.roles.cache.has(r)) return true
        else return false
        
    }
    )
    if(!role) return message.channel.send('p')
    console.log(role.name)

    const embed = new Discord.MessageEmbed()
    .setColor(args[0])
    .setDescription('Set color to ' + args[0])
    message.channel.send(embed)
   // role.setColor(args[0])



} 

module.exports.config = {
  name: "color",
  description: "Change your role color (Itan na star and Universe only)",
  category: "tools",
  aliases: ["c"]
}
