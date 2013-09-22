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

var cMess1 ='You are going to be alone for the rest of your life';
var cMess2 ='buy another pet, you are gonna need it';
var cMess3 ='message 3 is for somehtine else';
var cMess4 ='message 4 is also for something else';
var cMess5 ='default message';

var compatMessages = [];
compatMessages.push(cMess1);
compatMessages.push(cMess2);
compatMessages.push(cMess3);
compatMessages.push(cMess4);
compatMessages.push(cMess5);

function changeCompatMessage(messageNumber){
  $('#compatibility').text(compatMessages[messageNumber]);
}
//default message
$('#compatibility').text(compatMessages[4]);

$('#yes').click(function(){ alert('we are sending you to the tumblr'); });
