import Action from './Action';

export default class BratanAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /бра(т|тан|тишка)/);
  }

  doAction(message) {
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
