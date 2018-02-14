import Action from './Action';

export default class BoobsAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /сис(ек|ьки|ечки|и|яндры)/);
  }

  doAction(message) {
    this.sendSticker(message, 'BQADAgADAgIAAhC6EgABOZ7L55JaKysC');
  }
}
