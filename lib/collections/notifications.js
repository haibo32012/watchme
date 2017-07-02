import {Mongo} from 'meteor/mongo';

const Notifications = new Mongo.Collection('notifications');

export default Notifications;

const schema = {
	notificationUserId: {
		type: String
	},
	userId: {
		type:String
	},
	videoId: {
		type: String
	},
	commentId: {
		type: String
	},
	read: {
		type: Boolean
	}
};

if (Meteor.isClient) {
  Meteor.subscribe('Notifications.all');
}

if (Meteor.isServer) {
  Meteor.publish('Notifications.all', function() {
    return Notifications.find();
  });
}
