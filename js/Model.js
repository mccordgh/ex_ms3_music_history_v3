"use strict";

let View = require('./View.js');
let	songs = [],	songData = {};

let Model = {
	addSongsToPlaylist(songObj) {
		View.removeMoreButton();
		songObj.forEach(function(item, index) {
			let song = item.song, artist = item.artist, album = item.album, genre = item.genre;
			songs.push ({song, artist, album, genre});
		});

		View.addSongsToDOM(songObj);
		View.addMoreButton();
	},
	removeSongFromPlaylist(index){
		songs.splice(index, 1);
		View.removeSongFromDOM(index);
	},
	getSongs(){
		return songs;
	}
};

module.exports = Model;