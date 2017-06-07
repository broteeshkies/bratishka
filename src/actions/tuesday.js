import Action from './Action';

export default class TuesdayAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /вторник/);
  }

  doAction(message) {
    this.sendMessage(message, 'идем бухать!');
  }
}
