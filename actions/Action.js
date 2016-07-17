export default class Action {
  constructor (bot) {
    this.bot = bot;
  }

  testMessageRegExp(message, regExp) {
    var text = message.text.toLowerCase();
    return text.match(regExp);
  }
}
