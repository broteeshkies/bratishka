import Action from './Action';

export default class WinAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /проиграл/);
  }

  doAction(message) {
    this.sendMessage(message, 'а я выиграл');
  }
}
