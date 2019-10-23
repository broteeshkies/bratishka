import random from 'lodash/random';
export default class Action {
  constructor(bot) {
    this.bot = bot;
  }

  testMessageRegExp(message, regExp) {
    if (!message.text) return false;
    const text = message.text.toLowerCase();
    return text.match(regExp) != null;
  }

  testGroupId(message, id) {
    const chatId = message.chat.id || message.from.id;
    return chatId == id;
  }

  letter = '[a-zA-Zа-яА-ЯёЁ0-9]'
  notletter = '[^a-zA-Zа-яА-ЯёЁ0-9]'

  wordBoundary(text, word) {
    text.toLowerCase();
    const regExp = new RegExp(`\\s${word}\\s`, 'g');
    text = text.replace(new RegExp(this.notletter, 'g'), ' ');
    text = ` ${text} `;
    return text.match(regExp);
  }

  randomInteger(min, max) {
    return random(min, max);
  }

  percentProbability(percent) {
    const r = random(0, 100);
    // console.log(r, percent, r <= percent);
    return r < percent;
  }

  send(msg, text, params) {
    let {
      delay = random(0, 5, 1),
      reply = 50,
      method = 'sendMessage',
    } = params;
    const chatId = msg.chat.id || msg.from.id;
    const bot = this.bot;
    const opt = this.percentProbability(reply) ? {
      reply_to_message_id: msg.message_id
    } : {};

    setTimeout(function () {
      bot[method](chatId, text, opt);
    }, delay);
  }
  sendSticker(msg, text, params = {}) {
    this.send(msg, text, {
      ...params,
      method: 'sendSticker',
    })
  }
  sendMessage(msg, text, params = {}) {
    this.send(msg, text, {
      ...params,
      method: 'sendMessage',
    })
  }

  editMessage(msg, text, params = {}) {
    msg.then((sended) => {
      const chatId = sended.chat.id;
      const messageId = sended.message_id;
      this.bot.editMessageText(text, { chat_id: chatId, message_id: messageId });
    });
  }

  deleteMessage(chat_id, message_id, params = {}) {
    this.bot.deleteMessage(chat_id, message_id, params);
  }

}