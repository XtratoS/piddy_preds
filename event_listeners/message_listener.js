const botconfig = require('../config/bot.json')

module.exports = (bot) => {
    bot.on('message', async message => {
        // check for bot message or dm
        if (message.author.bot || message.channel.type === 'dm') {
            return;
        }
        let prefix = botconfig.default_prefix;
        if (message.content.startsWith(prefix)) {
            let message_array = message.content.split(' ');
            let command = message_array[0].split('').splice(prefix.length).join('');
            let args = message_array.splice(1);
            let command_file = bot.commands.get(command);
            if (!command_file) {
                return;
            }
            command_file.run(bot, message, args);
        }
    })
}