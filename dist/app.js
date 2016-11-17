(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./Events.js":2,"./FileData.js":3,"./Model.js":4}],2:[function(require,module,exports){
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
},{"./FileData.js":3,"./Model.js":4,"./View.js":5}],3:[function(require,module,exports){
"use strict";

let allLoaded = false;

let FileData = {
	loadFile(_path, callbackFn){
		$.ajax(
			{
				url: _path, 
				success(result){
					callbackFn(result.songs);
				}
			});
		},
		getAllLoaded() {
			return allLoaded;
		},
		setAllLoaded(_bool){
			allLoaded = _bool;
		}
	};

	module.exports = FileData;
},{}],4:[function(require,module,exports){
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
},{"./View.js":5}],5:[function(require,module,exports){
"use strict";

let View = {
	updateIDs() {
		console.clear();
		$.each( $(".songDiv"), function(index, item) {
			console.log("index", index);
			console.log("item", item);
			// if (!($(item).is('.hidden'))){
				console.log("setting " + $(item) + " id to >ulDiv" + index);
				$(item).attr('id', `ulDiv${index}`);
				console.log("setting " + $('.btnDelete')[index] + " id to " + index);
				$(".btnDelete")[index].setAttribute('id', index);
			// }
		});
	},	
	addMoreButton() {
		$('<div/>', {
	    id: 'moreDiv'
		}).appendTo('#content_playlist');

		$('<button/>', {
	    type: 'button',
	    id: 'btnMore',
	    html: 'More Music >>>>'
		}).appendTo('#moreDiv');
	},
	removeMoreButton() {
		$('#moreDiv').remove();
	},
	addSongsToDOM(songObj){
		songObj.forEach(function(item, index) {
			
			if (View.doesItExistInPlaylist('artist', item.artist) === -1)
				$('<option/>', {
			    text: item.artist,
			    value: item.artist
				}).appendTo('#artistChoice');

			if (View.doesItExistInPlaylist('album', item.album) === -1)
			$('<option/>', {
		    text: item.album,
		    value: item.album
			}).appendTo('#albumChoice');

			let song = "<h1>" + item.song + "</h1>";
			let newUL = "<ul>";
			let artist = "<li><artist>" + item.artist + "</artist></li>";
			let pipeLI = "<li><b>|</b></li>";
			let album = "<li><album>" + item.album + "</album></li>";
			let genre = "<li><genre>Genre: " + item.genre + "<genre></li>";
			let delButton = "<li><button type='button' id='" + index + "' class='btnDelete'>Delete</button></li>";

			$('<div/>', {
		    id: 'ulDiv' + index,
		    class: 'songDiv',
		    html: "<p>" + song + newUL + artist + pipeLI + album + pipeLI + genre + delButton + "</ul></p><hr>"
			}).appendTo('#content_playlist');
		});

		View.updateIDs();
	},
	removeSongFromDOM(index) {
		let currArtist = $('artist')[index].innerHTML;
		let currAlbum = $('album')[index].innerHTML;
		
		console.log("removing:");
		console.log($('#ulDiv' + index));
		$('#ulDiv' + index).remove();
		console.log("ulDiv" + index + " should now be removed");

		if (this.doesItExistInPlaylist('album', currAlbum) === -1) {
			$("#albumChoice option[value='" + currAlbum + "']").remove();
			View.filterPlaylist();
		}

		if (this.doesItExistInPlaylist('artist', currArtist) === -1) {
			$("#artistChoice option[value='" + currArtist + "']").remove();
			View.filterPlaylist();
		}

		this.updateIDs();
	},
	doesItExistInPlaylist(tagName, string){
		let index = -1;

		$.each($(tagName), function(_index, item) {
			if ($(item).html() === string) {
			 index = _index;
			}
		});
	 return index;
	},
	filterPlaylist() {
	 	$('.songDiv').each(function(index, item){
	 		let artist = $('artist')[index].innerHTML,
	 				filterArtist = $('#artistChoice').val(),
	 				album = $('album')[index].innerHTML,
	 				filterAlbum = $('#albumChoice').val(),
	 				artistMatch = ((artist === filterArtist) || filterArtist === "--Show All--"),
	 				albumMatch = ((album === filterAlbum) || filterAlbum === "--Show All--");

	 		if (artistMatch && albumMatch){
	 			$(item).removeClass('hidden');
	 		} else {
	 			$(item).addClass('hidden');
	 		}
	 	});
	},
	hideAllBut(target){
		$('.list_anchor').each(function(index, item){
			if (item === target) {
				$(item).addClass('currentLink');
				$("#" + $(item).attr('next')).removeClass('hidden');
			} else {
				$(item).removeClass('currentLink');
				$("#" + $(item).attr('next')).addClass('hidden');
			}
		});
	}
};

module.exports = View;
},{}]},{},[1]);
