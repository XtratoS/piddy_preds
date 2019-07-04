registered_name = require('../db/check_name.js') // checks if a name is taken
registered_id = require('../db/check_id.js') // checks if user with this id is already registered
cleanse = async (text) => { return text.match(/[a-z0-9_]+/gi).join('') } // removes all non alphanumeric characters from a string
register = require('../db/register.js') // registers the user
update = require('../db/update_name.js') // updates the user's name

const Discord = require('discord.js');
const prefix = require('../config/bot.json').default_prefix;

module.exports.run =
    async (bot, message, args) => {
        if (!args[0]) {
            let response = new Discord.RichEmbed()
                .setColor('#FFA500')
                .addField('Usage format', `${prefix}register <username>`)
                .addField(`Usage purpose', 'Registering new users or updating an existing user's username.`);
            return message.reply(response);
        }
        // remove all special characters from the username
        let username = cleanse(args[0]);
        if (username.length < 5) {
            return message.reply(`username can't have less than 5 characters (letters, numbers and underscored only).`)
        }
        // checks if the username is taken.
        if (registered_name(username)) {
            return message.reply(`The username ${username} has already been taken, please try a different one.`)
        }
        let verif_message = await message.channel.send(`Hey ${message.author}, are you sure you want to register with the username ${username}?\n*y to confirm, anything else to cancel.*`);
        let collector = message.channel.awaitMessages(msg => msg.author.id === message.author.id, { maxMatches: 1, time: 120000 });
        // check for timeout
        if (!collector.first()) {
            verif_message.delete();
            return message.reply('Command timed out.');
            // check if accepted or not
        } else if (collector.first().content.toLowerCase() !== 'y') {
            verif_message.delete();
            return message.reply('Command was cancelled.');
        }
        // check if the username is taken again.
        if (registered_name(username)) {
            return message.reply(`The username ${username} has already been taken, please try a different one.`)
        }
        let user_id = message.author.id;
        // check if the user has already registered before
        if (registered_id(user_id)) {
            temp = await message.reply('You have already been registered before, I will update your username though');
            await update(user_id, username);
            return await setTimeout(() => {
                temp.edit(`Updated your username to ${username}`);
            }, 1000);
        } else {
            reg_status = await register(user_id, username);
            if (reg_status) {
                message.reply(`You have been successfully registered with this discord account, you can predict the games results when it's available.`)
            }
        }
    }