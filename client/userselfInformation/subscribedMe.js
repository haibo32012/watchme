import {Meteor} from 'meteor/meteor';
import './subscribedMe.html';

Template.subscribedMe.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = Meteor.userId();
		self.subscribe('subscribeuser.all', id);
	});
});

Template.subscribedMe.helpers({
	users: function() {
		let userId = Meteor.userId();
		return subscribeCollection.find({subscribedUserId: userId}) || {};
	}
});