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

var songs = [];
var songData = {};
var playlistNum = "";
var allLoaded = false;
var lastID = -1;

var loader = new XMLHttpRequest();
loader.open("GET", "data/songs.json");
loader.send();
loader.addEventListener("load", function(event) {
	var songArr = JSON.parse(loader.responseText);
	loadSongs(songArr.songs);
});

listAnchor.classList.add("currentLink", "nav_link");
addAnchor.classList.add("activeLink", "nav_link");
listAnchor.setAttribute("href", "#");
addAnchor.setAttribute("href", "#");

addAnchor.addEventListener("click", handleNavClick);
listAnchor.addEventListener("click", handleNavClick);
btnAdd.addEventListener("click", addButtonClick);
addMusicView.addEventListener("keydown", handleKeyDown);
playList.addEventListener("click", handlePlaylistClick);

function loadSongs(songs) {
	for ( i = 0; i < songs.length; i++) {
		lastID++;
		addSongToPlaylist(songs[i], lastID);
	}
	appendMoreButton();
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

function addSongToPlaylist (songObj, i) {

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
	var optn2 = document.createElement("OPTION");
	optn2.text = album;
	optn2.value = album;
	albumChoice.options.add(optn2);

	var ulDiv = document.createElement("DIV");
	ulDiv.id = "ulDiv" + i;
	ulDiv.classList.add("songDiv");

	songs.push ({song, artist, album, genre});

	song = "<h1>" + song + "</h1>";
	newUL = "<ul id='song_options'>";
	artist = "<li>" + artist + "</li>";
	pipeLI = "<li><b>|</b></li>";
	album = "<li>" + album + "</li>";
	genre = "<li>Genre: " + genre + "</li>";
	delButton = "<li><button type='button' id='" + i + "' class='btnDelete'>Delete</button></li>";
	ulDiv.innerHTML += "<p>" + song + newUL + artist + pipeLI + album + pipeLI + genre + delButton + "</ul></p><hr>";
	playList.appendChild(ulDiv);

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

		removeMoreButton();
		lastID++;
		addSongToPlaylist(songObj, lastID);
		txtSong.value = "";
		txtArtist.value = "";
		txtAlbum.value = "";
		txtGenre.value = "";
		appendMoreButton();

		alert("Song added! " + songObj.artist + " :: " + songObj.album + " :: " + songObj.song);
	}
	
}

function handlePlaylistClick() {
	var clicked = event.target;
	var clickedID = clicked.id;
	if (clicked.type === "button") {

		if (clicked.innerHTML === "Delete"){
			lastID--;
			console.log("lastID", lastID);
			var btnIndex = clickedID;
			console.log("btnIndex", btnIndex);
			var removeDiv = document.getElementById("ulDiv" + btnIndex);
			console.log("removeDiv", removeDiv);
			playList.removeChild(removeDiv);
			songs.splice(btnIndex, 1);
			artistChoice.remove(clickedID);
			albumChoice.remove(clickedID);
			updateIDs();

		} else if (clickedID === "btnMore") {
			
			if (allLoaded === true) {
				alert("All songs have been loaded!!");
			} else {
				var loader = new XMLHttpRequest();
				loader.open("GET", "data/songs2.json");
				loader.send();
				loader.addEventListener("load", function(event) {
					var songArr = JSON.parse(loader.responseText);
					loadSongs(songArr.songs);
					});
				removeMoreButton();
				allLoaded = true;
			}
		}
	}
}

function updateIDs() {
	var songDivs = document.getElementsByClassName("songDiv");
	var delButtons = document.getElementsByClassName("btnDelete");
	console.log("delButtons", delButtons);
	console.log("songDivs", songDivs);
	console.log("songs", songs);
	songs.forEach( function(item, index) {
		console.log("songDivs[index]", songDivs[index]);
		console.log("index", index);
		songDivs[index].id = "ulDiv" + index;
		delButtons[index].id = index;
	});
}

function appendMoreButton() {
	var moreButton = document.createElement("BUTTON");
	var moreDiv = document.createElement("DIV");
	moreDiv.id = "moreDiv";
	moreButton.type = "button";
	moreButton.id = "btnMore";
	moreButton.innerHTML = "More Music >>>";
	playList.appendChild(moreDiv);
	moreDiv.appendChild(moreButton);

}

function removeMoreButton() {
	var moreDiv = document.getElementById("moreDiv");
	playList.removeChild(moreDiv);

}