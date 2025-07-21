const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  downloadContentFromMessage
} = require('@whiskeysockets/baileys');

const P = require('pino');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const { Boom} = require('@hapi/boom');

// 🎉 Emoji list (50+)
const emojis = [
  "🔥","😂","😍","😎","🤖","💯","🎉","😢","👏","🎶",
  "🚀","🌍","❤️","🫶","🎯","📸","🐧","👻","🧘","🦾",
  "🛠️","⚡️","📚","😜","🤩","🍀","👽","🌈","🪄","🎃",
  "🌟","🪐","📡","🥳","💥","😅","😬","🥹","🧠","💣",
  "🧃","🧢","🐲","😴","🙏","😡","🤔","👀","📌","🎵"
];

async function startBot() {
  const { state, saveCreds} = await useMultiFileAuthState('./auth');
  const { version} = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: 'silent'}),
    browser: ['BOT LANG🔥', 'Chrome', '10.0.0'],
    markOnlineOnConnect: true
});

  sock.ev.on('creds.update', saveCreds);

  // 🔄 Connection & QR
  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr}) => {
    if (qr) {
      console.log(chalk.blue('📲 Scan QR haraka kabla haija-expire!'));
      qrcode.generate(qr, { small: true});
}
    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      if (reason === DisconnectReason.loggedOut) {
        console.log(chalk.red('❌ Ume-logout. QR mpya inahitajika.'));
        startBot();
} else {
        console.log(chalk.yellow('🔁 Connection imekatika. Inajirudia...'));
        startBot();
}
} else if (connection === 'open') {
      console.log(chalk.green.bold('✅ BOT LANG Connected! Ready to blast 🚀'));
}
});

  // 📨 Message Handler
  sock.ev.on('messages.upsert', async ({ messages}) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe || msg.key.remoteJid === 'status@broadca>

    const from = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?>

    // 🕹️ Always online, Typing & Recording
    await sock.sendPresenceUpdate('available');
    await sock.sendPresenceUpdate('composing', from);
    await sock.sendPresenceUpdate('recording', from);

    // ✅ Auto Read
    await sock.readMessages([msg.key]);

    // 🎭 Auto React
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    await sock.sendMessage(from, { react: { text: emoji, key: msg.key}});

    // 🤖 AI Placeholder
    if (text?.toLowerCase() === 'ai') {
      await sock.sendMessage(from, { text: '🤖 Karibu kwenye BOT LANG AI! Uliza>
}

    // 📋!menu Command
    if (text?.toLowerCase() === '!menu') {
      await sock.sendMessage(from, {
