import {Mongo} from 'meteor/mongo';

userWatchedCollection = new Mongo.Collection('userwatchedcollection');

const schema = {
	userId: {
		type: String,
		label: "userId",
	},
	videoId: {
		type: String,
		label: "videoId"
	}
};

if (Meteor.isClient) {
  Meteor.subscribe('userWatchedCollection.all');
}

if (Meteor.isServer) {
  

  Meteor.publish('userWatchedCollection.all', function() {
    return userWatchedCollection.find();
  });
}