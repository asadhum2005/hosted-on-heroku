/**
 * Description for the function, this will be displayed via the IDE
 * @extends {BaseClient}
 */

function smth(){};
smth()

const arr = [
	'688072494753775631', '503169868875694090',  '472593593534775297', '507406425186762772', '381327266061484034' ,'442066376706752513', '365247960696750082', '688006697884581960' ,'272750432676347904', ,'361981167710502912', '465077951524765707', '635937571028992020', , '514555152129327114',  '470765718082945035', '470765718082945035', '701380462790049884', '701380462790049884', '331878470823182337', '530458030324580362', '523205335637557271', '381986181929238528'
];

await message.channel.send(arr.map(async x => `**${Discord.escapeMarkdown(await client.fetchUser(x, { cache: false }).tag)}** - ${x}`).join(', '))