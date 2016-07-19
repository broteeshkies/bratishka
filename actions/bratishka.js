import Action from './Action';

export default class BatishkaAction extends Action {
  test (message) {
    return this.testMessageRegExp(message, /братишк(а|и)/);
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    this.bot.sendMessage(chatId, 'да-да?');
  }
}
