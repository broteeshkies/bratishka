import 'babel-polyfill';
import Promise from 'bluebird';
process.env["NTBA_FIX_319"] = 1;
if (!Promise.config) {
  Promise.config = () => {}; // херов багфикс для телеграма
}
