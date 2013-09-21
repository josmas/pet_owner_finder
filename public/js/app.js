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
}

$('#item0').attr("src", picnames()[0]);
$('#item1').attr("src", picnames()[1]);
$('#item2').attr("src", picnames()[2]);
$('#item3').attr("src", picnames()[3]);
$('#item4').attr("src", picnames()[4]);

$('.carousel').carousel({
    interval: 2000
});
