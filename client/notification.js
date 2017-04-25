import {Meteor} from 'meteor/meteor';
import './notification.html';

Template.notification.helpers({
	notifications: function() {
		return Notifications.find({notificationUserId: Meteor.userId(), read: false});
	},
	notificationCount: function() {
		return Notifications.find({notificationUserId: Meteor.userId(), read: false}).count();
	},
});

Template.notificationItem.helpers({
	notificationPostPath: function() {
		return ;
	}
});

Template.notificationItem.events({
	'click a': function() {
		Notifications.update(this._id, {$set: {read: true}});
	}
});