const tag = require('../tag');
const Discord = require('discord.js');

module.exports = {
    commands: ['readtag', 'findtag', 'find', 'read'],
    expectedArgs: "<tag name>",
    permissionError: 'You do not have permission to run this command.',
    minArgs: 1,
    maxArgs: 1,
    permissions: [],
    requiredRoles: [],
    description: 'This is a command you can use to get any tag from the bot including tags made by other people',
    callback: async (message, arguments, text, client) => {
        const target = arguments[0];
        const tagArgs = await tag.readTag(target);
        if (tagArgs === null) {
            message.channel.send("This tag doesn't exist =0");
            return;
        };

        const tagContent = tagArgs[0];
        const tagInfo = tagArgs[1];
        const tagAuthor = tagArgs[2];
        const user = client.users.cache.get(tagAuthor);

        // Embed compiling all the above information to the user
        let embed = null;
        
        if (tagInfo === undefined || tagInfo === null) {
            embed = new Discord.MessageEmbed()
            .setTitle(target)
            .setFooter(`Created by: ${user.tag}`)
            .setColor('#00AAFF')
            .addFields(
                {
                    name: 'Tag: ',
                    value: tagContent
                });
        } else {
            embed = new Discord.MessageEmbed()
            .setTitle(target)
            .setFooter(`Created by: ${user.tag}`)
            .setColor('#00AAFF')
            .addFields(
                {
                    name: 'Tag: ',
                    value: tagContent
                },
                {
                    name: 'Tag Info: ',
                    value: tagInfo
                });
        }

        message.channel.send(embed);

        console.log(target);
        console.log(tagInfo);
    }
}