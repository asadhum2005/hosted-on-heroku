const Discord = require("discord.js");
const snekfetch = require('snekfetch')
const fs = require("fs")

exports.run = async (client, message, args, color, member) => {
  let ping = Math.round(message.client.ping); 
  const ping1 = new Discord.RichEmbed()
  .setDescription(`:ping_pong: Please wait! It wont take long :) \n if you see this message its probs not a good thing`)
  .setColor("RANDOM");
  message.channel.send({embed: ping1}).then((msg) => {
    const ping2 = new Discord.RichEmbed()
    .addField('__**API:**__', `${ping}`, true)
    .addField('__**Ping:**__', `${msg.createdTimestamp - message.createdTimestamp} ms`, true)
    .setColor('RANDOM');
    msg.edit(ping2)
      })
  
  const used = new Discord.RichEmbed()

.setTitle("Command Used:")
.setDescription(`c.polish used in ${message.guild.name} (${message.guild.id}), by ${message.author}, (${message.author.id})`)
.setColor("RANDOM")
bot.channels.get("575619138576318484").send(used);



};


module.exports.help = {
    name: "ping"
  }
