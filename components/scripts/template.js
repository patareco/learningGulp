$(function() {
  var Mustache = require('mustache');

  $.getJSON('js/data.json', function(data) {
    var template = $('#speakerstpl').html();
    var html = Mustache.to_html(template, data);
    $('#speakers').html(html);    
  }); //getJSON

  var unique = require('uniq');
  var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];
  //console.log(unique(data));

}); //function