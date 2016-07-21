import Action from './Action';

export default class TodayAction extends Action {
  test (message) {
    return this.testMessageRegExp(message, /(день|сегодня)/);
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    const date = new Date(message.date * 1000);
    if (date.getDay() == 2) this.bot.sendMessage(chatId, 'О! Да сегодня же вторник!');
  }
}
