const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const code = args.join(" ");
let usage = new Discord.RichEmbed()
  .setColor("#00ff00")
  .setTitle("Usage:")
  .setDescription("**Command** c.eval <code> \n \n TYPE:**OWNER-ONLY | PERMISSION LEVEL 10** \n \n Get the bot to run some code \n \n c.eval <code> \n c.eval message.channel.send(\"hiya\")")

  var owners = ["501710994293129216", "437255943181565962"] //(you can repeat this unlimiteed)
if(!owners.includes(message.author.id)) return message.channel.send("This is an owner-only command!")

  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }
  try {

    let evaled = eval(code);


    if(!code) return message.channel.send({embed: usage});

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), {code:"xl"});
  } catch (err) {
    // EVAL ERROR LOG CHANNEL ID: 575604330195845149
    bot.channels.get("575604330195845149").send(`\`ERROR WHILST EXCICUTING CODE:\` \n \`\`\`js\n${code}\`\`\` \n  \`\`\`xl\n${clean(err)}\n\`\`\``)
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
}


module.exports.help = {
  name: "eval"
}
