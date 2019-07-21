import Action from './Action';
import get from 'lodash/get';
import sample from 'lodash/sample';
const nataChatId = 80081115;
// const immuzovChatId = -1001130687597;
const mgbetaChatId = -1001042071273;
// const mgbetaChatId = nataChatId;

const deanonRatioStep = {};
const deanonLivesLimit = 0;
const deanonUsersLives = {};

const deanonNoticeMessages = [
  'осторожнее, молодой человек, там можно и на деанон нарваться ;)',
  'АСТАНАВИСЬ пока не поздно',
  'горшочек не вари',
  'вангую тобi пiзда сдеаноню нахоуй!11',
  '🙄 Посмотрите на этого бессмертно уёбка, давайте его сдеаноним?',
];

const deanonMessages = [
  `🙄 такую хуету мог написать только %username%`,
  `вот ты и спалился, %username%`,
  `этим хорьком был А̶л̶ь̶б̶е̶р̶т̶ ̶Э̶й̶н̶ш̶т̶е̶й̶н̶ %username%`,
  `!!!ВНЕЗАПНЫЙ ДЕАНОН!!!\nХорек — %username%`,
  `ну вы и так поняли, что это %username%`,
  `по всем вопросам к @̶n̶a̶t̶a̶v̶t̶s̶ %username%`,
];

