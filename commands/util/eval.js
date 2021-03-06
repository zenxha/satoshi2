const Discord = require("discord.js")
const fs = require("fs")
const {db, users} = require('../../db.js')
const hastebin = require("hastebin-gen");

module.exports.run = async (client, message, args) => {
    console.log('a')
  if (message.author.id !== '303901005710360576') return message.channel.send("You do not have permission to use this command!");
  const embed = new Discord.MessageEmbed()
      .setDescription('<a:loading:833410989059080222> *Evaluating...*')
  const msg = await message.channel.send(embed);
  try {
      const data = eval(args.join(' ').replace(/```/g, ''));

      const embed = new Discord.MessageEmbed()
          .setTitle('Output:')
          .setDescription(await "```js"+"\n" + data + "\n" + "```")
          .setColor('GREEN')
          /*
        if(data.length >= 2000) {
            hastebin(data, {extension: "js", url: "https://paste.mod.gg"}).then(async haste => {
                const a = new Discord.MessageEmbed()
                .setDescription(`Response exceeded 2000 characters\nUploaded **[here](${haste})**`)
                .setColor('RED')
                await msg.edit(a)
                return
            }).catch(error => {
                // Handle error
                console.error(error);
            });
        }
      */
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
