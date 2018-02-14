import Action from './Action';
import sample from 'lodash/sample';

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
    'За тобой уже выехали...',
  ]

  test(message) {
    if (message.photo && this.percentProbability(5)) return true;
    return false;
  }

  doAction(message) {
    this.sendMessage(message, sample(this.messages));
    this.sendSticker(message, 'CAADAgADcAUAAhC6EgABord0yKqaTVUC');
  }
}
