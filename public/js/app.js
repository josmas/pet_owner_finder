console.log('lalala');
//TODO do not polute the global workspace... eventually!

$('.carousel').carousel({
  interval: 0
});

$("#next").click(function() {
  $('.carousel').carousel('next');
  changeCompatMessage(1); //TODO choose the right message here depending on rating
});

var cMess1 ='You should consider getting another pet instead';
var cMess2 ='You’re two different species';
var cMess3 ='CAT FIGHT!!';
var cMess4 ='There’s only room for one pet in this relationship';
var cMess5 ='You two have a dog/puppy dynamic and that’s weird';
var cMess6 ='You love your pets a very similar amount and that’s nice';
var cMess7 ='You guys should date and maybe your pets should too';
var cMess8 ='ME-OWWWWW OWWWW';
var cMess9 ='Your pets will look great in bow ties at your wedding';
var cMess10 ='Good thing neither one of you are spayed/neutered';


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

$('#yes').click(function(){ alert('we are sending you to the tumblr'); });
