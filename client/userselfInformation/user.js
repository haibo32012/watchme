import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import "./user.html";

Template.user.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = Meteor.userId();
		self.subscribe('users.all', id);
	});
});

Template.user.helpers({
	user: function() {
		return Meteor.user();
	},
	myVideosCount: function() {
		return files.find({userId: Meteor.userId()}).count();
	},
	mySubscribedUserCount: function() {
		return subscribeCollection.find({userId: Meteor.userId()}).count();
	},
	mySharedVideosCount: function() {
		return shareCollection.find({userId: Meteor.userId()}).count();
	},
	myLikedVideosCount: function() {
		return UserLikeCollection.find({userId: Meteor.userId(), isLike: true}).count();
	},
	notificationsCount: function() {
		return Notifications.find({notificationUserId: Meteor.userId(), read: false}).count();
	}
});

Template.user.events({
	'click button': function(e) {
		e.preventDefault();
		AccountsTemplates.logout();
	}
});