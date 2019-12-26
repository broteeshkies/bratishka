import Action from './Action';

export default class WinAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'WinAction';
  }

  test(message) {
    return this.testMessageRegExp(message, /проиграл/) && this.percentProbability(50);
  }

  doAction(message) {
    this.log('doAction');
    this.sendMessage(message, 'а я выиграл');
  }
}