const curseWords = '6ля,6лядь,6лять,b3ъeб,cock,cunt,e6aль,ebal,eblan,eбaл,eбaть,eбyч,eбать,eбёт,eблантий,fuck,fucker,fucking,xyёв,xyй,xyя,xуе,xуй,xую,zaeb,zaebal,zaebali,zaebat,архипиздрит,ахуел,ахуеть,бздение,бздеть,бздех,бздецы,бздит,бздицы,бздло,бзднуть,бздун,бздунья,бздюха,бздюшка,бздюшко,бля,блябу,блябуду,бляд,бляди,блядина,блядище,блядки,блядовать,блядство,блядун,блядуны,блядунья,блядь,блядюга,блять,вафел,вафлёр,взъебка,взьебка,взьебывать,въеб,въебался,въебенн,въебусь,въебывать,выблядок,выблядыш,выеб,выебать,выебен,выебнулся,выебон,выебываться,выпердеть,высраться,выссаться,вьебен,гавно,гавнюк,гавнючка,гамно,гандон,гнид,гнида,гниды,говенка,говенный,говешка,говназия,говнецо,говнище,говно,говноед,говнолинк,говночист,говнюк,говнюха,говнядина,говняк,говняный,говнять,гондон,доебываться,долбоеб,долбоёб,долбоящер,дрисня,дрист,дристануть,дристать,дристун,дристуха,дрочелло,дрочена,дрочила,дрочилка,дрочистый,дрочить,дрочка,дрочун,е6ал,е6ут,еб твою мать,ёб твою мать,ёбaн,ебaть,ебyч,ебал,ебало,ебальник,ебан,ебанамать,ебанат,ебаная,ёбаная,ебанический,ебанный,ебанныйврот,ебаное,ебануть,ебануться,ёбаную,ебаный,ебанько,ебарь,ебат,ёбат,ебатория,ебать,ебать-копать,ебаться,ебашить,ебёна,ебет,ебёт,ебец,ебик,ебин,ебись,ебическая,ебки,ебла,еблан,ебливый,еблище,ебло,еблыст,ебля,ёбн,ебнуть,ебнуться,ебня,ебошить,ебская,ебский,ебтвоюмать,ебун,ебут,ебуч,ебуче,ебучее,ебучий,ебучим,ебущ,ебырь,елда,елдак,елдачить,жопа,жопу,заговнять,задрачивать,задристать,задрота,зае6,заё6,заеб,заёб,заеба,заебал,заебанец,заебастая,заебастый,заебать,заебаться,заебашить,заебистое,заёбистое,заебистые,заёбистые,заебистый,заёбистый,заебись,заебошить,заебываться,залуп,залупа,залупаться,залупить,залупиться,замудохаться,запиздячить,засерать,засерун,засеря,засирать,засрун,захуячить,заябестая,злоеб,злоебучая,злоебучее,злоебучий,ибанамат,ибонех,изговнять,изговняться,изъебнуться,ипать,ипаться,ипаццо,Какдвапальцаобоссать,конча,курва,курвятник,лох,лошарa,лошара,лошары,лошок,лярва,малафья,манда,мандавошек,мандавошка,мандавошки,мандей,мандень,мандеть,мандища,мандой,манду,мандюк,минет,минетчик,минетчица,млять,мокрощелка,мокрощёлка,мразь,мудak,мудaк,мудаг,мудак,муде,мудель,мудеть,муди,мудил,мудила,мудистый,мудня,мудоеб,мудозвон,мудоклюй,на хер,на хуй,набздел,набздеть,наговнять,надристать,надрочить,наебать,наебет,наебнуть,наебнуться,наебывать,напиздел,напиздели,напиздело,напиздили,насрать,настопиздить,нахер,нахрен,нахуй,нахуйник,не ебет,не ебёт,невротебучий,невъебенно,нехира,нехрен,Нехуй,нехуйственно,ниибацо,ниипацца,ниипаццо,ниипет,никуя,нихера,нихуя,обдристаться,обосранец,обосрать,обосцать,обосцаться,обсирать,объебос,обьебать обьебос,однохуйственно,опездал,опизде,опизденивающе,остоебенить,остопиздеть,отмудохать,отпиздить,отпиздячить,отпороть,отъебись,охуевательский,охуевать,охуевающий,охуел,охуенно,охуеньчик,охуеть,охуительно,охуительный,охуяньчик,охуячивать,охуячить,очкун,падла,падонки,падонок,паскуда,педерас,педик,педрик,педрила,педрилло,педрило,педрилы,пездень,пездит,пездишь,пездо,пездят,пердануть,пердеж,пердение,пердеть,пердильник,перднуть,пёрднуть,пердун,пердунец,пердунина,пердунья,пердуха,пердь,переёбок,пернуть,пёрнуть,пи3д,пи3де,пи3ду,пиzдец,пидар,пидарaс,пидарас,пидарасы,пидары,пидор,пидорасы,пидорка,пидорок,пидоры,пидрас,пизда,пиздануть,пиздануться,пиздарваньчик,пиздато,пиздатое,пиздатый,пизденка,пизденыш,пиздёныш,пиздеть,пиздец,пиздит,пиздить,пиздиться,пиздишь,пиздища,пиздище,пиздобол,пиздоболы,пиздобратия,пиздоватая,пиздоватый,пиздолиз,пиздонутые,пиздорванец,пиздорванка,пиздострадатель,пизду,пиздуй,пиздун,пиздунья,пизды,пиздюга,пиздюк,пиздюлина,пиздюля,пиздят,пиздячить,писбшки,писька,писькострадатель,писюн,писюшка,по хуй,по хую,подговнять,подонки,подонок,подъебнуть,подъебнуться,поебать,поебень,поёбываает,поскуда,посрать,потаскуха,потаскушка,похер,похерил,похерила,похерили,похеру,похрен,похрену,похуй,похуист,похуистка,похую,придурок,приебаться,припиздень,припизднутый,припиздюлина,пробзделся,проблядь,проеб,проебанка,проебать,промандеть,промудеть,пропизделся,пропиздеть,пропиздячить,раздолбай,разхуячить,разъеб,разъеба,разъебай,разъебать,распиздай,распиздеться,распиздяй,распиздяйство,распроеть,сволота,сволочь,сговнять,секель,серун,серька,сестроеб,сикель,сила,сирать,сирывать,соси,спиздел,спиздеть,спиздил,спиздила,спиздили,спиздит,спиздить,срака,сраку,сраный,сранье,срать,срун,ссака,ссышь,стерва,страхопиздище,сука,суки,суходрочка,сучара,сучий,сучка,сучко,сучонок,сучье,сцание,сцать,сцука,сцуки,сцуконах,сцуль,сцыха,сцышь,съебаться,сыкун,трахае6,трахаеб,трахаёб,трахатель,ублюдок,уебать,уёбища,уебище,уёбище,уебищное,уёбищное,уебк,уебки,уёбки,уебок,уёбок,урюк,усраться,ушлепок,х_у_я_р_а,хyё,хyй,хyйня,хамло,хер,херня,херовато,херовина,херовый,хитровыебанный,хитрожопый,хуeм,хуе,хуё,хуевато,хуёвенький,хуевина,хуево,хуевый,хуёвый,хуек,хуёк,хуел,хуем,хуенч,хуеныш,хуенький,хуеплет,хуеплёт,хуепромышленник,хуерик,хуерыло,хуесос,хуесоска,хуета,хуетень,хуею,хуи,хуй,хуйком,хуйло,хуйня,хуйрик,хуище,хуля,хую,хуюл,хуя,хуяк,хуякать,хуякнуть,хуяра,хуясе,хуячить,целка,чмо,чмошник,чмырь,шалава,шалавой,шараёбиться,шлюха,шлюхой,шлюшка,ябывает'
  .split(',');

