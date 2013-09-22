console.log('lalala');
//TODO do not polute the global workspace... eventually!

$('.carousel').carousel({
  interval: 0
});

$("#next").click(function() {
  $('.active.item').fadeOut(9500);
  $("#vidtext").show();
  $("#vid").show();
  $("#vid").empty();
  $("#vid").html('<iframe id="if" width="420" height="315" src="//www.youtube.com/embed/bXdcxYX5XNw?rel=0&amp;autoplay=1" frameborder="0" allowfullscreen autoplay=1></iframe>');
  setTimeout(function(){  
    $("#vidtext").hide();
    $("#vid").hide();
    $("#vid").empty();
    $('.active.item').show();
    $('.carousel').carousel('next');
    changeCompatMessage($(".active.item").find(":first-child").attr('rating'));
  },7500);
});


var cMess10 ='You should consider getting another pet instead';
var cMess9 ='You’re two different species';
var cMess8 ='CAT FIGHT!!';
var cMess7 ='There’s only room for one pet in this relationship';
var cMess6 ='You two have a dog/puppy dynamic and that’s weird';
var cMess5 ='You love your pets a very similar amount and that’s nice';
var cMess4 ='You guys should date and maybe your pets should too';
var cMess3 ='ME-OWWWWW OWWWW';
var cMess2 ='Your pets will look great in bow ties at your wedding';
var cMess1 ='Good thing neither one of you are spayed/neutered';


var compatMessages = [];
compatMessages.push(cMess1);
compatMessages.push(cMess2);
compatMessages.push(cMess3);
compatMessages.push(cMess4);
compatMessages.push(cMess5);
compatMessages.push(cMess6);
compatMessages.push(cMess7);
compatMessages.push(cMess8);
compatMessages.push(cMess9);
compatMessages.push(cMess10);

function changeCompatMessage(messageNumber){
  $('#compatibility').text(compatMessages[messageNumber]);
}
//default message
$('#compatibility').text(compatMessages[4]);

$('#yes').click(function(){ 
  if (window.confirm("Are you sure about this match? Pets are a forever thing.")) { 
    window.location='http://' + $(".active.item").find(":first-child").attr('tumblr') + '.tumblr.com';
  }
});

