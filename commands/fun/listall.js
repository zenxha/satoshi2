const Discord = require("discord.js")
const tooRecent = new Set();
const pe = require('discord.js-pagination')
module.exports.run = async (client, message, args, prefix) => {
    if (tooRecent.has(message.author.id)) {
        message.channel.send("Wait 1 minute cooldown reeee");
} else {
    const common = new Discord.MessageEmbed().setDescription(Object.keys(client.items['common']).join('\n')).setColor(client.colors.common).setAuthor('Commons', message.author.avatarURL())
    const uncommon = new Discord.MessageEmbed().setDescription(Object.keys(client.items['uncommon']).join('\n')).setColor(client.colors.uncommon).setAuthor('Uncommons', message.author.avatarURL())
    const rare = new Discord.MessageEmbed().setDescription(Object.keys(client.items['rare']).join('\n')).setColor(client.colors.rare).setAuthor('Rares', message.author.avatarURL())
    const legendary = new Discord.MessageEmbed().setDescription(Object.keys(client.items['legendary']).join('\n')).setColor(client.colors.legendary).setAuthor('LEGENDARIES', message.author.avatarURL())
    const pages = [common, uncommon, rare, legendary]
    pe(message, pages, ['👈', '👉'],300000)
    tooRecent.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      tooRecent.delete(message.author.id);
    }, 60000);
}   
} 

module.exports.config = {
  name: "listall",
  description: "See a list of all rollable entities",
  category: "fun",
  aliases: ["la"]
}
