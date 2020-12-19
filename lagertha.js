// load environmental variables
require('dotenv').config();

const config = require('./config.json');
const fs = require('fs');

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

// Lagertha for Telegram **/

const TGBot = require('node-telegram-bot-api');

const bot = new TGBot(process.env.TELEGRAM_TOKEN, {polling: true});
//let messages = db.messages;
let rawdata = fs.readFileSync('./db.json');
let messages = JSON.parse(rawdata);

function randomMessage(){    
    return messages.messages[between(0, messages.messages.length - 1)].text;
}

// bot.sendMessage(-1001393546769, `[Lagertha] Updated to version ${config.version}. \nRandomness level: ${config.randomness * 100}%`);

bot.on('message', async (msg) => {
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
            await bot.getUserProfilePhotos(msg.from.id, 0, 1).then(async function(data){
                console.log(data);
                const smallImage = data.photos[0].filter(img => img.width === 160)[0]; 
                await bot.getFile(smallImage.file_id).then(function(data){
                    const fileName = data.file_path.split('/')[1];
                    if (!fs.existsSync(process.env.IMAGES_FOLDER + '/' + fileName)) {
                        bot.downloadFile(data.file_id, process.env.IMAGES_FOLDER);
                        msg.from.profilePicture = fileName;
                    }
                });                
            });

            console.log(msg);
            messages.messages.push(msg);
            if(Math.random() <= parseFloat(config.randomness)){
                bot.sendMessage(msg.chat.id, randomMessage());
            }
        }
        let data = JSON.stringify(messages);
        fs.writeFileSync('./db.json', data);
    }
});

bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
});
