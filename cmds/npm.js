const Discord = require('discord.js')
const moment = require('moment')
const fetch = require('node-fetch')

module.exports = {
	name: 'npm',
	desc: 'Search [npmjs](https://www.npmjs.com/) for any package',
	usage: 'npm <package>',
	aliases: ["npm"],
async run(client,message,args,prefix,jsonColor,sleep,done,error) {
	if (!args.length) {
		function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
		const res = await fetch('https://registry.npmjs.com/');
		const data = await res.json();
		return message.channel.send('', {
			embed: new Discord.RichEmbed()
			.setColor(`#da0000`)
			.setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
			.setTitle(`Database Information`)
			.addField('❯ Name', data.db_name, true)
			.addField('❯ Doc Count', numberWithCommas(data.doc_count), true)
			.addField('❯ Modification Count', numberWithCommas(data.update_seq), true)
			.addField('❯ Compact Running', data.compact_running || false, true)
			.addField('❯ Deleted Documents', numberWithCommas(data.doc_del_count), true)
			.addField('❯ Disk Size', `${numberWithCommas(Math.trunc(Number(data.data_size / 1024 / 1024)))} / ${numberWithCommas(Math.trunc(Number(data.disk_size) / 1024 / 1024))} MB`, true)
	//		.addField('❯ Disk Last Started At', moment(data.instance_start_time).format('YYYY/MM/DD hh:mm:ss'), true) keeps saying "invalid Date"
		})
	};
	global.pkg = args.join(' ')
	const msg = await message.channel.send(process.env.loading + " Fetching package...")
		const res = await fetch(`https://registry.npmjs.com/${pkg}`);
	if (res.status == 404) {
		return msg.edit(process.env.re + " I could not find the specified package");
	};
	const body = await res.json();
	if (body.time.unpublished) {
		return msg.edit(process.env.re + ' The specified package is unpublished');
	};
	const version = body['dist-tags'] ? body.versions[body['dist-tags'].latest] : {};
	const dependencies = version.dependencies ? version.dependencies : null;
	const embed = new Discord.RichEmbed()
		.setColor(jsonColor)
		.setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
		.setTitle(body.name)
		.setURL(`https://www.npmjs.com/package/${pkg}`)
		.setDescription(body.description || 'No description.')
		.addField('❯ Version', body['dist-tags'].latest || 'Unknown', true)
		.addField('❯ License', body.license || 'None', true)
		.addField('❯ Author', body.author ? body.author.name : 'Unknown', true)
		.addField('❯ Created On', moment.utc(body.time.created).format('YYYY/MM/DD hh:mm:ss'), true)
		.addField('❯ Last Modified', moment.utc(body.time.modified).format('YYYY/MM/DD hh:mm:ss'), true)
		.addField('❯ Main File', version.main || 'index.js', true)
		.addField('❯ Dependencies', dependencies.length ? dependencies.join(', ') : 'None')
		.setFooter(`In ${Date.now() - msg.createdTimestamp} MS`)
//		.addField('❯ Maintainers', maintainers.join(', '));

	return msg.edit("", { embed: embed });
}
}