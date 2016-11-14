var listAnchor = $("#list_music_anchor")[0];
var addAnchor = $("#add_music_anchor")[0];
var contentNav = $("#content_nav")[0];
var contentOptions = $("#content_options")[0];
var contentPlaylist = $("#content_playlist")[0];
var addMusicView = $("#add_music_view")[0];
var txtSong = $("#txtSong")[0];
var txtArtist = $("#txtArtist")[0];
var txtAlbum = $("#txtAlbum")[0];
var txtGenre = $("#txtGenre")[0];
var btnAdd = $("#btnAdd")[0];
var playList = $("#content_playlist")[0];
var artistChoice = $("#artistChoice")[0];
var albumChoice = $("#albumChoice")[0];

var songs = [];
var songData = {};
var playlistNum = "";
var allLoaded = false;
var lastID = -1;

$.ajax(
	{
		url: "data/songs.json", 
		success: function(result){
			loadSongs(result.songs);
		}
	}
);

listAnchor.classList.add("currentLink", "nav_link");
addAnchor.classList.add("activeLink", "nav_link");
listAnchor.setAttribute("href", "#");
addAnchor.setAttribute("href", "#");

$("#add_music_anchor").click(handleNavClick);
$("#list_music_anchor").click(handleNavClick);
$('#btnAdd').click(addButtonClick);
$('#add_music_view').keydown(handleKeyDown);
$('#content_playlist').click(handlePlaylistClick);

function loadSongs(songs) {
	for ( i = 0; i < songs.length; i++) {
		lastID++;
		addSongToPlaylist(songs[i], lastID);
	}
	appendMoreButton();
}

function handleNavClick () {

	let linkGroup = $(".nav_link");

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

	if ($(event.target).html() === "Add Music"){
		
		contentOptions.classList.add("hidden");
		contentPlaylist.classList.add("hidden");
		addMusicView.classList.remove("hidden");

	} else if ($(event.target).html() === "List Music") {
		
		contentOptions.classList.remove("hidden");
		contentPlaylist.classList.remove("hidden");
		addMusicView.classList.add("hidden");

	} else {
	
		console.log("something went wrong -> :(");
	
	}

}

function addSongToPlaylist (songObj, i) {

	let song = songObj.song;
	let artist = songObj.artist;
	let album = songObj.album;
	let genre = songObj.genre;

	let optn = document.createElement("OPTION");
	optn.text = artist;
	optn.value = artist;
	artistChoice.options.add(optn);

	let optn2 = document.createElement("OPTION");
	optn2.text = album;
	optn2.value = album;
	albumChoice.options.add(optn2);

	let ulDiv = document.createElement("DIV");
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
	playList.appendChild(ulDiv);
	$('#ulDiv' + i).html("<p>" + song + newUL + artist + pipeLI + album + pipeLI + genre + delButton + "</ul></p><hr>");

}

function handleKeyDown (e) {
	if (e.keyCode == 13) {
		e.preventDefault();
		addButtonClick(e);
	}
}

function addButtonClick(e) {
	let songObj = { song: txtSong.value, artist: txtArtist.value, album: txtAlbum.value, genre: txtGenre.value };

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
	let clicked = event.target;
	let clickedID = parseInt(clicked.id);

	if (clicked.type === "button") {

		if ($(clicked).html() === "Delete"){
			lastID--;
			let btnIndex = clickedID;
			let removeDiv = $("#ulDiv" + btnIndex)[0];
			playList.removeChild(removeDiv);
			songs.splice(btnIndex, 1);
			artistChoice.remove(clickedID + 1);
			albumChoice.remove(clickedID + 1);
			updateIDs();

		} else if ($(clicked).html() === "More Music &gt;&gt;&gt;") {
			
			if (allLoaded === true) {
				alert("All songs have been loaded!!");
			} else {

				$.ajax({url: "data/songs2.json", success: function(result){
					loadSongs(result.songs);
        }});
        
				removeMoreButton();
				allLoaded = true;
			}
		}
	}
}

function updateIDs() {
	let songDivs = $(".songDiv");
	let delButtons = $(".btnDelete");
	songs.forEach( function(item, index) {
		songDivs[index].id = "ulDiv" + index;
		delButtons[index].id = index;
	});
}

function appendMoreButton() {
	let moreButton = document.createElement("BUTTON");
	let moreDiv = document.createElement("DIV");
	moreDiv.id = "moreDiv";
	moreButton.type = "button";
	moreButton.id = "btnMore";
	playList.appendChild(moreDiv);
	moreDiv.appendChild(moreButton);
	$('#btnMore').html("More Music >>>");

}

function removeMoreButton() {
	let moreDiv = $("#moreDiv")[0];
	playList.removeChild(moreDiv);

}