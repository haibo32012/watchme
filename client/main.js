import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../lib/collection.js';
import '../lib/accounts-config.js';

import './main.html';

Template.showVideo.onCreated(function () {
  
});

Template.showVideo.onRendered(function() {

});

Template.showVideo.helpers({
  //file: function () {
  //	return files.findOne();
  //}
});

Template.uploadForm.events({
  'change #fileInput': function(e, template) {
  	if (e.currentTarget.files && e.currentTarget.files[0]) {
  		let upload = files.insert({
  			file: e.currentTarget.files[0],
  			streams: 'dynamic',
  			chunkSize: 'dynamic',
      }, false);

  		upload.on('start', function() {

  		});

  		upload.on('end', function(error, fileObj) {
  			if (error) {
  				alert('Error during upload: ' + error);
  			} else {
  				alert('File "' + fileObj.name + '" successfully uploaded');
  			}

  		});

  		upload.start();
  	}
  }
});
