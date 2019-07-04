const Discord = require('discord.js')
const botconfig = require('./config/bot.json');
const load_commands = require('./structure/load_commands.js');
const message_listener = require('./event_listeners/message_listener.js');
const bot_ready = require('./event_listeners/on_ready.js');

const bot = new Discord.Client({ disableEveryone: true });

load_commands(bot);
message_listener(bot);
bot_ready(bot);
bot.login(botconfig.token);