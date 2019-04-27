const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  let iddir = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  let embed2 = new Discord.RichEmbed()

      .setTitle(`${message.member.user.tag}`)
      .setDescription(`${message.author.id}`)
      .setColor("RANDOM");

  if (message.mentions.users.size < 1) return message.channel.send(embed2);

    let embed = new Discord.RichEmbed()

      .setTitle(`${iddir.user.tag}`)
      .setDescription(`${iddir.user.id}`)
      .setColor("RANDOM")


        message.channel.send(embed);

}

module.exports.help = {
  name: "id"
}