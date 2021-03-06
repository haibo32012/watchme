import {Meteor} from 'meteor/meteor';
import Notifications from '/lib/collections/notifications.js';
import './notification.html';

Template.notification.helpers({
	notifications: function() {
		return Notifications.find({notificationUserId: Meteor.userId(), read: false}, {sort: {submitted: -1}});
	},
	notificationCount: function() {
		return Notifications.find({notificationUserId: Meteor.userId(), read: false}).count();
	},
});

Template.notificationItem.helpers({
	notificationPostPath: function() {
		var routeName = "/post";
		var params = {
			_id: this.videoId
		};
		var path = FlowRouter.path(routeName,params);
		return path;
	}
});

Template.notificationItem.events({
	'click a': function() {
		Meteor.call('notificationUpdate', this._id, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('notification has already been read!');
			}
		});
	}
});