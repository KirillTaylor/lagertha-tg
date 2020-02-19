/** Lagertha for Discord bot **/

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

client.on('ready', () => {
	const game = 'Not Apex Legends';
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus('available');
	client.user.setPresence({
        game: {
            name: game,
            type: 0
        }
    });
	client.channels.map((channel) => {
		if(channel.type === 'text'){
			channel.send(`LargerthaBot reloaded. (Version ${config.version})`);
			if(game){
				channel.send("I'm now playing " + game);
			}
			channel.send("Hit me up with !bobs or !ping");
		}
	});
});

client.on('message', msg => {
	console.log(msg);
	const parsedCMD = msg.content.substr(1);
	if (parsedCMD === 'ping') {
		msg.reply('Pong!');
	}
	if (msg.content === 'smaw'){
		msg.channel.send("smiiiiii");
	}
	
	if (parsedCMD === 'bobs'){
		const randomNumber = between(1, 18);
		msg.reply("There you go", {files: [`./bobs/${randomNumber}.jpg`]});
	}
});

client.login(config.token);