const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
	const msg = await message.channel.send("Processing...")

	if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
		msg.edit(`${process.env.re} I do not have the **MANAGE ROLES** permission. Please make sure I have this permission!`)
	}

	if (!message.member.permissions.has("MANAGE_ROLES")) {
		return msg.edit(`${process.env.re} You do not have permission to use this command!\n> You need the **MANAGE ROLES** permission in order to use this command!`)
	}

	let userArg = args[0];
	let roleArg = args.slice(1).join(" ")

	if (!userArg) return msg.edit(process.env.re + " Please provide a user arguement")
	if (!roleArg) return msg.edit(process.env.re + " Please provide a role arguement")

	let guildMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(userArg))
	let guildRole = message.guild.roles.find(role => role.name == roleArg) || message.mentions.roles.first() || message.guild.roles.find(role => role.id == roleArg);

	if (!guildMember) return msg.edit(`${process.env.re} I cannot find that user!`)
	if (!guildRole) return msg.edit(process.env.re + " I cannot find that role!")

	try {
		if (guildMember.roles.has(guildRole.id)) {
			guildMember.removeRole(guildRole.id)
			msg.edit(`${process.env.gre} Updated roles for **${guildMember.user.tag}**, \`- ${roleArg}\``)
		} else {
			guildMember.addRole(guildRole.id)
			msg.edit(`${process.env.gre} Updated roles for **${guildMember.user.tag}**, \`+ ${roleArg}\``)
		}
	} catch (e) {
		msg.edit(`${message.author} ${process.env.re} I was unable to add/remove that role. Please ensure that I have permission to do so.\n\nIf this is still occuring, please contact support (${process.env.supportServer}) with the following error: \`${e}\``)
	};
};

module.exports.help = {
	name: "role",
};