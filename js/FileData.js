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