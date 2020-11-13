const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

module.exports = () => {
  const bot = new TelegramBot(process.env.tBot, { polling: true })
  bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, 'Привіт')
  })
}
