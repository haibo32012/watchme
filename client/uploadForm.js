import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import files from '/lib/collections/collection.js';
import subscribeCollection from '/lib/collections/subscribeCollection.js';
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
  },
  showVideoEdit: function() {
    return !!files.findOne({userId: Meteor.userId(),"meta.publish": false});
  }
});

Template.videoEdit.helpers({
  editVideo: function() {
    return files.findOne({userId: Meteor.userId(),"meta.publish": false});
  }
});

Template.videoEdit.events({
  'submit #editForm': function(e) {
    e.preventDefault();
    console.log(this);
    // view type of the video
    let id = this._id;
    let viewType = document.querySelector('input[name="TypeOfVideo"]:checked').value;
    Meteor.call('videoViewTypeUpdate', id, viewType, (err) => {
      if (err) {
        alert(err);
      } else {
        console.log('video view type update success!');
      }
    });

    // type of the video price
    let videoIntroduction = e.target.videoIntroduction.value;
    console.log(videoIntroduction);
    let priceType = document.querySelector('input[name="priceOfVideo"]:checked').value;
    console.log(priceType);
    let priceValue = e.target.videoValue.value;
    check(priceValue, String);
    console.log(priceValue);
    
    Meteor.call('videoIntroductionUpdate', id, videoIntroduction, (err) => {
      if (err) {
        alert(err);
      } else {
        console.log('video introduction update success!');
      }
    });
    switch(priceType) {
      case 'freeVideo':
        Meteor.call('videoPriceTypeUpdate', id, 'freeVideo', (err) => {
          if (err) {
            alert(err);
          } else {
            console.log('video price type update success!');
          }
        });
        break;
      case 'donateVideo':
        Meteor.call('videoPriceTypeUpdate', id, 'donateVideo', (err) => {
          if (err) {
            alert(err);
          } else {
            console.log('video price type update success!');
          }
        });
        break;
      case 'bargainVideo':
        Meteor.call('videoPriceTypeUpdate', id, 'bargainVideo', (err) => {
          if (err) {
            alert(err);
          } else {
            console.log('video price type update success!');
          }
        });
        break;
    }
    //$('#videoReviewModal').modal('show');
    e.target.videoValue = '0';
    Meteor.call('publishVideo', id, (err) => {
      if (err) {
        alert(err);
      } else {
        console.log('video success published!');
      }
    });
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
          created_at: new Date(),
          publish: false,
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