const TGBot = require('node-telegram-bot-api');
const config = require('./config');

const bot = new TGBot(config.token, {polling: true});

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

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