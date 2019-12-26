import Action from './Action';

export default class TuesdayAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'TuesdayAction';
  }

  test(message) {
    return this.testMessageRegExp(message, /вторник/);
  }

  doAction(message) {
    this.log('doAction');
    this.sendMessage(message, 'идем бухать!');
  }
}
