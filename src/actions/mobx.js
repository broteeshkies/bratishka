import sample from 'lodash/sample';
import Action from './Action';

export default class MobxAction extends Action {
  stickers = [
    'CAADAQAD_gIAAnTnKwIX_7XQo_4iNAI',
    'CAADAQADGgMAAnTnKwLmqhhn5jh30QI',
    'CAADAgADhQADEAcEAAFWHmZsoJ1P9AI',
    'CAADAgADgwADEAcEAAHJD8rBoTPxnAI',
    'CAADAQAD0gIAAnTnKwIbvHBCcCfnaAI',
    'CAADAQADXgIAAnTnKwLZQrbwbrLO_gI',
    'CAADAQADdAIAAnTnKwKks-io2cdZYwI',
    'CAADAQADhwIAAnTnKwJXVA0poaqG4wI',
    'CAADAQADVgIAAnTnKwIvX-j-bpQTmwI',
    'CAADAgADSAMAAswJPAb82xsr_NCvTQI',
    'CAADAgADRgMAAswJPAaflgVlsoibuAI',
  ]
  test(message) {
    return this.testMessageRegExp(message, /\bmobx|typescript|backbone|angular|erlang\b/)  && this.percentProbability(50);
  }

  doAction(message) {
    this.sendSticker(message, sample(this.stickers), {
      reply: 100
    });
  }
}
