import qs from 'querystring';
import Morphy from 'phpmorphy';
import get from 'lodash/get';
import sample from 'lodash/sample';
import lowerCase from 'lodash/lowerCase';
import upperCase from 'lodash/upperCase';
import translate from '../lib/translate';
import Action from './Action';

const { FSQR_CLIENT_ID, FSQR_CLIENT_SECRET } = process.env;
const HOST = 'https://api.foursquare.com/v2';
const ERR_MSG = 'Извини, я забыл как искать. Возможно когда-нибудь вспомню.';

const userCitiesEnum = {
  'имасе': 'Лимассол',
  'имас': 'Лимассол',
  'ижний': 'Нижний Новгород',
  'ижнем': 'Нижний Новгород',
  'нур-султане': 'Астана',
  'нур-султан': 'Астана',
  'спб': 'Санкт-Петербург',
  'мск': 'Москва',
  'тлт': 'Тольятти',
};

const restrictedCities = [
  'Солт Лейк Сити',
];

const eatPhrases = [
  'поесть в',
  'еда в',
  'пообедать в',
  'покушать в',
];

const drinkPhrases = [
  'нажраться в',
  'бухать в',
  'выпить в',
];

const coffeePhrases = [
  'выпить кофе в',
  'попить кофе в',
  'напитки в',
  'кофе в',
  'кофейни в',
];

const shopsPhrases = [
  'магазы в',
  'магазины в',
  'затариться в',
  'товары в',
];

const artsPhrases = [
  'насладиться в',
  'посмотреть в',
  'искусство в',
];

const sightsPhrases = [
  'достопримечательности в',
  'интересное в',
  'интересности в',
  'туристам в',
];

const outdoorsPhrases = [
  'сходить в',
  'пойти в',
  'найти в',
  'собраться в',
];

const phrases = [
  ...eatPhrases,
  ...drinkPhrases,
  ...coffeePhrases,
  ...shopsPhrases,
  ...artsPhrases,
  ...sightsPhrases,
  ...outdoorsPhrases,
];

const rx = new RegExp(`(${phrases.join('|')}) ([A-Za-zА-Яа-я0-9- ]+)`, 'i');

export default class PlacesAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, rx);
  }

  getSection(action) {
    const categories = ['food', 'drinks', 'coffee', 'shops', 'sights', 'outdoors'];
    let section = sample(categories);
    if (eatPhrases.includes(action)) section = categories[0];
    if (drinkPhrases.includes(action)) section = categories[1];
    if (coffeePhrases.includes(action)) section = categories[2];
    if (shopsPhrases.includes(action)) section = categories[3];
    if (sightsPhrases.includes(action)) section = categories[4];
    if (outdoorsPhrases.includes(action)) section = categories[5];
    return section;
  }

  async getPhoto(v, venueId) {
    if (!FSQR_CLIENT_ID && !FSQR_CLIENT_SECRET) {
      return null;
    }
    try {
      const res = await fetch(
        `${HOST}/venues/${venueId}/photos?${qs.stringify({
          client_id: FSQR_CLIENT_ID,
          client_secret: FSQR_CLIENT_SECRET,
          limit: 1,
          group: 'venue',
          v,
        })}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(res => res.json());
      const item = get(res, 'response.photos.items.0');
      if (!item) return null;
      const url = `${item.prefix}500${item.suffix}`;
      return url;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findVenues(v, near, section) {
    if (!FSQR_CLIENT_ID && !FSQR_CLIENT_SECRET) {
      return {
        caption: ERR_MSG,
      };
    }
    try {
      const res = await fetch(
        `${HOST}/venues/explore?${qs.stringify({
          client_id: FSQR_CLIENT_ID,
          client_secret: FSQR_CLIENT_SECRET,
          v,
          limit: 5,
          sortByPopularity: 1,
          openNow: 1,
          near,
          section
        })}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(res => res.json());
      const items = get(res, 'response.groups.0.items', []);
      const venues = items.map(({ venue }) => ({
        id: venue.id,
        name: venue.name,
        address: venue.location.address,
      }));
      const promises = items.map(({ venue }) => this.getPhoto(v, venue.id));
      const prePhotos = await Promise.all(promises);
      const photos = prePhotos.filter(e => !!e);
      const cityAddress = get(res, 'response.geocode.displayString');
      if (!cityAddress) {
        return {
          caption: 'Извини, я не нашел ничего в этом городе.',
        }
      }
      const caption = `
В <b>${cityAddress}</b>, есть несколько мест, которые сейчас открыты:
${venues.map((venue, index) => `
${index + 1}. <i>${venue.name}</i>${!!venue.address ? `
${venue.address}` : ''}
`).join('')}
      `;
      return {
        photos,
        caption,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async prepareCityName(_name) {
    let name = lowerCase(_name);
    if (restrictedCities.includes(name)) return name;
    if (userCitiesEnum[name]) name = userCitiesEnum[name];

    const morphy = new Morphy('ru', {
      storage: Morphy.STORAGE_MEM,
      predict_by_suffix: true,
      predict_by_db: true,
      graminfo_as_text: true,
      use_ancodes_cache: false,
      resolve_ancodes: Morphy.RESOLVE_ANCODES_AS_TEXT,
    });

    const cityPhrases = name.split(' ');
    const res = morphy.lemmatize(cityPhrases);
    const compCity = cityPhrases.map((e) => {
      const val = res[upperCase(e)];
      return val[val.length - 1];
    });
    const isError = compCity.some(e => !e);
    let newCity;
    if (isError) newCity = name;
    else newCity = compCity.join(' ');
    const { text }  = await translate(newCity, { to: 'en' });
    return text;
  }

  async doAction(message) {
    const { text } = message;
    const [, action, cityRaw] = rx.exec(text);
    const bot = this.bot;
    const section = this.getSection(action);
    const chatId = message.chat.id || message.from.id;
    const options = { reply_to_message_id: message.message_id };
    bot.sendMessage(chatId, 'Уже бегу искать, оставайтесь на линии!', options);
    const city = await this.prepareCityName(cityRaw);
    const { photos, caption } = await this.findVenues('20191029', city, section);
    let media = [];
    if (photos && Array.isArray(photos)) {
      media = photos.map((photo, index) => ({
        type: 'photo',
        media: photo,
        ...(index === 0 ? {
          caption,
          parse_mode: 'html',
        } : {}),
        width: 500,
        height: 500,
      }));
    }
    
    if (media.length) {
      bot.sendMediaGroup(chatId, media, options);
    } else {
      bot.sendMessage(chatId, caption, options);
    }
  }
}
