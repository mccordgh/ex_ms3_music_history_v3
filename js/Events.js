"use strict";

let View = require('./View.js'),
		Model = require('./Model.js'),
		FileData = require('./FileData.js');

let Events = {
	handleSelectChange(event){
		View.filterPlaylist();
	},
	handleNavClick (event) {
		View.hideAllBut(event.target);
	},
	handleKeyDown(e) {
		if (e.keyCode == 13)
			Events.addButtonClick(e);
	},
	addButtonClick(e) {
		let songObj = { 
			song: $('#txtSong').val(), 
			artist: $('#txtArtist').val(), 
			album: $('#txtAlbum').val(), 
			genre: $('#txtGenre').val() || "N/A"};
		
		if (songObj.song === "" || songObj.artist === "" || songObj.album === "") {
			alert("Please fill in all fields");
		} else {
			Model.addSongsToPlaylist([songObj]);

			$('#txtSong').val("");
			$('#txtArtist').val("");
			$('#txtAlbum').val("");
			$('#txtGenre').val("");

			alert("Song added! " + songObj.artist + " :: " + songObj.album + " :: " + songObj.song);
		}
	},
	handlePlaylistClick(event) {

		let clicked = event.target,
				clickedID = parseInt(clicked.id);

		if (clicked.type === "button") {

			switch ($(clicked).html()){
				case 'Delete':
					Model.removeSongFromPlaylist(clicked.id);
					break;
				case 'More Music &gt;&gt;&gt;&gt;':
					if (FileData.getAllLoaded()) {
						alert("All songs have been loaded!!");
					} else {
						FileData.loadFile("data/songs2.json", Model.addSongsToPlaylist);
						FileData.setAllLoaded(true);
					}
					break;
				default:
					alert('Something went wrong. Button ' + $(clicked) + ' not found.');
			} 
		}
	}
};

module.exports = Events;