const { Canvas } = require('canvas-constructor');

exports.run = async (client, msg, args) => {
  let user;
    if (msg.mentions.users.size) { user = msg.mentions.users.first(); }
    else if (args[0]) { user = await msg.guild.fetchMember(args[0]);
      if (user) { user = user.user; } }
    if (!user) { user = msg.author; }
    const m = await msg.channel.send('🖌️Painting...');
    msg.channel.startTyping();
    const image = await getBeautiful(client, user.avatarURL);
    msg.channel.send({files: [{attachment: image, name: 'beautiful.png'}]}).then(()=>{ m.delete(); msg.channel.stopTyping() });
};

async function getBeautiful(client, avatar){
	const base = await client.snek.get('https://raw.githubusercontent.com/Soumil07/York-Dev/master/assets/images/plate_beautiful.png');
	const toMeme = avatar.replace(/\.gif.+/g, '.png');
	const { body } = await client.snek.get(toMeme);
	return new Canvas(634, 675)
    .setColor(client.color)
    .addRect(0, 0, 634, 675)
    .addImage(body, 423, 45, 168, 168)
    .addImage(body, 426, 382, 168, 168)
    .addImage(base.body, 0, 0, 634, 675)
    .toBuffer();
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['btf', 'biyutiful'],
  permLevel: 0
};

exports.help = {
  name : "beautiful",
  description: "Admire the beauty of another user or u",
  usage: "beautiful"
};