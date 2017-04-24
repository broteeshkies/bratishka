import Action from './Action';

export default class TuesdayAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /вторник/);
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    this.bot.sendMessage(chatId, 'идем бухать!');
  }
}
