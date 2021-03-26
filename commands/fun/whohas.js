const Discord = require("discord.js")
const db = require('quick.db')
const { getRarity } = require("../../functions/itemFunctions.js")
const items = require('../../json/items.js')
const ascii = require('ascii-table');

module.exports.run = async (client, message, args, prefix) => {
    if(!args[0]) {
        const error = new Discord.MessageEmbed()
        .setDescription(`${client.emotes.error} Please provide a name`)
        .setColor(client.config.colors.warning)
        message.channel.send(error)
        return;
    }
    const queryString = args.join(" ").toLowerCase()
    const rarity = getRarity(queryString)
    let match;

    let all = db.all()// .filter(a => queryString in a.data.inventory)
    // console.log(all)
    let peopleWith = []
    all.forEach( user => {
        // console.log(user['data'])
        if(user['data']['inventory'][queryString]) {
            match = items[rarity][queryString]
            //client.users.fetch(user['ID'])
            userObject = {
                id: user['ID'],
                amount: user['data']['inventory'][queryString]
            }
            if(match) peopleWith.push(userObject)
        }
       
    })
    if(!peopleWith[0]) {
        const error2 = new Discord.MessageEmbed()
        .setDescription(`No one has found this person yet :eyes:`)
        .setColor(client.config.colors.error)
        .setColor(client.colors[rarity])
        if(items[rarity]) {
            error2.setThumbnail(items[rarity][queryString]['image'])
            
        }
        // if(rarity == 'legendary') error2.setColor(client.colors.legendary)
        message.channel.send(error2)
        return;
    }
    const table = new ascii()
    table.setHeading('#', "Count", "User")
    table.setHeadingAlignLeft()

    peopleWith.sort((a, b) => {
        return b.amount-a.amount
    })
    console.log(`People with ${queryString}` , peopleWith)

    peopleWith.length = 10
    peopleWith.forEach(person => {
         client.users.fetch(person.id)
         .then(table.addRow(peopleWith.indexOf(person) + 1, person.amount, client.users.cache.get(person.id).tag))
    })
    // console.log(peopleWith.length)
    const embed = new Discord.MessageEmbed()
    .setAuthor("Users who have "+ queryString)
    .setDescription("```css\n" + table + "```")
    .setThumbnail(items[rarity][queryString]['image'])
    .setColor(client.colors[rarity])
   
    if(!peopleWith[1]) embed.setDescription("```css\n" + table + "```\n  only " + client.users.cache.get(peopleWith[0].id).username + ` and ${queryString} <:distorted:706579468310937631>`)
   
    message.channel.send(embed)
} 

module.exports.config = {
  name: "whohas",
  description: "See who has a certain person ",
  aliases: ["wh", "hv"], 
  usage: "!whohas Satoshi Fujihara"
}
