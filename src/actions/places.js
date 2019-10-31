import qs from 'query-string';
import Morphy from 'phpmorphy';
import translate from '@k3rn31p4nic/google-translate-api';
import get from 'lodash/get';
import sample from 'lodash/sample';
import lowerCase from 'lodash/lowerCase';
import upperCase from 'lodash/upperCase';
import Action from './Action';

const { FSQR_CLIENT_ID, FSQR_CLIENT_SECRET } = process.env;
const HOST = 'https://api.foursquare.com/v2';
const ERR_MSG = 'Извини, я забыл как искать. Возможно когда-нибудь вспомню.';

const userCitiesEnum = {
  'Лимасе': 'Лимассол',
  'Лимас': 'Лимассол',
  'Нижний': 'Нижний Новгород',
  'Нижнем': 'Нижний Новгород',
  'спб': 'Санкт-Петербург',
  'мск': 'Москва',
  'тлт': 'Тольятти',
};

const restrictedCities = [
  'Солт Лейк Сити',
];

const phrases = [
  'сходить в',
  'пойти в',
  'нажраться в',
  'найти в',
  'собраться в',
  'поесть в',
  'еда в',
];

const section = sample(['food', 'drinks', 'coffee']);
const rx = new RegExp(`(${phrases.join('|')}) ([A-Za-zА-Яа-я0-9- ]+)`, 'i');

export default class PlacesAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, rx);
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

  async findVenues(v, near) {
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
    const [, , cityRaw] = rx.exec(text);
    const bot = this.bot;
    const chatId = message.chat.id || message.from.id;
    const options = { reply_to_message_id: message.message_id };
    bot.sendMessage(chatId, 'Уже бегу искать, оставайтесь на линии!', options);
    const city = await this.prepareCityName(cityRaw);
    const { photos, caption } = await this.findVenues('20191029', city);
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
