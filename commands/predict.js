const Discord = require('discord.js');
const prefix = require('../config/bot.json').default_prefix;
registered_id = require('../db/check_id.js'); // checks if user with this id is already registered
prediction = require('../structure/prediction.js'); // get the prediction class

module.exports.run =
    async (bot, message, args) => {
        // if (!registered_id(message.author.id)) {
        //     return message.reply(`Please register before predicting, use the command \`${prefix}register\``)
        // }
        if (!args[3] || args[4]) {
            let response = new Discord.RichEmbed()
                .setColor('#FFA500')
                .setTitle('Error: Wrong command format')
                .addField('Usage format', `${prefix}predict team1 score1 score2 team2`)
                .addField('Example', `${prefix}predict RV 4 1 G2`)
                .addField(`Usage purpose`, `Predict the result of a match.`)
            return message.channel.send(response);
        }
        console.log(args);
        let team1 = args[0].match(/^[a-z0-9]{2,3}$/ig);
        let team2 = args[3].match(/^[a-z0-9]{2,3}$/ig);
        let score1 = args[1].match(/[0-9]/g);
        let score2 = args[2].match(/[0-9]/g);
        console.log(team1);
        console.log(team2);
        console.log(score1);
        console.log(score2);
        if (!(team1 && team2 && score1 && score2)) {
            return -1;
        } else {
            team1 = team1[0];
            team2 = team2[0];
            score1 = score1[0];
            score2 = score2[0];
        }
        let new_prediction = new prediction(team1, team2, score1, score2, message.author.id);
        let def = new prediction('RV', 'G2', '4', '1')
        console.log(new_prediction);
        console.log(def)
        console.log(new_prediction.compare(def))
    }