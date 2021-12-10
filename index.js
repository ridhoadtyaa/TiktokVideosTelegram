const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const token = 'YOUR_TELEGRAM_BOT_TOKEN';

const bot = new TelegramBot(token, {
    polling: true,
    onlyFirstMatch: true
});

bot.onText(/\/tutorial/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'How to download tiktok videos\n\n👉 Go to tiktok app or web.\n👉 Select the tiktok video you want to download. \n👉 Click the share button and copy the link.\n👉 Paste the link in this bot.\n\nEnjoy tiktok videos without watermark 😎');
});

bot.onText(/http(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    
    const request = await fetch(`https://masgimenz.my.id/tiktok/?url=${match[0]}`);
    const data = await request.json();

    bot.sendMessage(chatId, 'Get videos...');
    
    if(request.status === 200) {
        try {
            await bot.sendVideo(chatId, `${data.aweme_details[0].video.play_addr.url_list[0]}`, {caption: 'The video has been successfully obtained 😝👍'});
        } catch (e) {
            setTimeout(() => {
                bot.sendMessage(chatId, 'Failed to get video, try again and make sure url is correct.');
            }, 500);
        }
    } else {
        setTimeout(() => {
            bot.sendMessage(chatId, 'Failed to get video, make sure url is correct.');
        }, 500);
    }
});

bot.onText(/.+/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hi, to know how to use it type command /tutorial.');
});