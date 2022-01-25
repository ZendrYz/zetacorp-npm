## Installation

NPM:

> `npm i zetacorp-antiraid --save`

General use

```js
const Discord = require('discord.js');
const client = new Discord.Client({intents: 32767});
const zc = require('zetacorp-antiraid');
const config = require('./config.json');
let prefix = config.prefix;

client.on('message', async (message) => {
    zc.antiping(6, 5000, 'kick', message) //this has to be one of your first lines of your message event; recommend to put it above your other conditionals, such as if the author is a bot or if the message doesn't start with the prefix
    if (!message.content.startsWith(prefix)) return;
    zc.antigrabbers(message)
})
client.on('guildMemberAdd', member => {
    zc.antibots('kick', member); //
    zc.antijoins(member);
})
client.on('channelCreate', channel => {
    zc.antiraid('all', 5000, 6, channel)
})

client.login(config.token);
```

## Functions

> `antijoins(*param)\n`
