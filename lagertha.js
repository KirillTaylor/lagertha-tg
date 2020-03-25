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
	const game = 'Ragnarok';
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus('available');
	client.user.setPresence({
        game: {
            name: game,
            type: 0
        }
    });
	/* client.channels.map((channel) => {
		if(channel.type === 'text'){
			channel.send(`LargerthaBot reloaded. (Version ${config.version})`);
			if(game){
				channel.send("I'm now playing " + game);
			}
			channel.send("Hit me up with !bobs or !ping");
		}
	}); */
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

client.login(config.discord.token);

// Lagertha for Telegram **/

const TGBot = require('node-telegram-bot-api');

const bot = new TGBot(config.telegram.token, {polling: true});

bot.on('message', (msg) => {
    console.log(msg);
    if(msg.text){
        const parsedCMD = msg.text.substr(1);
    
        if (parsedCMD === 'ping') {
            bot.sendMessage(msg.chat.id, 'Pong!');
        }
        if (msg.text === 'smaw'){
            bot.sendMessage(msg.chat.id, "smiiiiii");
        }
        
        if (parsedCMD === 'bobs'){
            const randomNumber = between(1, 18);
            bot.sendPhoto(msg.chat.id, `./bobs/${randomNumber}.jpg`);
        }

        if(msg.text.includes('azov')){
            bot.sendMessage(msg.chat.id, `@${msg.from.username} halaasssss`);
        }
    }
});

bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
});
