const Discord = require("discord.js")
const db = require('quick.db')
const { randomValue, randomKey, getRarity } = require("../../functions/itemFunctions.js")
const items = require('../../json/items.js')
module.exports.run = async (client, message, args, prefix) => {

    let  uncommon = 0
    let common = 0
    let legendary = 0
    let rare = 0

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


    let inv =  db.get(`${target.id}.inventory`)
    const error = new Discord.MessageEmbed()
    .setDescription(`No inventory found for that user, try \`${prefix}roll\` first`)
    .setColor(client.colors.warning)
    if(inv === null) return message.channel.send(error)
    Object.entries(inv).forEach(entry => {
        if (entry[0] in items.common)  {
            common = common + entry[1];
        }
        if (entry[0] in items.uncommon) return uncommon = uncommon + entry[1];
        if (entry[0] in items.rare) return rare = rare + entry[1];
        if (entry[0] in items.legendary) return legendary = legendary + entry[1];
        // description.push(`${entry[0]} \n> **${entry[1]}x** `)

  })
    // embed.setDescription(description.join('\n'))
    // const luckyItem = randomValue(items[randomKey(items)]) // for ALL items
    db.set(`${target.id}.stats.common`, common)
    db.set(`${target.id}.stats.uncommon`, uncommon)
    db.set(`${target.id}.stats.rare`, rare)
    db.set(`${target.id}.stats.legendary`, legendary)

    // /* for only ones in inv
    const luckyKey = randomKey(inv)
    console.log(luckyKey)
    let rarity = getRarity(luckyKey)
    const luckyItem = items[rarity][luckyKey]
    // */
    const total = common + uncommon + rare + legendary   

     // db.set(`${target.user.id}.totalRolls`, total)

    const embed = new Discord.MessageEmbed()
    .setDescription(`Commons \n> ${common}\n Uncommons \n> ${uncommon}\n Rares\n> ${rare}\n Legendaries\n> ${legendary}`)
    .setAuthor(`${target.user.username}'s stats`, target.user.avatarURL())
    .setThumbnail(luckyItem.image)
    .setFooter(`Featuring ${luckyItem.name}`)
    await message.channel.send(embed)
    console.log()
} 

module.exports.config = {
  name: "stats",
  aliases: ["s"], 
  usage: "!stats"
}
