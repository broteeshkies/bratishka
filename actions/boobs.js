module.exports = {
    test: function(message){
        var text = message.toLowerCase();
        var regV = /boobs/; // шаблон
        return text.match(regV); // поиск шаблона в юрл

    },
    response: function(){
        return "boobs fucker"
    }
}