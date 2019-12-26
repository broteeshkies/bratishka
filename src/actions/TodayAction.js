import Action from './Action';

export default class TodayAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'TodayAction';
  }

  test(message) {
    const date = new Date(message.date * 1000);
    return this.testMessageRegExp(message, /(день|сегодня)/) && date.getDay() == 2;
  }

  doAction(message) {
    this.log('doAction');
    this.sendMessage(message, 'О! Да сегодня же вторник!');
  }
}
