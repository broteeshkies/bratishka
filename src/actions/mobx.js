import Action from './Action';

export default class MobxAction extends Action {
  test (message) {
    return this.testMessageRegExp(message, /\bmobx\b/);
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    this.bot.sendMessage(chatId,
      'https://ga2mer.github.io/assets/601aa39318bb5d828cac1b4bdc49f6f1.png');
  }
}
