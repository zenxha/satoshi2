const Discord = require("discord.js")
const {users, db} = require('../../db.js')
const ascii = require('ascii-table');
module.exports.run = async (client, message, args, prefix) => {



    
    let target =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.guild.members.cache.find(
      r =>
        r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
    ) ||
    message.guild.members.cache.find(
      r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
    ) ||
    message.member;
    let content = ''
    if (db.has(`${target.id}.inventory['ikura']`)) content+= "> <:cool:769468261020467240> Part of the ikura club"

    let balance = users.get(`${target.id}.balance`) || 0
    
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${target.user.tag}'s profile`)
        .setThumbnail(target.user.avatarURL({format: 'png', dynamic: "true" ,size: 512}))
        .setDescription(content)
        .addField('Balance', '$'+balance)
        .setColor('RANDOM')
    message.channel.send(embed)
} 

module.exports.config = {
  name: "profile",
  description: "view profile",
  category: "fun",
  aliases: ["pr"]
}
