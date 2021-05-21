const Discord = require("discord.js")
const {db} = require('../../db.js')
const { randomValue, randomKey, getRarity, getCount } = require("../../functions/itemFunctions.js")
const items = require('../../json/items.js')
const {getUser} = require('../../functions/user.js')
module.exports.run = async (client, message, args, prefix) => {

    let target = getUser(client, message, args)


    let inv =  db.get(`${target.id}.inventory`)
    const error = new Discord.MessageEmbed()
    .setDescription(`No inventory found for that user, try \`${prefix}roll\` first`)
    .setColor(client.colors.warning)
    if(inv === null) return message.channel.send(error)

    const foundCount = Object.keys(inv).length
    const totalCount = getCount()




    /*
    Object.entries(inv).forEach(entry => {
        if (entry[0] in items.common)  {
            common = common + entry[1];
        }
        if (entry[0] in items.uncommon) return uncommon = uncommon + entry[1];
        if (entry[0] in items.rare) return rare = rare + entry[1];
        if (entry[0] in items.legendary) return legendary = legendary + entry[1];
        // description.push(`${entry[0]} \n> **${entry[1]}x** `)

  })
    //STORING COUNTS IN DB NOW
  */
    // embed.setDescription(description.join('\n'))
    // const luckyItem = randomValue(items[randomKey(items)]) // for ALL items

 
    let common = db.get(`${target.id}.stats.common`) || 0
    let uncommon = db.get(`${target.id}.stats.uncommon`) || 0
    let rare = db.get(`${target.id}.stats.rare`) || 0
    let legendary = db.get(`${target.id}.stats.legendary`) || 0

    // /* for only ones in inv
    const luckyKey = randomKey(inv)
    console.log(luckyKey)
    let rarity = getRarity(luckyKey)
    const luckyItem = items[rarity][luckyKey]
    // */

    const embed = new Discord.MessageEmbed()
    .setDescription(`Commons \n> ${common}\n Uncommons \n> ${uncommon}\n Rares\n> ${rare}\n Legendaries\n> ${legendary}\n Mythicals\n> 0\n\n**${foundCount}/${totalCount} found**`)
    .setAuthor(`${target.user.username}'s stats`, target.user.avatarURL())
    .setThumbnail(luckyItem.image)
    .setFooter(`Featuring ${luckyItem.name}`)
    await message.channel.send(embed)
    console.log()
} 

module.exports.config = {
  name: "stats",
  aliases: ["s"], 
  category: "fun",
  description: "See your (or someone else's) gacha stats",
  usage: "!stats mrricebox"
}
