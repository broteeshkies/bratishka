import Action from './Action';

export default class AzazaAction extends Action {

  messages = [
    'очень весело',
    ')))))))))))))))))))))))))))))))))))))))))))))))',
    'ахаха ахаха ахаха',
    'азаза просто',
    ':DDDDDDDDDDDDDDDDDDDDDDDDDDD',
    'x-DDDDDDDDDDDDDDDDDDDDDDDDDDD',
  ]

  test (message) {
    return this.testMessageRegExp(message, /\){4,}/);
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    this.bot.sendMessage(chatId, this.messages[this.randomInteger(0, this.messages.length-1)]);
  }
}
