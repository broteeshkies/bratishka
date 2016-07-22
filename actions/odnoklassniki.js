import Action from './Action';
import http from 'http';
import _ from 'lodash';

export default class OkAction extends Action {
  test(message) {
    if (message.text && this.sendLimiter(1, 10)) return true;
    return false;
  }

  async doAction(message) {
    const bot = this.bot;
    let chatId = message.chat.id || message.from.id;
    // console.log(message.text, message.text.match(/\w+/u));
    const firstWord = message.text.match(/[a-zA-Zа-яА-ЯёЁ]+/)[0] || "йцу";
    // try{
      const url = 'http://stavklass.ru/images/autocomplete.json?term=' + encodeURI(firstWord)
    // } catch(e) {
    //   console.log(e);
    // }

    fetch(url)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
      if (!stories.length) return;
      const story = _.shuffle(stories)[0]
      bot.sendMessage(chatId, story)
        // console.log(stories);
    });

    // bot.sendMessage(chatId, counter)
    //   .then(function (sended) {
    //     console.log(sended);
    //     let chatId = sended.chat.id;
    //     let messageId = sended.message_id;
    //
    //     setInterval(function () {
    //       bot.editMessageText(++counter, { chat_id: chatId, message_id: messageId });
    //     }, 1000);
    //
    //   });
  }

  sendLimiter(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand == max;
  }
}
