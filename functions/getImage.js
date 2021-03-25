const Discord = require("discord.js");

const fs = require('fs');

function getImage(path, note, color, images) {
    fs.readdirSync(path).forEach(file => {
        images.push(file)
      });
   const image = images[Math.floor(Math.random() * images.length)]
   const embed = new Discord.MessageEmbed()
   .attachFiles([path + image])
   .setImage('attachment://' + image)
   .setColor(color)
   if(note) embed.setFooter(note)
  
   image.length = 0
   return embed
}



module.exports = {
    getImage
}