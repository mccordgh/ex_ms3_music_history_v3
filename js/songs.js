// console.log("First line in JS file");
// console.log(Date.now()); //time stamp when page loads

// function executeThisIfXHRFails(xhrEvent) {
//   console.log("An error occured while transferring the data");
// }

// function executeThisCodeAfterFileIsLoaded() {
//   console.log("this", this );
//   console.log("execute this code after file is loaded");
//   console.log( Date.now() );

//   // parse the response text as JSON. Turns string of characters into a JS object
//   // (observe that JSON keys are strings, which is not how a JS object is formatted)
//   var data = JSON.parse(this.responseText); // 'this' is the XMLHttpRequest
//   console.log("data", data );

//   var songList = document.getElementById("all-my-songs");

//   for( currentSong in data.songs ) {
//     var songData = '';
//     var song = data.songs[currentSong]
//     songData += "<div class='song-block'>";
//     songData += `<h1>${song.title}</h1>`;
//     songData += "<div class='artist'>Performed by ";
//     songData += song.artist;
//     songData += "</div>";
//     songData += "<div class='album'>On the album ";
//     songData += song.album;
//     songData += "</div>";
//     songData += "</div>";

//     songList.innerHTML += songData;
//   }
// }

// var myRequest = new XMLHttpRequest();

// // The event listener listens for the load event, THEN runs.
// // This is asynchronous and acts as a callback.
// // The functions are not called until after the event happens.
// myRequest.addEventListener("load", executeThisCodeAfterFileIsLoaded);
// myRequest.addEventListener("error", executeThisIfXHRFails);

// // open tells it what to do with one of the HTTP verbs (GET, POST, PUT, DELETE)
// myRequest.open("GET", "data/songs.json");
// // starts the process. It means go
// myRequest.send();

// console.log("Last line in JS file");
// console.log(Date.now()); //time stamp when page ends


var listAnchor = document.getElementById("list_music_anchor");
var addAnchor = document.getElementById("add_music_anchor");
var contentNav = document.getElementById("content_nav");
var contentOptions = document.getElementById("content_options");
var contentPlaylist = document.getElementById("content_playlist");
var addMusicView = document.getElementById("add_music_view");
var txtSong = document.getElementById("txtSong");
var txtArtist = document.getElementById("txtArtist");
var txtAlbum = document.getElementById("txtAlbum");
var txtGenre = document.getElementById("txtGenre");
var btnAdd = document.getElementById("btnAdd");
var playList = document.getElementById("content_playlist");

addAnchor.classList.add("currentLink", "nav_link");
listAnchor.classList.add("activeLink", "nav_link");
addAnchor.setAttribute("href", "#");
listAnchor.setAttribute("href", "#");

addAnchor.addEventListener("click", handleNavClick);
listAnchor.addEventListener("click", handleNavClick);
btnAdd.addEventListener("click", addButtonClick);
addMusicView.addEventListener("keydown", handleKeyDown);

var songs = [];
var songData = {};

var person = {
    firstName:"John",
    lastName:"Doe",
    age:50,
    eyeColor:"blue"
};

songData = { artist: "The Church", album: "Starfish", song: "Under the Milky Way", genre: "Acoustic"};
songs.push(songData);
songData = { artist: "ZZ Top", album: "Eliminator", song: "Legs", genre: "Rock"};
songs.push(songData);
songData = { artist: "Supertramp", album: "Breakfast in America", song: "The Logical Song", genre: "Rock" };
songs.push(songData);
songData = { artist: "Pink Floyd", album: "The Wall", song: "Another Brick in the Wall", genre: "Rock" };
songs.push(songData);
songData = { artist: "Guns & Roses", album: "Appetite for Destruction", song: "Welcome to the Jungle", genre: "Rock" };
songs.push(songData);
songData = { artist: "Alanis Morisette", album: "Jagged Little Pill", song: "Ironic", genre: "Rock" };
songs.push(songData);
songData = { artist: "DEVO", album: "Freedom of Choice", song: "Gate of Steel", genre: "Rock"};
songs.push(songData);


for ( i = 0; i < songs.length; i++) {
		
	addSongToPlaylist(songs[i]);
	
}

// FUNCTIONS 

function formatStr (editString) {

	editString = editString.replace(/>/gi, "-");
	editString = editString.replace(/\*/gi, "");
	editString = editString.replace(/@/gi, "");
	editString = editString.replace(/!/gi, "");
	
	return editString;
}

function handleNavClick () {

	var linkGroup = document.getElementsByClassName("nav_link");

	for (i=0;i < linkGroup.length;i++) {
		
		if (linkGroup[i] == event.target) {
			//setting event target to current
			linkGroup[i].classList.remove("activeLink");
			linkGroup[i].classList.add("currentLink");
		} else {
			//setting non-event targets to active
			linkGroup[i].classList.add("activeLink");
			linkGroup[i].classList.remove("currentLink");

		}
	}

	if (event.target.innerHTML === "Add Music"){
		
		contentOptions.classList.add("hidden");
		contentPlaylist.classList.add("hidden");
		addMusicView.classList.remove("hidden");

	} else if (event.target.innerHTML === "List Music") {
		
		contentOptions.classList.remove("hidden");
		contentPlaylist.classList.remove("hidden");
		addMusicView.classList.add("hidden");

	} else {
	
		console.log("something went wrong -> event target innerHTML =" + event.target.innerHTML);
	
	}

}

function addSongToPlaylist (songObj) {

	var song = songObj.song;

	var artist = songObj.artist;
	var album = songObj.album;
	var genre = songObj.genre;

	var artistChoice = document.getElementById("artistChoice");
	var optn = document.createElement("OPTION");
	optn.text = artist;
	optn.value = artist;
	artistChoice.options.add(optn);

	var albumChoice = document.getElementById("albumChoice");
	var optn = document.createElement("OPTION");
	optn.text = album;
	optn.value = album;
	albumChoice.options.add(optn);

	song = "<h1>" + song + "</h1>";
	newUL = "<ul id='song_options'>";
	artist = "<li>" + artist + "</li>";
	pipeLI = "<li><b>|</b></li>"
	album = "<li>" + album + "</li>";
	genre = "<li>Genre: " + genre + "</li>";

	playList.innerHTML += "<p>" + song + newUL + artist + pipeLI + album + pipeLI + genre + "</ul></p>";

}

function handleKeyDown (e) {
	if (e.keyCode == 13) {
		e.preventDefault();
		addButtonClick(e);
	}
}

function addButtonClick(e) {
	var songObj = { song: txtSong.value, artist: txtArtist.value, album: txtAlbum.value, genre: txtGenre.value };

	if (songObj.song === "") {
		alert("Please enter a song name!");
	} else if (songObj.artist === "") {
		alert("Please enter an artist name!");
	} else if (songObj.album === "") {
		alert("Please enter an album name!");
	} else {

		addSongToPlaylist(songObj);
		contentOptions.classList.remove("hidden");
		contentPlaylist.classList.remove("hidden");
		addMusicView.classList.add("hidden");
		alert("Song added! " + songObj.artist + " :: " + songObj.album + " :: " + songObj.song);
	}
	
}