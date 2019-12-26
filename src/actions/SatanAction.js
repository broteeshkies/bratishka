import sample from 'lodash/sample';
import Action from './Action';

export default class SatanAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'SatanAction';
  }

  stickers = [
    'CAADAgAD5AIAAn-zKAvIZj1nxOWI3gI',
    'CAADAgADDQADFgqsEBPksgi8lxcaAg',
    'CAADAgAD8wADnNbnCipVHrwYCu1SAg',
    'CAADAgADiAADT4F2CUt4D5jwz-QOAg',
    'CAADAQADagwAAtpxZgeliZcVA8gcEQI',
    'CAADAQADYgwAAtpxZgeDcN_gTrVjvQI',
    'CAADAQADRAwAAtpxZgeTJuYR-0zD4wI',
    'CAADAQADUgwAAtpxZgdR49O4lUJEXwI',
    'CAADAQADXAwAAtpxZgcSyCEgE1sSEQI',
    'CAADAQADWAwAAtpxZgdICwOXTwE3OwI',
    'CAADAQADbAwAAtpxZgcRT2e3vbMuWAI',
    'CAADAgADKwEAApzW5wp__qM67wEz8gI',
    'CAADAgADOwMAAn-zKAtsON4qTs3_zwI',
    'CAADAgAD5gIAAn-zKAtJNzjmq1a9mwI',
    'CAADAgADNQMAAn-zKAsLna_yt9NFPwI',
    'CAADAgAD6AIAAn-zKAvjFJLTH-_T8AI',
    'CAADAgAD1gIAAn-zKAtDnjywFSLe_QI',
  ];

  messages = [
    'ВО СЛАВУ САТАНЕ, КОНЕЧНО!',
    'ВО СЛАВУ АЛЛАХА, КОНЕЧНО!',
    'ВО СЛАВУ ИИСУСА, КОНЕЧНО!',
    'ВО СЛАВУ БУДДЫ, КОНЕЧНО!',
  ];

  test(message) {
    return this.testMessageRegExp(message, /зачем/) && this.percentProbability(50);
  }

  doAction(message) {
    this.log('doAction');
    this.sendMessage(message, sample(this.messages));
    this.sendSticker(message, sample(this.stickers));
  }
}
