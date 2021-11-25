const chalk = require('chalk');
const db = require('megadb');
const zc = require('zetacorp-antiraid')
var npmZetaCorp = true;
if (npmZetaCorp == false) return;

function Error(err) {
    return console.log(chalk.red('ERROR: ') + chalk.yellow(err));
}
function Alert(alert) {
    return console.log(chalk.yellow('WARNING: ' + chalk.red(alert)));
}

async function antijoins(action, event) {
    try {
        if (!event) {
            Error('The event type has not been specified, by default: member.');
            event = member;
        }
        if (!action) {
            Error('The action has not been declared (KICK/BAN)')
        }
        if (action.toLowerCase() == 'kick') {
        event.guild.member(event).kick('ZetaCorp NPM - Antijoins active');
        } else if (action.toLowerCase() == 'ban') {
            event.guild.member(event).ban('ZetaCorp NPM - Antijoins activated')
        }
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

async function antigrabbers(message) {
    try {
        const links = [
            "2no.co",
            "blasze.com",
            "blasze.tk",
            "gotyouripboi.com",
            "iplogger.com",
            "iplogger.org",
            "iplogger.ru",
            "ps3cfw.com",
            "yip.su",
            "bmwforum.co",
            "bucks.as",
            "cyberh1.xyz",
            "discörd.com",
            "disçordapp.com",
            "fortnight.space",
            "fortnitechat.site",
            "freegiftcards.co",
            "grabify.link",
            "joinmy.site",
            "leancoding.co",
            "minecräft.com",
            "quickmessage.us",
            "särahah.eu",
            "särahah.pl",
            "shört.co",
            "spötify.com",
            "spottyfly.com",
            "starbucks.bio",
            "starbucksisbadforyou.com",
            "starbucksiswrong.com",
            "stopify.co",
            "xda-developers.us",
            "youshouldclick.us",
            "yoütu.be",
            "yoütübe.co",
            "yoütübe.com",
            "youtubeshort.watch",
            "adblade.com",
            "adcash.com",
            "adcell.de",
            "adexchangecloud.com",
            "adf.ly",
            "adfoc.us",
            "adforce.com",
            "bc.vc",
            "bitl.cc",
            "btcclicks.com",
            "ceesty.com",
            "cur.lv",
            "fastclick.com",
            "getcryptotab.com",
            "gmads.net",
            "l2s.pet",
            "linkbucks.com",
            "linkshrink.net",
            "miniurl.pw",
            "nitroclicks.com",
            "ouo.io",
            "pay-ads.com",
            "petty.link",
            "pnd.tl",
            "restorecosm.bid",
            "sh.st",
            "short.es",
            "shorte.st",
            "shrtz.me",
            "udmoney.club",
            "uii.io",
            "ur-l.me",
            "vivads.net",
            "xponsor.com",
            "zeusclicks.com",
            "zipansion.com",
            "black-friday.ga",
            "boost.ink",
            "easycommerce.cf",
            "featu.re",
            "free.gg",
            "justdoit.cards",
            "makeprogress.ga",
            "pointsprizes.com",
            "referralpay.co",
            "selly.gg",
            "shoppy.gg",
            "weeklyjob.online",
            "wn.nr",
            "nakedphotos.club",
            "privatepage.vip",
            "viewc.site",
            "baymack.com",
            "btconline.io",
            "btcpool.io",
            "freebitco.in",
            "minero.cc",
            "outbuck.com",
            "alex-nv.ru",
            "alexandrnav.ru",
            "alexandrs1.ru",
            "amazingsexdating.com",
            "clooud9.xyz",
            "cloud9team.fun",
            "cloud9team.space",
            "cloudteam9.com",
            "cloudteam9.fun",
            "cs-moneiy.us",
            "csgocyber.ru",
            "csgocyber.ru",
            "easter-event.com",
            "ezence.ink",
            "ezrobux.gg",
            "fnaticprize.site",
            "fnaticwin.xyz",
            "fortnite.cards",
            "fortnite.events",
            "fortnite-christmas.com",
            "fortnite-gifts.com",
            "fortnite-giveaway.com",
            "fortnite-special.com",
            "fortnite-vbuck.com",
            "fortnite-vbucks.de",
            "fortnite-vbucks.net",
            "fortnite.cards",
            "fortnite.events",
            "fortnitevb.com",
            "free-gg.com",
            "free-steam-code.com",
            "gams-toph.xyz",
            "giveawaybot.pw",
            "intimki.com",
            "katowice.ru",
            "keymagic.me",
            "libra-sale.io",
            "lootweapons.com",
            "magicstreek.me",
            "myetherermwallet.com",
            "natus-vincerygivez.xyz",
            "navi.auction",
            "new-give.com",
            "nv-box.com",
            "nv-drop.com",
            "operation-broken.xyz",
            "oprewards.com",
            "rbxfree.com",
            "roblox-christmas.com",
            "robloxsummer.com",
            "rocketcase.xyz",
            "roll-case.com",
            "rollskin.ru",
            "rustgift.ru",
            "seamcommunlty.com",
            "seamcommunty.com",
            "sleamcomnnunity.me",
            "sleamconnunnity.me",
            "sleamcormunity.me",
            "sreancommuniity.com",
            "staemcommeuneuity.ru",
            "staerncomrmunity.com",
            "steaamcomnnunity.com",
            "steaimeecommuniity.com",
            "steam-event.com",
            "steam-gift-codes.com",
            "steam-money.org",
            "steam-promo-page.ml",
            "steam-wallet-rewards.com",
            "steamcannunlty.com",
            "steamcommanitty.ru",
            "steamcomminiity.site",
            "steamcommnnunnity.world",
            "steamcommnunty.com",
            "steamcommunity-com.xyz",
            "steamcommunniitly.ru",
            "steamcommunyru.com",
            "steamcommunyti.ru",
            "steamcommunytu.ru",
            "steamcomnuniity.ru",
            "steamcomrnuniuty.com",
            "steamcomrrnunity.com",
            "steamcomunity.ru",
            "steamconnunjty.com",
            "steamcornmuniti.xyz",
            "steammcomunity.ru",
            "steamncomnmunity.com",
            "steamprofiles.site",
            "steampromote.com",
            "steamquests.com",
            "steamreward.com",
            "steamspecial.com",
            "steamsummer.com",
            "steamtradeoffer.ml",
            "steancommuinity.me",
            "steancommutitly.ru",
            "steancomunnity.com",
            "steancomunnity.ru",
            "steancoommunlty.ru",
            "steanncomunitly.com",
            "steannconnnnunity.com",
            "stearmcommunitty.ru",
            "stearmcommunity.ru",
            "stearmcommunnitty.ru",
            "stearmcommunnity.ru",
            "steemcommunnity.ru",
            "stermccommunitty.ru",
            "stermcommuniity.com",
            "sterrmccommunity.ru",
            "stleamconnunlty-tyztradeoffernewpartnhr15902271.xyz",
            "streamcommuniuity.com",
            "streamcommunnitly.com",
            "streamcomnunely.com",
            "streancommunitiy.icu",
            "streancommunuty.ru",
            "strearmcomunity.ru",
            "steamconmunity.co",
            "steancommunity.com",
            "steancommunytiu.ru",
            "toom-skins.xyz",
            "topr-games.xyz",
            "topw-gamez.xyz",
            "topz-games.xyz",
            "trade-offers.me",
            "whatsappx.com",
            "wild-day.com",
            "winfnatic.pro",
            "wowcloud9.com",
            "wowfnatic.com",
            "wowfnatic.site",
            "getlⅰbra.tech",
            "ngrok",
            "stearncommuty.com",
            "discord-gifts.me",
            "giftdiscord.site",
            "steamcommunityz.com",
            "eonxcrypto.com",
            "steamcomminutiu.ru",
            "steamcomminytiu.ru",
            "steamncommunitu.co",
            "steamcomrnunity.ru",
            "stearmmcomunitty.ru",
            "dicsord.space",
            "steamcommunlilty.com",
            "discord.wales",
            "discord-gift.co",
            "steamcomnunnirty.ru",
            "stearmmcomunity.ru",
            "steamcomrnunitiy.com",
            "dlscord.online",
            "rocket-way.com",
            "steamcommunlilty.com",
            "linkdeej.com",
            "dlscord.press",
            "leech.is",
            "discordgivenitro.com",
            "steancomnunytu.ru",
            "discrodnitro.org",
            "steamcommytiny.com",
            "steamcommnunylti.com",
            "steamcommunityu.ru",
            "stieamcommuunitey.us",
            "steamcommunity.link",
            "stermmcomuniity.ru",
            "bit.do",
            "steamcommutyniu.com",
            "dlscord.work",
            "glft-discord.com",
            "steamcommunitiyu.com",
            "discorcl.link",
            "discorcl.art",
            "keydropcs.ru",
            "steamcommunutiy.com",
            "steamcomrninuty.link",
            "steamgivenitro.com",
            "stermcomunniity.ru",
            "steamcomnumily.com",
            "nitro-airdrop.org",
            "dicord.gift",
            "discord-nitro.su",
            "steamcommmunilty.com",
            "free-nitlross.ru",
            "diskord.ru.com",
            "discord-nitro.link",
            "steamconmumnity.com",
            "steancommunity.link",
            "freenitros.ru",
            "discordnltro.com",
            "discorb.ru.com",
            "discorcl.click",
            "discordgift.ru.com",
            "discordglft.ru",
            "discodnitro.info",
            "dlscordgift.com",
            "steamcomminuty.com",
            "discord-airdrop.com",
            "dlscord-app.com",
            "discord-app.ru.com",
            "dlscord-nitro.click",
            "steamdiscord.com",
            "dicsordgift.com",
            "discrodapp.ru",
            "discord-give.com"
        ]
        if (links.some(word => message.content.toLowerCase().includes(word))) {
            message.delete()
            message.member.kick("ZetaCorp NPM - Send token grabber")
            message.channel.send(new Discord.MessageEmbed().setTitle('Malicious link :warning:').setDescription(`User ${message.author.tag} \`( ${message.author.id} )\` has sent a virus and has been kicked for more protection.`).setColor('YELLOW').setTimestamp().setThumbnail(message.author.displayAvatarURL({ dynamic: true })))
        }
    } catch (err) {
        Error("There was an error with antigrabbers function: " + err)
    }
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
    antijoins, antiping, antigrabbers
}