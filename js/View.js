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