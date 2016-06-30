function doAction(message) {

  var actions = [
    require("./actions/boobs"),
    require("./actions/antons"),
    require("./actions/natas"),
  ]

  for(var i = 0; i < actions.length; i++){
    if(action.test(message)){
      return action.action(message)
    }
  }
  return null;

}

/// boobs.js

module.exports = {
  test: function(message){
    var text = update.message.text.toLowerCase();
    var regV = /сис(ек|ьки|ечки|и|яндры)/; // шаблон
    return text.match(regV); // поиск шаблона в юрл

  },
  action: function(){
    return "boobs fucker"
  }
}

/// antons.js

module.exports = {
  test: function(message){
    var text = update.message.text.toLowerCase();
    var regV = /антонc?/; // шаблон
    return text.match(regV); // поиск шаблона в юрл

  },
  action: function(){
    return "antons fucker"
  }
}