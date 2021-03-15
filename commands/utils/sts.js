const Discord = require('discord.js');

module.exports = {
    name: 'status',
    category: 'owner',
     run: async (client, message, args) => {
        const { channel, author } = message;
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send(`**${author.tag}** you don't have permission to use this!`);
            return
        }

        /**
         * @param {String} statusType - what value to change the bots status
         */
        // in this function we check if the user did input the correct type
        function ifInvalidStatusType(statusType) {

            // all the valid status types
            const types = ['online', 'invisible', 'dnd', 'idle'];

                /* if the statusType value is the same as 
                one of the values in the types array */
                if (types.includes(statusType)) {
                    // set the bots status
                    client.user.setStatus(statusType);

                    channel.send(`**${author.tag}** I changed my status to \`${statusType}\`!`);
                    return
                }
                // if the user did input a invalid type that we didn't have in our array
                else {
                    channel.send(`**${author.tag}** invalid status type!`);
                    return
                }
        }

        // if the user didn't type a second argument
        if (!args[0]) {

        channel.send(
            new Discord.MessageEmbed()

            .setColor('RANDOM')
            .setDescription("\nPrefix: `$status <status_type>`\t\n\nStatuses to choose between:\n\n:green_circle:`online`\n\n👤`invisible`\n\n🔴`dnd`\n\n:waxing_crescent_moon:`idle`\n\n")
            .addField("Note:", "```It can take some extra seconds before\nit changes to your wanted status!```")
            .setFooter(`--|Please write the status types all lowercase|-->`)
            .setTimestamp()
        ).catch(err => console.error(err));
        return
    }
        // if the user typed a second argument
        if (args[0]) {

        ifInvalidStatusType(args[0]);
        return
        }
    }
}       