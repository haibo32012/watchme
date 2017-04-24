import {Meteor} from 'meteor/meteor';
import './subscribePage.html';
Template.subscribePage.onCreated(function() {
	let self = this;
	self.autorun(function() {
		self.subscribe('subscribeuser.all');
	});
});

Template.subscribePage.helpers({
	file: function() {
		let userId = Meteor.userId();
		let subscribeObject = subscribeCollection.find({userId: userId});
		const subscribedUserIdList = subscribeObject.map(doc => doc.subscribedUserId);
		return files.find({userId: {$in: subscribedUserIdList}}, {sort: {'meta.created_at': -1}});
	}
});