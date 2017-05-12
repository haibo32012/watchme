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
			Meteor.users.update(userId,
				{$set: 
					{'profile.picture': data}
				}
			);
			
			
			Meteor.call('videoUserPicture', userId, data, function(error) {
				if (error) {
					console.error(error);
				} else {

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
			Meteor.users.update(userId,
				{$set: 
					{'profile.isAdult': true}
				}
			);
		} else {
			Meteor.users.update(userId,
				{$set: 
					{'profile.isAdult': false}
				}
			);
		}
		
		Meteor.users.update(userId,
			{$set: 
				{'profile.introduction': userIntroduction}
			}
		);

		$('#userReviewModal').modal('show');
	},
});