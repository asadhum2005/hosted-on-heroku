const Discord = require('discord.js')

module.exports.run = async(client,message,args,prefix,jsonColor,logs,sleep,done,error) => {
		let msg = await message.channel.send(`$One moment please...`)
		if (!message.member.permissions.has('MANAGE_CHANNELS')) {
			return msg.edit("You do not have permission to use this command!")
		} else {
			if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
				return msg.edit("I do not have permissions to set slowmode for this channel! Please check my role permissions!")
			} else {
				let count = args[0];
				if (!count) {
					return msg.edit("You need to provide a number for slowmode!")
				} else {
					let newCount = parseInt(count);
					if (isNaN(newCount)) {
						return msg.edit("Please give an actual number noob")
					} else {
						message.channel.setRateLimitPerUser(newCount)
							.catch((err) => {
								return msg.edit("Sorry, there was an error")
							})
						if(newCount == '0' || newCount == 0) {
							return msg.edit(`${process.env.gre} Slowmode has been disabled for ${message.channel}`)
						} 
						return msg.edit(process.env.gre + " I have set slowmode for `" + newCount + "` seconds!")
					};
				};
			};
		};
};

module.exports.help = { name: 'slowmode' }