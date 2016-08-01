// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
// = require jquery
//= require jquery_ujs
//= require_tree .

//make input available if you're telling someone specific

//ajax call to pull up 3 fuck off statements

//display those

//be able to save/delete the ones you like to a sidebar thing
let option1 = ['this', 'that', 'everything', 'everyone', 'life', 'pink', 'thanks', 'bucket', 'family', 'zayn', 'single', 'looking'];
let option2 = ['off', 'donut', 'shakespeare', 'linus', 'king', 'field', 'yoda', 'nugget', 'shutup','keep'];
let option3 = 'madison';
let option4 = ['bday', 'xmas', 'mornin', 'bye', 'zero']
let builtUrl = ""

$(document).ready(function() {

  function checkFirstBox(){
    if ($('#select1').val() === 'option2' || $('#select1').val() === 'option3') {
      $('#them').fadeIn('fast')
      $('#from').fadeIn('fast')
      $('#submit').fadeIn('fast')
    } else {
      $('#them').fadeOut('fast')
      $('#from').fadeIn('fast')
      $('#submit').fadeIn('fast')
    }
  };

  function makeUrl(){
    $('#results').empty();
    if ($('#select1').val() === 'option1' ) {
      builtUrl = "http://www.foaas.com/" + option1[Math.floor(Math.random() * option1.length)] + '/' + $('#from').val()
    } else if ($('#select1').val() === 'option2' ) {
      builtUrl = "http://www.foaas.com/" + option2[Math.floor(Math.random() * option2.length)] + '/' + $('#them').val() + '/' + $('#from').val()
    } else if ($('#select1').val() === 'option3' ) {
      builtUrl = "http://www.foaas.com/" + option3 + '/' + $('#them').val() + '/' + $('#from').val()
    } else if ($('#select1').val() === 'option4' ) {
      builtUrl = "http://www.foaas.com/" + option4[Math.floor(Math.random() * option4.length)] + '/' + $('#from').val()
    }
    console.log(builtUrl)
    $.ajax({
      url: builtUrl,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(data) {
      let veggies = ['broccoli', 'tomato', 'onion', 'squash', 'potato', 'beet', 'asparagus', 'peas', 'kale', 'cabbage']
      let rand = Math.floor(Math.random() * veggies.length)
      let mess = data.message
      let sanitized = mess.replace(/fuck/gi, veggies[rand])
      $('#results').append('<p id="message">' + sanitized + '</p> <p id="subtitle">' + data.subtitle + '</p> <button id="save">Save this</button>');
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }


  function makeCards(){
    $('#saved').empty();
    $.ajax({
      url: '/quotes',
      type: 'GET',
      dataType: 'json'
    })
    .done(function(data) {
      data.forEach(quote=>{
        $('footer').append('<div class="card"><p>' + quote.message + quote.subtitle + '</p><button>delete</button></div>')
      });
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }

function addQuote(){
  let quoteData = {
    message: $('#message').text(),
    subtitle: $('#subtitle').text()
  }
  console.log(quoteData)
  $.post('/quotes', quoteData)
  .done(
    console.log("this worked!"))
  makeCards()
}

$('#select1').change(checkFirstBox);
$('#submit').click(makeUrl)
$('#results').on('click', '#save', addQuote)



});
