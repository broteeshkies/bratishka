export default class Action {
  constructor (bot) {
    this.bot = bot;
  }

  testMessageRegExp(message, regExp) {
    if (!message.text) return false;
    var text = message.text.toLowerCase();
    return text.match(regExp);
  }
}
