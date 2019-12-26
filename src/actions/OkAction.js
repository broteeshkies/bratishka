import Action from './Action';
import _ from 'lodash';

export default class OkAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'OkAction';
  }

  test(message) {
    return !!(message.text && this.percentProbability(5));
  }

  async doAction(message) {
    this.log('doAction');
    try {
      const firstWord = _.shuffle(message.text.split(' '))[0].match(/[a-zA-Zа-яА-ЯёЁ]+/)[0];
      const url = `http://stavklass.ru/images/autocomplete.json?term=${encodeURI(firstWord)}`;

      fetch(url)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((stories) => {
          if (!stories.length) return;
          const story = _.shuffle(stories)[0];
          this.sendMessage(message, story);
        });
    } catch (err) {
    }
  }
}
