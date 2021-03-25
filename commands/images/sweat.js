const Discord = require("discord.js")
const fs = require("fs")
const { getImage } = require('../../functions/getImage.js')
module.exports.run = async (client, message, args) => {
  message.channel.send(getImage("../satoshi/sweat/", "", "RANDOM", []))
}

module.exports.config = {
  name: "sweat",
  category: "images",
  aliases: [],
  description: "Get an image of satocchan"
}
