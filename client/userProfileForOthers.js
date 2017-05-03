import { Meteor } from 'meteor/meteor';
import './userProfileForOthers.html';
import './userVideoList.js';

Template.userabout.helpers({
	user: function() {
		let userId = FlowRouter.getParam('userId');
		return Meteor.users.findOne({_id: userId});
	}
});

Template.userProfileForOthers.helpers({
	userId: function() {
		console.log(FlowRouter.getParam('userId'));
		return FlowRouter.getParam('userId');
	}
});