"use strict";

let View = {
	updateIDs() {
		$.each( $(".songDiv"), function(index, item) {
			$(item).attr('id', `ulDiv${index}`);
			$(".btnDelete")[index].setAttribute('id', index);
		});
	},	
	addMoreButton() {
		$('<div/>', {
	    id: 'moreDiv',
	    class: 'col-md-12'
		}).appendTo('#content_playlist');

		$('<button/>', {
	    type: 'button',
	    id: 'btnMore',
	    class: 'btnSimple',
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

			let song = `<div class='col-md-4'>${item.song}</div>`;
			let artist = `<div class='col-md-4'><artist>${item.artist}</artist></div>`;
			let album = `<div class='col-md-3'><album>${item.album}</album></div>`;
			// let genre = "<li><genre>Genre: " + item.genre + "<genre></li>";
			let delButton = "<button type='button' id='" + index + "' class='btnDelete btnSimple pull-right'>X</button>";

			$('<div/>', {
		    id: 'ulDiv' + index,
		    class: 'songDiv col-md-12',
		    html: song + artist + album + delButton
			}).appendTo('#content_playlist');
		});

		View.updateIDs();
	},
	removeSongFromDOM(index) {
		let currArtist = $('artist')[index].innerHTML;
		let currAlbum = $('album')[index].innerHTML;
		
		$('#ulDiv' + index).remove();

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
	 				artistMatch = ((artist === filterArtist) || filterArtist === "-Show All-"),
	 				albumMatch = ((album === filterAlbum) || filterAlbum === "-Show All-");

	 		if (artistMatch && albumMatch){
	 			$(item).removeClass('hidden');
	 		} else {
	 			$(item).addClass('hidden');
	 		}
	 	});
	},
	hideAllBut(target){
		if (target.tagName !== "LI") return;
		$('.list_anchor').each(function(index, item){
			if (item === target) {
				$(item).addClass('currentLink');
				$("#" + $(item).attr('data--next')).removeClass('hidden');
			} else {
				$(item).removeClass('currentLink');
				$("#" + $(item).attr('data--next')).addClass('hidden');
			}
		});
	}
};

module.exports = View;