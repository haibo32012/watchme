import {Mongo} from 'meteor/mongo';

const userWatchedCollection = new Mongo.Collection('userwatchedcollection');

export default userWatchedCollection;

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