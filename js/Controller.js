"use strict";

let Model = require('./Model.js'),
		FileData = require('./FileData.js'),
		Events = require('./Events.js');

$(function() {
	FileData.loadFile("data/songs.json", Model.addSongsToPlaylist);
	
	$('#songButton').click(() => {console.log(Model.getSongs());});

	$("#content_nav").click(Events.handleNavClick);
	$('#btnAdd').click(Events.addButtonClick);
	$('#add_music_view').keydown(Events.handleKeyDown);
	$('#content_playlist').click(Events.handlePlaylistClick);
	$('#artistChoice').change(Events.handleSelectChange);
	$('#albumChoice').change(Events.handleSelectChange);
});