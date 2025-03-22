require("dotenv").config();
const fs = require("fs");
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

const API_ID = Number(process.env.API_ID);
const API_HASH = process.env.API_HASH;
const SESSION_PATH = ".env";

let session = new StringSession(process.env.SESSION || "");

const client = new TelegramClient(session, API_ID, API_HASH, { connectionRetries: 5 });

(async () => {
    let lang;
    while (true) {
        lang = (await input.text("Выберите ваш язык RU/ENG | Select your language RU/ENG: ")).toUpperCase();
        if (lang === "RU" || lang === "ENG") break;
        console.log("Некорректный ввод. Пожалуйста, введите RU или ENG. | Invalid input. Please enter RU or ENG.");
    }
    
    const messages = {
        RU: {
            login: "🔹 Вход в Telegram...",
            enterPhone: "Введите номер телефона: ",
            enterPassword: "Введите пароль (если есть 2FA): ",
            enterCode: "Введите код из Telegram: ",
            loggedIn: "Вход выполнен. Сессия сохранена.",
            sessionSaved: "Сессия сохранена в .env",
            enterChannel: "Введите юзернейм канала (без @): ",
            waitingMessages: (channel) => `🔍 Ожидание сообщений в канале @${channel}...`
        },
        ENG: {
            login: "🔹 Logging into Telegram...",
            enterPhone: "Enter your phone number: ",
            enterPassword: "Enter your password (if 2FA is enabled): ",
            enterCode: "Enter the code from Telegram: ",
            loggedIn: "Login successful. Session saved.",
            sessionSaved: "Session saved in .env",
            enterChannel: "Enter the channel username (without @): ",
            waitingMessages: (channel) => `🔍 Waiting for messages in channel @${channel}...`
        }
    };
    
    console.log(messages[lang].login);
    await client.start({
        phoneNumber: async () => await input.text(messages[lang].enterPhone),
        password: async () => await input.text(messages[lang].enterPassword),
        phoneCode: async () => await input.text(messages[lang].enterCode),
        onError: (err) => console.log(err),
    });

    const savedSession = client.session.save();
    console.log(messages[lang].loggedIn);

    if (!process.env.SESSION || process.env.SESSION !== savedSession) {
        fs.writeFileSync(SESSION_PATH, `API_ID=${API_ID}\nAPI_HASH=${API_HASH}\nSESSION=${savedSession}`);
        console.log(messages[lang].sessionSaved);
    }

    const channelUsername = await input.text(messages[lang].enterChannel);

    client.addEventHandler(async (event) => {
        const message = event.message;
        if (message && message.peerId.channelId) {
            console.log(`[${channelUsername}] ${message.message}`);
        }
    });

    console.log(messages[lang].waitingMessages(channelUsername));
})();