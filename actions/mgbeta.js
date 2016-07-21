import Action from './Action';
const mgbetaChatId = -1001042071273;
export default class BatishkaAction extends Action {
  test (message) {
    return this.testMessageRegExp(message, /^mgbeta/);
  }

  doAction(message) {
    const text = message.text.substr(7);
    // console.log(message)
    // const chatId = message.chat.id || message.from.id;
    const firstName = message.from.first_name;
    const lastName = message.from.last_name;
    const username = message.from.username;
    console.log("[mgbeta] " + firstName + " " + lastName + " (" + username + "): " + text);
    this.bot.sendMessage(mgbetaChatId, text);
  }
}
