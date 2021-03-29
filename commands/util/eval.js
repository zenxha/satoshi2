const Discord = require("discord.js")
const fs = require("fs")
const {db, economy} = require('../../db.js')

module.exports.run = async (client, message, args) => {
    console.log('a')
  if (message.author.id !== '303901005710360576') return message.channel.send("You do not have permission to use this command!");
  const embed = new Discord.MessageEmbed()
      .setTitle('Evaluating...')
  const msg = await message.channel.send(embed);
  try {
      const data = eval(args.join(' ').replace(/```/g, ''));
      const embed = new Discord.MessageEmbed()
          .setTitle('Output:')
          .setDescription(await "```xl"+"\n" + data + "\n" + "```")
      .setColor('GREEN')
      await msg.edit(embed)
      await msg.react(client.emotes.successID)
      await msg.react(client.emotes.errorID)
      const filter = (reaction, user) => (reaction.emoji.id === client.emotes.errorID || reaction.emoji.id === client.emotes.successID) && (user.id === message.author.id);
      msg.awaitReactions(filter, { max: 1 })
          .then((collected) => {
              collected.map((emoji) => {
                  switch (emoji._emoji.id) {
                      case client.emotes.successID:
                          msg.reactions.removeAll();
                          break;
                      case client.emotes.errorID:
                          msg.delete()
                          break;
                  }
              })
          })
  } catch (e) {
      const embed = new Discord.MessageEmbed()
          .setTitle('error')
          .setDescription(`\`\`\`xl\n${e}\n\`\`\``)
          .setColor("#FF0000")
      return await msg.edit(embed);
  }
}
module.exports.config = {
  name: "eval",
  category: "owner",
  aliases: ['e'],
  description: "evaluate code"
}