const deanonRatioSteps = [
  5,
  6,
  7,
  8,
  9,
  10
];

export default class MgbetaAction extends Action {
  test(message) {
    return message.chat.id > 0;
    if (message.chat.id > 0) return true;
    return false;
    // return this.testMessageRegExp(message, /^mgbeta/);
  }

  doAction(message) {
    const { first_name, last_name, username } = message.from;

    const data = {
      first_name,
      last_name,
      username,
      chatId: mgbetaChatId,
      log: 'log.HZHZHZHZHZ',
      opt: {},
    };
    if (message.sticker) {
      data.method = 'sendSticker';
      data.path = message.sticker.file_id;
      data.log = 'sticker';
    }
    if (message.photo) {
      data.method = 'sendPhoto';
      data.text = message.caption || '';
      data.path = message.photo[0].file_id;
      data.log = 'photo';
      data.opt = {
        caption: message.caption,
      };
    }
    if (message.voice) {
      data.method = 'sendVoice';
      data.path = message.voice.file_id;
      data.log = 'voice';
    }
    if (message.video_note) {
      data.method = 'sendVideoNote';
      data.path = message.video_note.file_id;
      data.log = 'videoNote';
    }
    if (message.video) {
      data.method = 'sendVideo';
      data.path = message.video.file_id;
      data.log = 'video';
    }
    if (message.location) {
      data.method = 'sendLocation';
      data.path = message.location.latitude;
      data.log = 'location';
      data.opt = message.location.longitude;
    }
    if (message.document) {
      data.method = 'sendDocument';
      data.path = message.document.file_id;
      data.log = 'document';
      data.opt = {
        caption: message.caption,
      };
    }
    if (message.text) {
      data.method = 'sendMessage';
      data.path = message.text;
      data.log = 'text';
    }

    const { method, chatId, path, text = 'empty message', log, opt } = data;

    // console.log(`@${data.username}: [log.${log}] ${text}`, path || message);
    if (data.method) {
      const sended = this.bot[method](chatId, path, opt);

      if (!deanonRatioStep[username]) {
        deanonRatioStep[username] = 0;
      }

      if (deanonUsersLives[username] == null) {
        deanonUsersLives[username] = Math.floor(Math.random() * (deanonLivesLimit + 1));
      }

      deanonRatioStep[username] = deanonRatioStep[username] < deanonRatioSteps.length - 1 ? deanonRatioStep[username] + 1 : deanonRatioStep[username];

      const textLowerCase = (message.text || '').toLowerCase();
      const textHasCurseWords = message.text
        ? curseWords.some(word => textLowerCase.indexOf(word) !== -1)
        : false;
      // if (['natavts', 'anoru', 'immuzov'].includes(username)) return; // NOTE: Ха-ха, смешно :)

      // console.log(`${username} (${deanonRatioSteps[deanonRatioStep[username]]}%, lives: ${deanonUsersLives[username]}):\t${this.percentProbability(deanonRatioSteps[deanonRatioStep[username]]) ? '-1 lives (or deanon)' : 'keep calm'}` );

      if (textHasCurseWords || this.percentProbability(deanonRatioSteps[deanonRatioStep[username]])) {
        if (!textHasCurseWords && deanonUsersLives[username] > 0) {
          deanonUsersLives[username] = deanonUsersLives[username] - 1;
          sended.then((msg) => {
            this.bot.sendMessage(chatId, sample(deanonNoticeMessages), {
              reply_to_message_id: msg.message_id,
            });
          });
          return;
        }

        sended.then(msg => {
          setTimeout(() => {
            this.bot.sendMessage(chatId, sample(deanonMessages).replace('%username%', `${username}`), {
              reply_to_message_id: msg.message_id,
            });
          }, 7200000);
        });
        deanonUsersLives[username] = null;
        deanonRatioStep[username] = 0;
      }
    }
  }
}
