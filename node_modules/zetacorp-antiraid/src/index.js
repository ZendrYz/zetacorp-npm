const chalk = require('chalk');
const db = require('megadb');
var npmZetaCorp = true;
if (npmZetaCorp == false) return;

function Error(err) {
    return console.log(chalk.red('ERROR: ') + chalk.yellow(err));
}
function Alert(alert) {
    return console.log(chalk.yellow('WARNING: ' + chalk.red(alert)));
}

console.log(chalk.yellowBright('ZetaCorp NPM - ' +  chalk.green('CONNECTED')));

async function antijoins(event) {
    try {
        if (!event) {
            Error('The event type has not been specified, by default: member.');
            event = member;
        }
        event.guild.member(event).kick('Antijoins active');
    } catch (e) {
        Error(e);
    }
}

async function antibots(action, event) {
    try {
        if (!action) return Error('The action of the antibots has not been specified: KICK / BAN ');
        if (!event) {
            Error('The event type has not been specified, by default: member ');
            event = member;
        }
        if (event.user.bot) {
            if (action.toLowerCase() == 'kick') {
                event.guild.member(event).kick('ZetaCorp NPM - Antibots enabled');
            } else if (action.toLowerCase() == 'ban') {
                event.guild.member(event).ban('ZetaCorp NPM - Antibots enabled');
            } else {
                Error('Couldn\'t find an action (kick/ban)');
            }
        }
    } catch (e) {
        Error(e);
    }
}

async function antiping(mensajes, tiempo, action, event) {
    try {
        if (!mensajes) return Error('The number of messages has not been specified for antiping system');
        if (!tiempo) return Error('The time with which the antiping will reset the messages has not been specified for antiping system');
        if (!action) return Error('The antiping action has not been specified: KICK / BAN');
        if (!event) {
            Error('The type of event for antiping system has not been specified, by default: message ');
            event = message;
        }
        if (event.content.includes('@') || event.content.includes('&')) {
            const msgs = new db.crearDB('antiping', 'antiraids');
            if (!msgs.tiene(event.author.id)) {
                msgs.establecer(event.author.id, 0);
            }
            msgs.sumar(event.author.id, 1);
            let amount = await msgs.obtener(event.author.id);
            if (amount >= mensajes) {
                if (action.toLowerCase() == 'kick') {
                    msgs.eliminar(event.author.id);
                    event.guild.member(event.author).kick("ZetaCorp NPM - Antiping enabled");
                    event.channel.send(`<@${event.author.id}> was kicked`);
                } else if (action.toLowerCase() == 'ban') {
                    msgs.eliminar(event.author.id);
                    event.guild.member(event.author).ban("ZetaCorp NPM - Antiping enabled");
                    event.channel.send(`<@${event.author.id}> was banned`);
                } else {
                    Error('The antiping action could not be found');
                }
            }
        }
        setTimeout(() => {
            msgs.eliminar(event.author.id);
        }, tiempo);
    } catch (e) {
        Error(e);
    }
}

async function a() {

}

async function antiraid(userType, tiempo, amount, event) {
    try {
        if (!userType) return Error('The antiraid system user to ban was not specified, types: USERS/BOTS/ALL ');
        if (!tiempo) return Error('The time with which the antiping will reset the messages has not been specified. (Antiraid system)');
        if (!amount) return Error('The required amount of channel to create / delete to activate the detector has not been specified. (Antiraid system)');
        if (!event) {
            Error('The event type has not been specified, by default: channel. ');
            event = channel;
        }

        const raiddetectt = new db.crearDB('raiddetect', 'antiraid');
        if (!raiddetectt.tiene(event.guild.id)) {
            raiddetectt.establecer(event.guild.id, 0);
        }

        if (raiddetectt.tiene(event.guild.id)) {
            const raid = await raiddetectt.obtener(event.guild.id);
            if (raid >= amount) {
                event.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(logs => {
                    let persona = logs.entries.first().executor;
                    if (userType.toLowerCase() == 'bots') {
                        if (event.author.bot) {
                            event.guild.member(persona).ban("ZetaCorp NPM - Antiraid enabled");
                        }
                    } else if (userType.toLowerCase() == 'users') {
                        if (!event.author.bot) {
                            event.guild.member(persona).ban("ZetaCorp NPM - Antiraid enabled");
                        }
                    } else if (userType.toLowerCase() == 'all') {
                        event.guild.member(persona).ban("ZetaCorp NPM - Antiraid enabled");
                    } else {
                        Error('The antiraid action could not be found. ');
                    }
                });
            } else {
                raiddetectt.sumar(event.guild.id, 1);
            }
            setTimeout(() => {
                raiddetectt.establecer(event.guild.id, 0);
            }, tiempo);
        }
    } catch (e) {
        Error(e);
    }
}

async function disable() {
    npmZetaCorp = false;
}

async function enable() {
    npmZetaCorp = true;
}

module.exports = {
    antiraid, disable, enable, antibots,
    antijoins, antiping
}