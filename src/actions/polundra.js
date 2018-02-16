import Action from './Action';

export default class WinAction extends Action {

  users = [
    'isuvorov',
    'volkovpishet',
    'natavts',
    'anorudes',
    'immuzov',
    'antouhou',
    'yukioru_k',
    'durob',
    'AtNovember',
    'THEHVZE',
    'flood7',
    'romankalinkin',
    'Andru_x',
    'vozilov',
    'NightRomantic',
    'selslack',
    'Sanich63',
    'hinex',
    'xfocuse',
    'Sanich63',
    'edinstvennyi',
    'ma3xxx',
    'leyoiv',
    'seegi',
    'ArkadyB',
    'hopacha',
  ]


  test(message) {
    return this.testMessageRegExp(message, /полундра/) && this.percentProbability(100);
  }

  doAction(message) {
    this.sendMessage(message, 'Нас АТАКУЮТ!');
    this.sendMessage(message, 'ПОЛУДРА!!!'  + this.users.map(a => '@' + a).join(' '));
  }
}
