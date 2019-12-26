import Action from './Action';

export default class BoobsAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'BoobsAction';
  }

  test(message) {
    return this.testMessageRegExp(message, /сис(ек|ьки|ечки|и|яндры)/);
  }

  doAction(message) {
    this.log('doAction');
    this.sendSticker(message, 'BQADAgADAgIAAhC6EgABOZ7L55JaKysC');
  }
}
