/** Lagertha for Discord bot **/

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const db = require('./db.json');


function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

client.on('ready', () => {
	const game = config.game;
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus('available');
	client.user.setPresence({
        game: {
            name: game,
            type: 0
        }
    });
	// client.channels.map((channel) => {
	// 	if(channel.type === 'text'){
	// 		channel.send(`LargerthaBot reloaded. (Version ${config.version})`);
	// 		if(game){
	// 			channel.send("I'm now playing " + game);
	// 		}
	// 		channel.send("sup");
	// 	}
	// });
});

client.on('message', msg => {
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
let messages = db.messages;

function randomMessage(){    
    return messages[between(0, messages.length - 1)];
}

bot.sendMessage(-1001393546769, `[Lagertha] Updated to version ${config.version}. \nRandomness level: ${config.randomness * 100}%`);

bot.on('message', (msg) => {
    console.log(msg);
    if(msg.text){
        const parsedCMD = msg.text.substr(1);
        messages.push(msg.text);
        if (parsedCMD === 'ping') {
            bot.sendMessage(msg.chat.id, 'Pong!');
        } else if (msg.text === 'smaw'){
            bot.sendMessage(msg.chat.id, "smiiiiii");
        } else if (parsedCMD === 'bobs'){
            const randomNumber = between(1, 18);
            bot.sendPhoto(msg.chat.id, `./bobs/${randomNumber}.jpg`);
        } else if(msg.text.includes('azov')){
            bot.sendMessage(msg.chat.id, `@${msg.from.username} halaasssss`);
        } else {
            console.log(parseFloat(config.randomness));
            if(Math.random() <= parseFloat(config.randomness)){
                bot.sendMessage(msg.chat.id, randomMessage());
            }
        }
        console.log(messages);
    }
});

bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
});
