import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../lib/collection.js';


import './uploadForm.html'

Template.uploadForm.events({
  'change #fileInput': function(e, template) {
  	if (e.currentTarget.files && e.currentTarget.files[0]) {
      let video = e.currentTarget.files[0];
      let user = Meteor.user();
      video.userId = user._id;
  		let upload = files.insert({

  			file: video,
        meta: {
          username: user.username,
          userPicture: user.profile.picture,
          like_count: parseInt(0),
          dislike_count: parseInt(0),
          view_count: parseInt(0),
          share_count: 0,
          created_at: new Date()
        },
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
          let subscribedObject = subscribeCollection.find({subscribedUserId: fileObj.userId});
          if (subscribedObject !== undefined) {
            subscribedObject.forEach(function(doc) {
              Notifications.insert({
                notificationUserId: doc.userId,
                username: fileObj.meta.username,
                userId: fileObj.userId,
                videoId: fileObj._id,
                message: "upload a new video",
                read: false
              });
            });
          } else {
            return ;
          }
  			}

  		});

  		upload.start();
  	}
  }
});