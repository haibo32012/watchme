import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../lib/collection.js';
import '../imports/accounts-config.js';

import './uploadForm.html'

Template.uploadForm.events({
  'change #fileInput': function(e, template) {
  	if (e.currentTarget.files && e.currentTarget.files[0]) {
      let video = e.currentTarget.files[0];
      video.userId = Meteor.userId();
      video.uploaddate = new Date();
  		let upload = files.insert({

  			file: video,
        //userId: Meteor.userId(),
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