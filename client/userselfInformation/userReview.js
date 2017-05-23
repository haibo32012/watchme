import { MeteorCameraUI } from 'meteor/supaseca:camera-ui';
import { Meteor } from 'meteor/meteor';
import {check} from 'meteor/check';
import './userReview.html';

Template.userReview.helpers({
	user: function() {
		return Meteor.user();
	}
});

Template.userReview.events({
	'click #photo': function(e, template) {
		e.preventDefault();
		let userId = Meteor.userId();
		MeteorCameraUI.getPicture({width: 30, height: 30}, function(err, data) {
				//check(data, String);
				console.log(data);
			Meteor.call('userPictureUpdate', data, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('user picture update success!');
				}
			});
			
			
			Meteor.call('videoUserPicture', userId, data, function(error) {
				if (error) {
					console.error(error);
				} else {
					console.log('video user picture update success!');
				}
			});
		});
	},
	'submit #userIntroduction': function(e, template) {
		e.preventDefault();
		let userId = Meteor.userId();
		let ageType = document.querySelector('input[name="userTypeOfAge"]:checked').value;
		console.log(ageType);
		let userIntroduction = e.target.userProfileIntroduction.value;
		check(userIntroduction, String);
		if (ageType === "adult") {
			Meteor.call('userAgeAdultUpdate', (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('user adult update success!');
				}
			});
		} else {
			Meteor.call('userAgeChildUpdate', (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('user child update success!');
				}
			});
		}
		
		Meteor.call('userIntroductionUpdate', userIntroduction, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('user introduction update success!');
			}
		});

		$('#userReviewModal').modal('show');
	},
});