import Action from './Action';

export default class AntonsAction extends Action {
  test (message) {
    return this.testMessageRegExp(message, /антонс/);
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    this.bot.sendMessage(chatId, 'Борисович');
  }
}
