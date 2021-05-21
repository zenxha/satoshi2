const Discord = require("discord.js")
const fs = require("fs")
const { getImage } = require('../../functions/getImage.js')
module.exports.run = async (client, message, args) => {
  message.channel.send(getImage("../satoshi/sweat/", "", "RANDOM", []))
}

module.exports.config = {
  name: "sweat",
  category: "images",
  aliases: ['sw'],
  description: "Bootleg Satocchan photobook but free and online",
  usage: "!sweat"
}
