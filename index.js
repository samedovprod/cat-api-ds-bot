const Discord = require('discord.js')
const axios = require('axios')
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES']})
const prefix = '!'

require('dotenv').config()
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'process.env.CATAPI_TOKEN';

async function getCat() {
  try {
    const res = await axios('/images/search')
    return res.data[0].url
  } catch (err) {
    return `an error has occurred ${err}`
  }
}

client.on('messageCreate', async function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ')
    const command = args.shift().toLocaleLowerCase()

    switch (command) {
      case 'ping':
        const timeTaken = Date.now() - message.createdTimestamp
        message.reply(`Pong! ${timeTaken}`)
        break
      case 'cat':
        message.reply(await getCat())
        break
      case 'boobs':
        message.reply('https://vk.com/sticker/1-70957-512b.png')
        break
      default:
        message.reply("unknown command")
        break
    }
})

client.login(process.env.BOT_TOKEN)
