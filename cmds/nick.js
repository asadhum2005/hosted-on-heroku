const Discord = require("discord.js")
let mom = require('moment')
module.exports.run = async(client, message, args) => {
	let msg = await message.channel.send(`One moment...`)
	if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
		return msg.edit(`${process.env.re} I need the **MANAGE_NICKNAMES** permission to do this!`)
	}
	let userArg = args[0]
	if (!userArg) {
		return msg.edit(`${process.env.re} You need to mention a user or provide a valid user id!`)
	}
	let guildMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let nick = args.slice(1).join(' ')
	if (!guildMember) {
		return msg.edit(`${process.env.re} You need to mention a user!`)
	}
	message.guild.member(guildMember) 
		.setNickname(nick, `Responsible User: ${message.author.tag}\nNickname changed at: ${mom(Date.now())}`)
			.catch(er => {
				msg.edit("There was an error!")
				return;
			})
	msg.edit(`${process.env.gre} I have changed **${guildMember.user.tag}**\'s nickname to **${nick}**!\n\n> Remember nicknames cannot be longre than 32 characters!!`)
}


module.exports.help = {
	name: 'setnick'
}