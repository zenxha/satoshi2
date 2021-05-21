const Discord = require("discord.js")
const {users ,db} = require('../../db.js')
const shopItems = require('../../json/shopItems.js');
module.exports.run = async (client, message, args, prefix) => {
 // if(message.author.id != client.config.ownerid) return message.channel.send('in maintenance')
  let error = new Discord.MessageEmbed()
  .setColor(client.colors.error)
 
  let purchase = shopItems[args.join(' ').toLowerCase()]
    if(!purchase) return message.channel.send(error.setDescription(':x: That item doesn\'t exist'))
    let bal = users.get(`${message.author.id}.balance`)
    
    if (purchase.price > bal) return message.channel.send(error.setDescription(`:x: You\'re too poor to be getting this kinda stuff\nOnly $**${purchase.price-bal}** left gambatte`))



  const prompt = await message.channel.send(error.setDescription(`${purchase.emote} Are you sure you want to buy 1 **${purchase.name}** for $**${purchase.price}**?\n> Type [ **Y** ] to proceed`).setColor(client.colors.warning))
    message.channel.awaitMessages(m => m.author.id == message.author.id,
      {max: 1, time: 30000}).then(async collected => {
              
              // accept only 1 message, and return the promise after 30000ms = 30s

              // first (and, in this case, only) message of the collection
              if (collected.first().content.toLowerCase() === 'y') {
                collected.first().delete()
                const lastRoll = db.get(`${message.author.id}.lastRoll`)
                users.subtract(`${message.author.id}.balance`, purchase.price)
                const ran = await purchase.run(client, message, lastRoll)
                console.log(ran)
                const success = new Discord.MessageEmbed()
                
                if(ran.worked) success.setDescription(`Successfully purchased 1x ${purchase.emote} ${purchase.name} for $**${purchase.price}** ${client.emotes.success}\n > `+ ran.msg)
                if(!ran.worked) success.setDescription(ran.msg)
                .setColor(client.colors.success)
                //.setDescription(purchase.run(client, message, lastRoll))
                prompt.delete()
               const msg = await message.channel.send(success)
               
               
               const msgLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${msg.id}`
               const logEmbed = new Discord.MessageEmbed()
               .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
               .setDescription(`${purchase.emote} <@${message.author.id}> bought 1 ${purchase.name} in [**${message.guild.name}**](${msgLink})\n**User ID** ${message.author.id} \n**Guild ID** ${message.guild.id}`)
               .setTimestamp()

               .setThumbnail(message.author.avatarURL({dynamic: true}))
               if(message.author.id != client.config.ownerid) client.config.logChannels.forEach(channel => client.channels.cache.get(channel).send(logEmbed))
              }

              else {
                      message.reply(error.setDescription('Transaction canceled. You have not been charged').setFooter('').setColor(client.colors.success)); 
                      prompt.delete()    
              }
      }).catch(e => {
              message.reply('Transaction canceled. You have not been charged');
              console.log(e)
              prompt.delete()
      });



} 


module.exports.config = {
  name: "buy",
  description: "Buy stuff",
  category: "economy",
  aliases: ["purchase", 'b']
}
