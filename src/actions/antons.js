import sample from 'lodash/sample';
import Action from './Action';

export default class AntonsAction extends Action {

  messages = [
    'Борисович',
    'криптобаронс',
    'странствующий программист',
    'поменяй A и B без переменной',
    'пиши в двух словах "s" - так надежнее',
    'ел. Охуеные фисташки, прямо заебись',
    'Короче, здесь весело. Можно послушать охуенные аудиоспектакли, послушать охуенные истории Антонса @antouhou про то как какая-то телка брила свою пизду в лесу и смотрела на него, про всякие NDA о которых ничего не известно, про шестизначные зарплаты, и тому подобное, про bem + react, про миллионные выборки из mysql баз и не только, про то что mongo это говно которое на надо использовать, и еще куча, куча, КУЧА ИНТЕРЕСНОСТЕЙ.\
\
\НЕ ПЕРЕКЛЮЧАЙТЕСЬ.',
  ]

  doAction(message) {
    this.sendMessage(message, sample(this.messages));
  }

  test(message) {
    return this.testMessageRegExp(message, /антонс/);
  }

}
