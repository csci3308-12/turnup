
var playlist = ["bensound-anewbeginning.mp3", "bensound-goinghigher.mp3", "bensound-happyrock.mp3"];
var index = 0;

/*-- Need Comments--*/
/*--Songs from bensounds.com--*/

function playSong(){
  document.getElementById('aSong').play();
}

function pauseSong(){
  document.getElementById('aSong').pause();
}

function stopSong(){
  document.getElementById('aSong').load();
  document.getElementById('aSong').pause();
}

function nextSong(){
  document.getElementById('aSong').pause();
  document.getElementById('aSong').removeAttribute("src");
  document.getElementById('aSong').load();

  index++;

  if(index >= playlist.length ){ index = 0; }

  document.getElementById('aSong').src = "music/" + playlist[index];
  document.getElementById('aSong').load();
  playSong();
}

function prevSong(){
  document.getElementById('aSong').pause();
  document.getElementById('aSong').removeAttribute("src");
  document.getElementById('aSong').load();

  index--;

  if(index < 0 ){ index = playlist.length - 1; }

  document.getElementById('aSong').src = "music/" + playlist[index];
  document.getElementById('aSong').load();
  playSong();
}
