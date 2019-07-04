const filesys = require('fs');
const Discord = require('discord.js');
module.exports = (bot) => {
    bot.commands = new Discord.Collection();
    // read the commands directory
    filesys.readdir('./commands/', (err, files) => {
        if (err) {
            console.log(err);
        }
        let cmdfile = files.filter(f => f.split('.').pop() == 'js');
        if (cmdfile.length < 1) {
            console.log("couldn't find commands dir.");
            return;
        }
        // load commands
        cmdfile.forEach(f => {
            let props = require(`../commands/${f}`);
            console.log(`${f} loaded`);
            if (!props.help) {
                props.help = {
                    name: f.split('.')[0],
                }
            }
            bot.commands.set(props.help.name, props);
        });
    })
}