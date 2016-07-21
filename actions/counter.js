import Action from './Action';

const animation = [
  '✌  😄  ✌',
  '☝️  😄  👍',
  '💪  😄  👉',
  '🖕  😄  🖕',
]

export default class CounterAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /инферно/);
  }

  doAction(message) {
    var counter = 0;
    const bot = this.bot;
    console.log(message);
    let chatId = message.chat.id || message.from.id;
    bot.sendMessage(chatId, "💥💥💥💥💥!!!В Н И М А Н И Е!!!💥💥💥💥💥")
      .then(function (sended) {
        console.log(sended);
        let chatId = sended.chat.id;
        let messageId = sended.message_id;

        const intervalId = setInterval(function () {
          const msg = animation[counter % animation.length];
          bot.editMessageText(msg, { chat_id: chatId, message_id: messageId });
          if(counter > animation.length * 2) {
            clearInterval(intervalId)
            setTimeout(function () {
              bot.editMessageText('*DELETED*', { chat_id: chatId, message_id: messageId, parse_mode: 'Markdown'})
            }, 1000)

          }
          counter += 1
        }, 1000);

      });
  }
}
