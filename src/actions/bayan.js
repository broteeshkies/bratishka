import Action from './Action';

export default class BayanAction extends Action {

  messages = [
    'зачем это здесь?',
    'БАЯН!',
    'В прошлом веке кидали уже',
    'Кого ты этим хотел удивить?',
    'Все уже видели',
    'Зачем такое вообще постить?',
    'Смщная картинка? Чот не весело...',
    'КГ/АМ',
    'аффтар жжошь',
    'баянище',
    'ну это ваще баян',
    'За тобой уже выехали...'
  ]

  test (message) {
    console.log(message.photo);
    console.log(this.sendLimiter(1, 10));
    if (message.photo && this.sendLimiter(1, 10)) return true;
    return false;
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    this.bot.sendMessage(chatId, this.messages[this.randomInteger(0, this.messages.length-1)]);
  }
}
