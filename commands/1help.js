const loadCommands = require('./load-commands');
const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    commands: ['help'],
    description: 'A very helpful command to help you use this bot',
    callback: (message) => {
        let reply = ['Why hello there! Here are my commands: \n\n\n '];

        const commands = loadCommands();

        for (const command of commands) {
            const mainCommand = 
                typeof command.commands === 'string' 
                    ? command.commands 
                    : command.commands[0];
            const args = command.expectedArgs ? ` ${command.expectedArgs}` : '';
            const { description } = command;

            reply.push(`**${prefix}${mainCommand}${args}**: \n${description}\n\n`);
        }

        embed = new Discord.MessageEmbed()
            .setTitle(reply[0])
            .setColor('#FF0000')
            .addFields(
                {
                    name: 'Help',
                    value: reply[1]
                },
                {
                    name: 'Ping',
                    value: reply[2]
                },
                {
                    name: 'Add tag',
                    value: reply[3]
                },
                {
                    name: 'Read tag',
                    value: reply[4]
                },
                {
                    name: 'Delete tag',
                    value: reply[5]
                },
                {
                    name: 'Mod delete tag',
                    value: reply[6]
                }
            );

        message.channel.send(embed);
    }
}