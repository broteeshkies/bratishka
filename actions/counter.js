import Action from './Action';

export default class CounterAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /counter\sstart/);
  }

  doAction(message) {
    var counter = 0;
    const bot = this.bot;
    console.log(message);
    let chatId = message.chat.id || message.from.id;
    bot.sendMessage(chatId, counter)
      .then(function (sended) {
        console.log(sended);
        let chatId = sended.chat.id;
        let messageId = sended.message_id;

        setInterval(function () {
          bot.editMessageText(++counter, { chat_id: chatId, message_id: messageId });
        }, 1000);

      });
  }
}
