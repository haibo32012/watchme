import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import files from '/lib/collections/collection.js';
//import '../lib/collection.js';

var filesize = require("filesize");
import { moment } from "meteor/momentjs:moment";
import './uploadForm.html'

Template.uploadForm.onCreated(function() {
  this.currentFile = new ReactiveVar(false); 
  this.uploading = new ReactiveVar(false);
  this.videoFile = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  status: function() {
    const uploadFile = Template.instance().currentFile.get();
    let progress = uploadFile.progress.get();
    progress = Math.ceil(progress);
    let estimateBitrate = uploadFile.estimateSpeed.get();
    estimateBitrate = filesize(Math.ceil(estimateBitrate), {bits: true}) + '/s';
    let estimateDuration = uploadFile.estimateTime.get();
    estimateDuration = (() => {
      const duration = moment.duration(Math.ceil(estimateDuration));
      let hours = '' + (duration.hours());
      if (hours.length <= 1) {
        hours = '0' + hours;
      }

      let minutes = '' + (duration.minutes());
      if (minutes.length <= 1) {
        minutes = '0' + minutes;
      }

      let seconds = '' + (duration.seconds());
      if (seconds.length <= 1) {
        seconds = '0' + seconds;
      }
      return hours + ':' + minutes + ':' + seconds;
    })();
    return {
      progress: progress,
      estimateBitrate: estimateBitrate,
      estimateDuration: estimateDuration
    };
    //console.log(Template.instance().currentFile.get());
  },
  file: function() {
    return Template.instance().videoFile.get();
  },
  uploading: function() {
    return Template.instance().uploading.get();
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
        template.uploading.set(true);
        //console.log(this);
        //console.log(this.estimateTime);
        //let bit = filesize(Math.ceil(this.estimateSpeed), {bits: true}) + '/s';
        //console.log(bit);
  		});

      upload.on('error', function(error) {
        console.log(error);
        //template.uploading.set(false);
      });

  		upload.on('end', function(error, fileObj) {
  			if (error) {
  				alert(error);
          //template.uploading.set(false);
  			} else {
          template.videoFile.set(fileObj);
  				//alert('File "' + fileObj.name + '" successfully uploaded');
          let subscribedObject = subscribeCollection.find({subscribedUserId: fileObj.userId});
          if (subscribedObject !== undefined) {
            subscribedObject.forEach(function(doc) {
              let notificationObject = {
                notificationUserId: doc.userId,
                username: fileObj.meta.username,
                userpicture: fileObj.meta.userPicture,
                userId: fileObj.userId,
                videoId: fileObj._id,
                message: " upload a new video",
                submitted: new Date(),
                read: false
              };
              Meteor.call('notificationInsert', notificationObject, (err) => {
                if (err) {
                    alert(err);
                }
              });
            });
          } else {
            return ;
          }

          //FlowRouter.go('/Update/fileObj._id');
           
  			}
        //template.currentFile.set(false);
        template.uploading.set(false);
       
  		});

  		upload.start();
  	}
  }
});