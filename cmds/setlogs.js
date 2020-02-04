const Discord = require('discord.js')
let json = require('async-jsonstore-io')
let jsonstore = new json(process.env.jstk)
let keyv = require('keyv');
let LOGS_DB = new keyv("sqlite://./database/log.sqlite")

module.exports.run = async(client,message,args,prefix,jsonColor,L,sleep,done,error) => {
	if(!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send(`${process.env.re} You do not have permission to set/edit logs channel of this server!`)
	let msg = await message.channel.send("Setting logs channel...")
	let channelArgs = args[0];
	if(!channelArgs) { return message.channel.send(`${process.env.re} To change the logs channel, you need to provide a channel! \n\n> This could be the name of the channel, the ID or the channel #mention!`, {
		embed: new Discord.RichEmbed()
		.setColor(jsonColor)
		.setDescription(`The current log channel is <#${logs}> !`)
		});
	 };
	let channel = message.mentions.channels.first() || message.guild.channels.find(ch => ch.name == channelArgs) || message.guild.channels.find(ch => ch.id == channelArgs);

	try{
		let F = await channel.send("TEST")
	}catch(e){
		return message.channel.send(`I do not have permission to send messages in <#${channel.id}>! Please fix this before retrying.`)
	}
	F.delete();
	let newLogs = await LOGS_DB.set("logs" + message.author.id, channel.id)

	await channel.send("", {
		embed: new Discord.RichEmbed()
		.setTitle('Logs Channel Update')
		.setColor(jsonColor)
		.addField("Updated By", message.author.tag, true)
		.addField("Updated At", message.createdAt.toDateString(), true)
		.addField("Updated To", `<#${channel.id}>`)
	})

	msg.edit(" ", {
		embed: new Discord.RichEmbed()
		.setColor(jsonColor)
		.setDescription(`${process.env.gre} **${message.author.tag}** has successfully changed the server's log channel to <#${channel.id}>!`)
	});
};

module.exports.help = { name: 'setlogs' };