import { Meteor } from 'meteor/meteor';
import './userProfileForOthers.html';
import './userVideoList.js';

Template.userabout.helpers({
	user: function() {
		let userId = FlowRouter.getParam('_id');
		return Meteor.users.findOne({_id: userId});
	}
});

Template.userProfileForOthers.helpers({
	user: function() {
		let userId = FlowRouter.getParam('_id');
		return Meteor.users.findOne({_id: userId});
	}
});