import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../lib/collection.js';

var filesize = require("filesize");
import './uploadForm.html'

Template.uploadForm.onCreated(function() {
  this.currentFile = new ReactiveVar(false); 
  
  this.videoFile = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentFile: function() {
    return Template.instance().currentFile.get();
    //console.log(Template.instance().currentFile.get());
  },
  file: function() {
    return Template.instance().videoFile.get();
  }
});

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
        template.currentFile.set(this);
        //template.uploading.set(true);
        //console.log(this);
        //console.log(this.estimateTime);
        //let bit = filesize(Math.ceil(this.estimateSpeed), {bits: true}) + '/s';
        //console.log(bit);
  		});

      upload.on('error', function(error) {
        console.log(error);

      });

  		upload.on('end', function(error, fileObj) {
  			if (error) {
  				alert('Error during upload: ' + error);
  			} else {
          template.videoFile.set(fileObj);
  				//alert('File "' + fileObj.name + '" successfully uploaded');
          let subscribedObject = subscribeCollection.find({subscribedUserId: fileObj.userId});
          if (subscribedObject !== undefined) {
            subscribedObject.forEach(function(doc) {
              Notifications.insert({
                notificationUserId: doc.userId,
                username: fileObj.meta.username,
                userId: fileObj.userId,
                videoId: fileObj._id,
                message: " upload a new video",
                read: false
              });
            });
          } else {
            return ;
          }

          //FlowRouter.go('/Update/fileObj._id');
  			}
        //template.currentFile.set(false);
        //template.uploading.set(false);
  		});

  		upload.start();
  	}
  }
});