const Discord = require("discord.js")
const { getUser } = require('../../functions/user.js')
module.exports.run = async (client, message, args, prefix) => {

    let target = getUser(client, message, args)
    const pfp = target.user.avatarURL({'dynamic': true, 'size': 4096, 'format': 'png'})
    const array = ['beautiful', 'amazing', "epic", "cute", "inspiring"]
    const compliment = array[Math.floor(Math.random()*array.length)]
    const embed = new Discord.MessageEmbed()
    .setImage(pfp)
    .setDescription(`**[${target.user.tag}'s profile picture](${pfp})**`)
    message.channel.send(embed)
} 

module.exports.config = {
  name: "avatar",
  description: "View a profile picture (High Quality)",
  category: "util",
  aliases: ["pfp", 'pp']
}
