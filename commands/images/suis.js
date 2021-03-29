const { getImage } = require('../../functions/getImage.js')


module.exports.run = async (client, message, args, prefix) => {
    message.channel.send(getImage('../../images/suis/', '', 'RANDOM', []))
} 

module.exports.config = {
  name: "suis",
  description: "Get feet pics for free",
  category: "images",
  aliases: []
}