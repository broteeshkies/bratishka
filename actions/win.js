import Action from './Action';

export default class WinAction extends Action {
  test (message) {
    return this.testMessageRegExp(message, /проиграл/);
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    this.bot.sendMessage(chatId, 'а я выиграл');
  }
}
