/** Lagertha for Discord bot **/

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const db = require('./db.json');
const fs = require('fs');


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
//let messages = db.messages;
let rawdata = fs.readFileSync('./db.json');
let messages = JSON.parse(rawdata);

function randomMessage(){    
    return messages.messages[between(0, messages.messages.length - 1)];
}

// bot.sendMessage(-1001393546769, `[Lagertha] Updated to version ${config.version}. \nRandomness level: ${config.randomness * 100}%`);

bot.on('message', (msg) => {
    console.log(msg);
    if(msg.text){
        const parsedCMD = msg.text.substr(1).split(' ');
        if (parsedCMD[0] === 'ping') {
            bot.sendMessage(msg.chat.id, 'Pong!');
        } else if (msg.text === 'smaw'){
            bot.sendMessage(msg.chat.id, "smiiiiii");
        } else if (parsedCMD[0] === 'bobs'){
            const randomNumber = between(1, 18);
            bot.sendPhoto(msg.chat.id, `./bobs/${randomNumber}.jpg`);
        } else if (parsedCMD[0] === 'joke'){
            const jokes = require('./jokes.json');
            const randomNumber = between(0, jokes.length - 1);
            bot.sendMessage(msg.chat.id, jokes[randomNumber]);
        } else if(parsedCMD[0] === 'gmsg'){
            //bot.sendMessage(msg.chat.id, msg.text.replace('!'+parsedCMD[0], ''));
            bot.sendMessage(-1001393546769, msg.text.replace('!'+parsedCMD[0], ''));
        } else if(msg.text.includes('azov')){
            bot.sendMessage(msg.chat.id, `@${msg.from.username} halaasssss`);
        } else {
            messages.messages.push(msg.text);
            console.log(parseFloat(config.randomness));
            if(Math.random() <= parseFloat(config.randomness)){
                bot.sendMessage(msg.chat.id, randomMessage());
            }
        }
        let data = JSON.stringify(messages);
        fs.writeFileSync('./db.json', data);
        console.log(messages);
    }
});

bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
});
