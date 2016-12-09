/*-- Playlists --*/
var selectionPlaylist1 = ["Between the Sheets.mp3", "Big Poppa.mp3", "Regulate.mp3", "What's Going On.mp3"];
var selectionPlaylist2 = ["Blow.mp3", "Dubphonic.mp3", "Kalawanji.mp3", "Trianglez.mp3"];
var selectionPlaylist3 = ["Holiday.mp3", "Wake Me Up When September Ends.mp3", "Pieces (Acoustic).mp3", "The Hell Song.mp3"];
var selectionPlaylist4 = ["1977.mp3", "TheTail.mp3", "SouthCol.mp3", "TheDescent.mp3"];

var playlists = [selectionPlaylist1, selectionPlaylist2, selectionPlaylist3, selectionPlaylist4];
var playlistNames = ["Cosi's Playlist", "David's Playlist", "Jackie's Playlist", "Connor's Playlist"];

/*-- Metadata Dictionaries (TO BE REPLACED WITH JSON) --*/

/*
var metadataLookup = {
  "nanahatsuji.mp3": {"name": "Nana Hatsuji", "artist": "ScenarioArt", "album": "The Perfect Insider", "img": "talking.jpg"},
  "thankyoumusic.mp3": {"name": "Thank You Music!", "artist": "Mikoto-P", "album": "Hatsune Miku: Magical Mirai", "img": "MiraiAlbumArt.png"},
  "moonsong.mp3": {"name": "Moonsong", "artist": "Studio Pixel", "album": "Cave Story Soundtrack", "img": "CaveStoryArt.jpg"}
};
*/

var metadataLookup ={
  "Between the Sheets.mp3":	{"name": "Between the Sheets", "artist":"The Isley Brothers", "album":"Between the Sheets",	"img":"BetweenTheSheets.jpg"},
  "Big Poppa.mp3": {"name": "Big Poppa", "artist":"Notorious B.I.G",	"album":"Ready to Die",	"img":"BigPoppa.jpg"},
  "Regulate.mp3":	{"name": "Regulate", "artist":"Warren G",	"album":"Above the Rim", "img":"Regulate.jpg"},
  "What's Going On.mp3": {"name": "What's Going On", "artist":"Marven Gaye",	"album":"What's Going On", "img":"WhatsGoingOn.jpg"},

  "Blow.mp3":	{"name": "Blow", "artist": "Bass Nectar", "album":"Into the Sun", "img":"blow.jpg"},
  "Dubphonic.mp3": {"name": "Dubphonic", "artist": "Slaughter Mob",	"album":"Dubphomnic Single", "img":"dubphonic.jpg"},
  "Kalawanji.mp3": {"name": "Kalawanji", "artist": "Cessman Kromestar",	"album":"Kalawanji", "img":"Kalawanji.jpg"},
  "Trianglez.mp3": {"name": "Trianglez", "artist": "KromeStar & Dark Tantrums",	"album":"Trianglez Single", "img":"Trianglez.jpg"},

  "Holiday.mp3": {"name": "Holiday", "artist":"Green Day", "album":"American Idiot", "img":"Holiday.jpg"},
  "Wake Me Up When September Ends.mp3": {"name": "Wake Me Up When September Ends", "artist": "Green Day", "album":"American Idiot", "img":"WMUpWSeptEnds.jpg"},
  "Pieces (Acoustic).mp3": {"name": "Pieces (Acoustic)", "artist":"Sum 41"	, "album":"Chuck","img":"Pieces.jpg"},
  "The Hell Song.mp3": {"name": "The Hell Song", "artist":"Sum 41", "album":"Does This Look Infected?", "img":"TheHellSong.jpg"},

  "1977.mp3": {"name": "1977", "artist":"Adam Young",	"album":"Voyager 1", "img":"1977.jpg"},
  "TheTail.mp3": {"name": "The Tail", "artist":"Adam Young", "album":"	Miracle in the Andes", "img":"TheTail.jpg"},
  "SouthCol.mp3": {"name": "South Col", "artist":"Adam Young", "album":"The Ascent of Everest", "img":"SouthCol.jpg"},
  "TheDescent.mp3": {"name":"The Descent", "artist":"Adam Young", "album":"Project Excelsior", "img":"TheDescent.jpg"}
};

/*-- Globals --*/
var playlist = playlists[0];
var playlistIndex = 0;

var index = 0;
var indexBuffer1 = 1;
var indexBuffer2 = 2;


/*======================================*/
/*=========== Player Methods ===========*/
/*======================================*/


