const Discord = require("discord.js")
const fs = require("fs")
const ascii = require('ascii-table');
/*
const intents = new Discord.Intents();
intents.add("GUILD_MESSAGES");
const client = new Discord.Client({ intents: intents }); // UPDATE TO USE INTENTS
*/
const client = new Discord.Client()

const config = require("./config.js"); // config


client.commands = new Discord.Collection();
client.aliases =  new Discord.Collection();

client.config = require('./config.js');
client.emotes = client.config.emotes;
client.colors = client.config.colors;
client.items = require("./json/items.js")
client.secretItems = require("./json/secretItems.js")
let table = new ascii("Commands")





fs.readdirSync("./commands").forEach(dir => {
  const commands = fs.readdirSync(`commands/${dir}/`).filter(f => f.split(".").pop() === 'js')
  for(let file of commands) {
    let pull = require(`./commands/${dir}/${file}`)
    if(pull.config.name) {
      client.commands.set(pull.config.name, pull)
      table.addRow(file, "✅")
    } else {
      table.addRow(file, "❌ -> Missing name or name isn't string")
      continue
    }


    if (pull.config.aliases && Array.isArray(pull.config.aliases)) pull.config.aliases.forEach(alias => client.aliases.set(alias, pull.config.name));
  }
})
console.log(table.toString())







client.once("ready", () => {

    console.log("Logged in as " + client.user.tag); 
    
    let playing = client.voice.connections.size; 

     client.user.setPresence({ activity: { name: `hehe`, type: "STREAMING", url: "https://www.twitch.tv/piptea_" } })

});

client.on('message', async message => {

 
   if(!message.guild || message.author.bot) return;
   if (message.content.indexOf(config.prefix) !== 0) return;

   let args = message.content.slice(config.prefix.length).trim().split(" ");
   const command = args.shift().toLowerCase();
   const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
   
   if(!commandFile) return;
  
   try {
     commandFile.run(client, message, args, config.prefix);
   } catch(e) {
     return message.channel.send(`An error occured on ${command}:\n ${e.message}`)
   }
        
});

client.login(client.config.token); //This is the heart of the bot
