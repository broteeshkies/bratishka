import Action from './Action';

export default class TodayAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /(день|сегодня)/);
  }

  doAction(message) {
    const date = new Date(message.date * 1000);
    if (date.getDay() == 2) this.sendMessage(message, 'О! Да сегодня же вторник!');
  }
}