/*-- Update Player Function: Updates player everytime a song is ready to be played --*/
function updatePlayer(){

  var c = document.getElementById('trackList').children;
  var i;

  // Check to see if buffers are in bounds.
  if(indexBuffer1 >= playlist.length ){
    indexBuffer1 = indexBuffer1 - playlist.length;
  }
  else if(indexBuffer1 < 0 ){
    indexBuffer1 = playlist.length + indexBuffer1;
  }
  if(indexBuffer2 >= playlist.length ){
    indexBuffer2 = indexBuffer2 - playlist.length;
  }
  else if(indexBuffer2 < 0 ){
    indexBuffer2 = playlist.length + indexBuffer2;
  }

  //Update Player title, artist, album, images
  document.getElementById('songName').innerHTML = metadataLookup[playlist[index]]["name"];
  document.getElementById('artistName').innerHTML = metadataLookup[playlist[index]]["artist"];
  document.getElementById('album').innerHTML = metadataLookup[playlist[index]]["album"];
  document.getElementById('coverArt').src = "img/albumArt/" + metadataLookup[playlist[index]]["img"];
  document.getElementById('sideArt1').src = "img/albumArt/" + metadataLookup[playlist[indexBuffer1]]["img"];
  document.getElementById('sideArt2').src = "img/albumArt/" + metadataLookup[playlist[indexBuffer2]]["img"];

  for(i = 0; i < c.length; i++){
    if(i < playlist.length){
      c[i].children[0].style.display = "inline";
      c[i].children[0].innerHTML = metadataLookup[playlist[i]]["name"];
    }
    else{
      c[i].children[0].style.display = "none";
    }
  }
}

/*-- Update Song Function: Pauses current song and loads x song --*/
function updateSong(x){
  document.getElementById('aSong').pause();
  document.getElementById('aSong').removeAttribute("src");
  document.getElementById('aSong').src = "music/" + playlist[x];
  document.getElementById('aSong').load();
}

/*-- Play Function: Plays loaded track --*/
function playSong(){
  document.getElementById('aSong').play();
  document.getElementById('trackList').children[index].children[0].className = "uptrack uptrack-active";
}

/*-- Pause Function: Pauses loaded track --*/
function pauseSong(){
  document.getElementById('aSong').pause();

}

/*-- Stop Function: Resets Track --*/
function stopSong(){
  document.getElementById('trackList').children[index].children[0].className = "uptrack uptrack-inactive";
  document.getElementById('aSong').load();
  document.getElementById('aSong').pause();
}

/*-- Next Function: Plays the next track on the playlist --*/
function nextSong(){

  document.getElementById('trackList').children[index].children[0].className = "uptrack uptrack-inactive";

  //Increments index and buffers
  index++;
  indexBuffer1++;
  indexBuffer2++;

  //Checks if index is within playlist bounds
  if(index >= playlist.length ){
    index = 0;
  }

  updateSong(index);
  playSong();
}

function next2Song(){
  document.getElementById('trackList').children[index].children[0].className = "uptrack uptrack-inactive";

  //Increments index and buffers
  index+=2;
  indexBuffer1+=2;
  indexBuffer2+=2;

  //Checks if index is within playlist bounds
  if(index >= playlist.length ){
    index = index - playlist.length;
  }

  updateSong(index);
  playSong();
}

/*-- Prev Function: Plays the previous track on the playlist --*/
function prevSong(){
  document.getElementById('trackList').children[index].children[0].className = "uptrack uptrack-inactive";

  //Decrements index and buffers
  index--;
  indexBuffer1--;
  indexBuffer2--;

  //Checks if index is within playlist bounds
  if(index < 0 ){
    index = playlist.length - 1;
  }

  updateSong(index);
  playSong();
}


/*-- Select Song Function: Plays the selected track on the playlist --*/
function selectSong(x){
  document.getElementById('trackList').children[index].children[0].className = "uptrack uptrack-inactive";

  //Updates index and buffers
  index = x;
  indexBuffer1 = x + 1;
  indexBuffer2 = x + 2;

  updateSong(index);
  playSong();
}

/*-- Select Playlist Function: Loads the selected playlist and plays the first song on the playlist --*/
function selectPlaylist(x){
  document.getElementById('trackList').children[index].children[0].className = "uptrack uptrack-inactive";

  //Sets new index and buffers
  index = 0;
  indexBuffer1 = 1;
  indexBuffer2 = 2;

  //Quick Patch: Its better to store playlists in an array.
  //Chooses playlist based on which x was pressed
  document.getElementById('playlists').children[playlistIndex].children[0].className = "uptrack uptrack-inactive";
  playlist = playlists[x];
  playlistIndex = x;
  document.getElementById('playlistName').innerHTML = playlistNames[x];
  document.getElementById('playlists').children[playlistIndex].children[0].className = "uptrack uptrack-active";


  updateSong(index);
  playSong();
}

function backEndCall(){
  var requestURL = "http://cors-proxy.htmldriven.com/?url=http://api.turnupmusic.me/ai/flow/ID";
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var superHeroes = request.response;
    console.log(superHeroes);
  }
}
