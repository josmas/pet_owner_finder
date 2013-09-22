console.log('lalala');
//TODO do not polute the global workspace... eventually!

function picnames(){
  var pics = [
    "http://24.media.tumblr.com/682996b5152ede515195f86383f8a45c/tumblr_mthme5lImD1rvuefeo1_500.jpg",
    "http://31.media.tumblr.com/e543774937d26fdb2ffe51598b38614b/tumblr_mthmikLD101rvuefeo1_500.jpg",
    "http://31.media.tumblr.com/19500610594070f5c9aa99f227740f09/tumblr_mtg15cakQF1rvuefeo1_500.jpg",
    "http://31.media.tumblr.com/0452d659390c63e79f7cb505e81c4478/tumblr_mt8j6imlDo1rvuefeo1_500.jpg",
    "http://24.media.tumblr.com/51a2157e649c4d7a83f4d1a4d6e86062/tumblr_mst2992s291rvuefeo1_500.jpg"
    ];
  return pics;
};

$('#item0').attr("src", picnames()[0]);
$('#item1').attr("src", picnames()[1]);
$('#item2').attr("src", picnames()[2]);
$('#item3').attr("src", picnames()[3]);
$('#item4').attr("src", picnames()[4]);

$('.carousel').carousel({
  interval: 0
});

$("#next").click(function() {
  $('.carousel').carousel('next');
  changeCompatMessage(1); //TODO choose the right message here depending on rating
});

var cMess1 ='You should consider getting another pet instead';
var cMess2 ='You’re two difference species';
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
