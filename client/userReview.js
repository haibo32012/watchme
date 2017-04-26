import { MeteorCameraUI } from 'meteor/supaseca:camera-ui';
import { Meteor } from 'meteor/meteor';
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
		MeteorCameraUI.getPicture({width: 60, height: 60}, function(err, data) {
				//check(data, String);
				console.log(data);
			Meteor.users.update(userId,
				{$set: 
					{'profile.picture': data}
				}
			);
		});
	},
	'click profileName': function(e, template) {
		e.preventDefault();
	},
	'click profileAbout': function(e, template) {
		e.preventDefault();
	}
});