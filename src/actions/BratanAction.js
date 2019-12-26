import Action from './Action';

export default class BratanAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'BratanAction';
  }

  test(message) {
    return this.testMessageRegExp(message, /бра(т|тан|тишка)/);
  }

  doAction(message) {
    this.log('doAction');
    const text = message.text.toLowerCase();

    let res;

    if (~text.indexOf('братан')) {
      res = 'Братишка';
    } else if (this.wordBoundary(text, 'брат')) {
      res = 'Братан братишка';
    } else {
      return false;
    }
    this.sendMessage(message, res);
  }


}
