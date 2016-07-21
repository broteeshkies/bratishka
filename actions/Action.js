export default class Action {
  constructor (bot) {
    this.bot = bot;
  }

  testMessageRegExp(message, regExp) {
    if (!message.text) return false;
    var text = message.text.toLowerCase();
    return text.match(regExp);
  }

  testGroupId(message, id){
    const chatId = message.chat.id || message.from.id;
    return chatId == id;
  }

  letter = '[a-zA-Zа-яА-ЯёЁ0-9]'
  notletter = '[^a-zA-Zа-яА-ЯёЁ0-9]'

  wordBoundary(text, word){
    text.toLowerCase();
    const regExp = new RegExp("\\s" + word + "\\s", "g");
    text = text.replace(new RegExp(this.notletter, 'g'), ' ');
    text = " " + text + " ";
    console.log(text, text.match(regExp));
    return text.match(regExp);
  }
}
