const Discord = require('discord.js')
module.exports = {
    name: 'help',
    category: 'Help Commands',
     run: async(client, message, args) => {
         let help = new Discord.MessageEmbed()
         .setTitle("Commands List")
         .setDescription("**Prefix**: `$`")
         .setTimestamp()
         .addFields(
         { name: 'Music' , value: '`play` `add` `join` `stop` `leave` `current` `queue` `skip` `volume` `pause` `resume` `lyrics`' },
         )
         message.channel.send(help)
     } 
}
