import sample from 'lodash/sample';
import Action from './Action';

export default class CatsAction extends Action {

  messages = [
    'нет, ты котик',
    'нАрКотИК!!1!!',
    'сам ты котик пушистый',
    'кысь-кысь, котяндра',
    'кот-котэ-котик-ко_тян_дроч_ка',
    'килограмм корма за хурму!1!!!1!!'
    'а можно фотку киски ?'
  ]

  async getCat(message) {
    try {
      const resp = await fetch('https://api.thecatapi.com/v1/images/search?size=full');
      // resp in json format
      const data = await resp.json();
      //const url = data[0].url;
      const [{ url }] = data;
      
      this.sendPhoto(message, url);
    } catch(err) {
      console.error({ err });
    }
    
  }
   
  doAction(message) {
    this.percentProbability(50) ?  
      this.getCat(message) :
      this.sendMessage(message, sample(this.messages));
  }

  test(message) {
    return this.testMessageRegExp(message, / котик || кусь /);
  }

}

