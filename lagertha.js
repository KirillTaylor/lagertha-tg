
const config = require('./config.json');
const db = require('./db.json');

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

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
