
const Discord = require("discord.js")
const {users} = require('../../db.js')
const ascii = require('ascii-table');
module.exports.run = async (client, message, args, prefix) => {

const bal = users.get(`${message.author.id}.balance`)
if(bal < 150) {
    return message.channel.send("You need at least $150 to request an artist")
}
const filter = m => m.author.id == message.author.id;
const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });


const example = `\`\`\`json\n"leo fujii": {
    "name": "Leo Fujii",
    "role": "Vocals/Composition/Piano",
    "image": "https://cumz.one/z63Ut1b.jpg",
    "unit": "Omoinotake",
    "description": "High tone voice, fan of Bruno Mars",
    "birthyear": 1993,
},\n\`\`\``


const embed = new Discord.MessageEmbed()
.setAuthor('Please send a message in this format')
.setDescription(example+`\n This menu closes in 1 minute\n `)
.setFooter('type \'cancel\' to terminate')
const msg = await message.channel.send(embed)
setTimeout(() => {
    msg.delete()
    
}, 60000)




collector.on('collect', m => {
    if(m.content.toLowerCase() == 'cancel'){
        m.delete()
        msg.delete()
         message.channel.send('Request cancelled')
         return;
    }
    m.delete()
    const success = new Discord.MessageEmbed()
    .setAuthor(`Successfully submitted`)
    .setDescription(` \`\`\`json\n${m.content}\n\`\`\`\n `)
    .setFooter('Success', message.author.avatarURL())
  
    message.channel.send(success)
    client.channels.cache.get('828074693188911144').send(success.setFooter(message.guild.name).setDescription(`\`\`\`json\n${m.content}\n\`\`\`\nUser id ${message.author.id}`).setAuthor(message.author.tag, message.author.avatarURL()))
	msg.delete()
});
} 





module.exports.config = {
  name: "request",
  description: "Request an artist to be added",
  category: "fun",
  aliases: ["req"],
  usage: '!req'
}
