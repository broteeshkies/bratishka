import Action from './Action';

export default class MobxAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /\bmobx\b/);
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    this.bot.sendMessage(chatId,
      'https://camo.derpicdn.net/bec40cfc22f5fa5d681dea83ade712e7fe48ad99?url=http%3A%2F%2Ffc01.deviantart.net%2Ffs71%2Fi%2F2012%2F149%2F6%2F9%2Fno__9gag__by_hujikari-d51hu4l.jpg');
  }
}
