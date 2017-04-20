import {Mongo} from 'meteor/mongo';

subscribeCollection = new Mongo.Collection('subscribecollection');

let schema = {
	userId: {
		type: String,
		label: "userId"
	},
	subscribedUserId: {
		type: String,
		label: "subscribedUserId"
	}
};

if (Meteor.isClient) {
  Meteor.subscribe('subscribeuser.all');
}

if (Meteor.isServer) {
  Meteor.publish('subscribeuser.all', function() {
    return subscribeCollection.find();
  });
}