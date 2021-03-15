const Discord = require('discord.js');
const MusicBot = require('discord-music-system');
const fs = require('fs')
const { config } = require("dotenv");
const { Client, Collection } = require("discord.js");
const { prefix } = require("./config/config.json");
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

const actvs = [
    "$help"
];
client.on('ready', () => {
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
    }, 10000);
});

const bot = new MusicBot({
    botPrefix: '$',
    ytApiKey: 'AIzaSyBZThz2i6Q9DY3bJjNbvmk3Q3leiMZezz4',
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