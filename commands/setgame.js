const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    if(message.author.id !== "501710994293129216") return message.channel.send("You cannnot use this command!")
    let toset = args.join(" ")

        let set = new Discord.RichEmbed()

        .setTitle("Activity Set!")
        .setDescription(`Bot User Actvity has been changed to: ${toset}`)
        .setColor("RANDOM")

    bot.user.setActivity(toset, {type: "WATCHING"});
    message.channel.send(set);

}

module.exports.help = {

    name: "setgame"

}
