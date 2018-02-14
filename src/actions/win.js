import Action from './Action';

export default class WinAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /проиграл/) && this.percentProbability(50);
  }

  doAction(message) {
    this.sendMessage(message, 'а я выиграл');
  }
}
