const Discord = require("discord.js")
const {users, db, configDB} = require('../../db.js')
const ascii = require('ascii-table');
const { getUser } = require('../../functions/user.js')
module.exports.run = async (client, message, args, prefix) => {



    
    let target = getUser(client, message, args)
    let content = ''
    if (db.has(`${target.id}.inventory['ikura']`)) content+= "> <:cool:769468261020467240> Part of the ikura club"
    if(configDB.get('balTop10').includes(target.id)) content+='\n> <:universe:797697360557768774> Global Balance Top 10'
    if(configDB.get('uniqueTop10').includes(target.id)) content+='\n> <:owo:718514834076860498> Global Gacha Top 10'
    let balance = users.get(`${target.id}.balance`) || 0
    let rep = users.get(`${target.id}.reputation`) || 0
    const embed = new Discord.MessageEmbed()
        .setTitle(`${target.user.tag}'s profile`)
        .setThumbnail(target.user.avatarURL({format: 'png', dynamic: "true" ,size: 512}))
        .setDescription(content)
        .addField('Balance', '$'+balance, true)
        .addField('Reputation', rep, true)
        .setColor('RANDOM')
    message.channel.send(embed)
} 

module.exports.config = {
  name: "profile",
  description: "view profile",
  category: "fun",
  aliases: ["pr"]
}
