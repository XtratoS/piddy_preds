module.exports = (bot) => {
    // prompt when the bot goes online
    bot.on("ready", async () => {
        console.log(`${bot.user.username} is online on ${bot.guilds.size} servers at ${Date()}`)
        bot.user.setActivity(`Closed Beta`)
    })
}