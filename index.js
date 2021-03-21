const Discord = require('discord.js');
const MusicBot = require('discord-music-system');

const fs = require('fs')
const { config } = require("dotenv");
const { Client, Collection } = require("discord.js");
const prefix = process.env.PREFIX

const client = new Discord.Client();


client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
const bot = new MusicBot({
    botPrefix: '$', // Change It With Your Prefix You Like
    ytApiKey: 'YOUTUBE_API_HERE', // Type your youtube API here
    botClient: client
});
client.on('message', message => { 
    if(message.content.startsWith(bot.prefix)) { 
        bot.onMessage(message);
    };
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) 
        command.run(client, message, args);
});
client.login(process.env.TOKEN);
