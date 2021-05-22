module.exports = {
    getUser: (client, message, args) => {
        let user = message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
            r =>
              r.user.username.toLowerCase().includes( args.join(" ").toLocaleLowerCase())
          ) ||
          message.guild.members.cache.find(
            r => r.displayName.toLowerCase().includes( args.join(" ").toLocaleLowerCase())
          ) ||
          client.users.cache.get(args[0]) 
        if(!args[0]) user = message.member
        return user
        
    },
    getUserExact: (client, message, args) => {
      let user = message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
          r =>
            r.user.username.toLowerCase() == args.join(' ')
        ) ||
        message.guild.members.cache.find(
          r => r.displayName.toLowerCase() == args.join(' ')
        ) ||
        client.users.cache.get(args[0]) 
      if(!args[0]) user = message.member
      return user
      
  }
}