const fetch = require('node-fetch')

const Discord = require("discord.js")

module.exports.run = async (client, message, args, prefix) => {
const embed = new Discord.MessageEmbed()
.setURL('https://twitter.com')
.setFooter('Dictionary', message.author.avatarURL())
fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + args.join(' '))
    .then(res =>  res.json())
     .then(async (json) => {
         let header;
         if(json.title) {
             embed.setDescription('No definition found for ' + args.join(' '))
            header = ''
         }
         else {
         const first = json[0]
         const content = first['meanings'][0]['definitions']
         console.log(first)
         header = 'Defining **' + json[0]['word'] +'**'
         embed.setTitle(first['word'])
         embed.setDescription(`${first['meanings'][0]['partOfSpeech']}.\n**Definition**: ${content[0]['definition']}\n**Example**:\n> ${content[0]['example'] || 'N/A'}`)
       //  const attachment = new Discord.MessageAttachment(first['phonetics'][0]['audio'], first['word'] + '.mp3')
         }
         const msg = await message.channel.send(client.emotes.loading + ' Searching...')
         setTimeout(() => {msg.edit(header, embed)}, Math.floor(Math.random() * 1000))
    });

} 

module.exports.config = {
  name: "dictionary",
  description: "Dictionary a word",
  category: "util",
  aliases: ["define"]
}
