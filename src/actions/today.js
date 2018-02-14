import Action from './Action';

export default class TodayAction extends Action {
  test(message) {
    const date = new Date(message.date * 1000);

    return this.testMessageRegExp(message, /(день|сегодня)/) && date.getDay() == 2;
  }

  doAction(message) {
    this.sendMessage(message, 'О! Да сегодня же вторник!');
  }
}
