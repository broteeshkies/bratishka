import languages, { isSupported, getISOCode } from './languages';
import { generate } from './tokenGenerator';
import qs from 'querystring';

/**
 * @function translate
 * @param {String} text The text to be translated.
 * @param {Object} options The options object for the translator.
 * @returns {Object} The result containing the translation.
 */
const translate = async(text, options) => {
  try {
    if (typeof options !== 'object') options = {};
    text = String(text);

    // Check if a lanugage is in supported; if not, throw an error object.
    let error;
    [ options.from, options.to ].forEach((lang) => {
      if (lang && !isSupported(lang)) {
        error = new Error();
        error.code = 400;
        error.message = `The language '${lang}' is not supported.`;
      }
    });
    if (error) throw error;

    // If options object doesn't have 'from' language, set it to 'auto'.
    if (!options.hasOwnProperty('from')) options.from = 'auto';
    // If options object doesn't have 'to' language, set it to 'en'.
    if (!options.hasOwnProperty('to')) options.to = 'en';
    // If options object has a 'raw' property evaluating to true, set it to true.
    options.raw = Boolean(options.raw);

    // Get ISO 639-1 codes for the languages.
    options.from = getISOCode(options.from);
    options.to = getISOCode(options.to);

    // Generate Google Translate token for the text to be translated.
    let token = await generate(text);

    // URL & query string required by Google Translate.
    let baseUrl = 'https://translate.google.com/translate_a/single';
    let data = {
      client: 'gtx',
      sl: options.from,
      tl: options.to,
      hl: options.to,
      dt: [ 'at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't' ],
      ie: 'UTF-8',
      oe: 'UTF-8',
      otf: 1,
      ssel: 0,
      tsel: 0,
      kc: 7,
      q: text,
      [token.name]: token.value
    };

    // Append query string to the request URL.
    let url = `${baseUrl}?${qs.stringify(data)}`;

    let requestOptions;
    // If request URL is greater than 2048 characters, use POST method.
    if (url.length > 2048) {
      delete data.q;
      requestOptions = [
        `${baseUrl}?${qs.stringify(data)}`,
        {
          method: 'POST',
          form: true,
          body: {
            q: text
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ];
    }
    else {
      requestOptions = [ url ];
    }

    // Request translation from Google Translate.
    let response = await fetch(...requestOptions).then(e => e.json());

    let result = {
      text: '',
      from: {
        language: {
          didYouMean: false,
          iso: ''
        },
        text: {
          autoCorrected: false,
          value: '',
          didYouMean: false
        }
      },
      raw: ''
    };
    // If user requested a raw output, add the raw response to the result
    if (options.raw) {
      result.raw = JSON.stringify(response);
    }

    // Parse string body to JSON and add it to result object.
    let body = response;
    body[0].forEach((obj) => {
      if (obj[0]) {
        result.text += obj[0];
      }
    });

    if (body[2] === body[8][0][0]) {
      result.from.language.iso = body[2];
    }
    else {
      result.from.language.didYouMean = true;
      result.from.language.iso = body[8][0][0];
    }

    if (body[7] && body[7][0]) {
      let str = body[7][0];

      str = str.replace(/<b><i>/g, '[');
      str = str.replace(/<\/i><\/b>/g, ']');

      result.from.text.value = str;

      if (body[7][5] === true) {
        result.from.text.autoCorrected = true;
      }
      else {
        result.from.text.didYouMean = true;
      }
    }

    return result;
  }
  catch (e) {
    if (e.name === 'HTTPError') {
      let error = new Error();
      error.name = e.name;
      error.statusCode = e.statusCode;
      error.statusMessage = e.statusMessage;
      throw error;
    }
    throw e;
  }
};

export { languages };
export default translate;
