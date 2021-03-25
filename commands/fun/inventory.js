const Discord = require("discord.js")
const db = require('quick.db')
const { randomValue, randomKey, getRarity } = require("../../functions/itemFunctions.js")
const items = require('../../json/items.js')
module.exports.run = async (client, message, args, prefix) => {
    message.channel.send("In the works, maybe u meant to type `!stats`")
} 

module.exports.config = {
  name: "inventory",
  aliases: ["inv"], 
  usage: "!inventory"
}
