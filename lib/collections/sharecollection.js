import {Mongo} from 'meteor/mongo';

const shareCollection = new Mongo.Collection('sharecollection');

export default shareCollection;

let schema = {
	userId: {
		type: String
	},
	videoId: {
		type: String
	}
}

if (Meteor.isClient) {
  Meteor.subscribe('shareCollection.all');
}

if (Meteor.isServer) {
  Meteor.publish('shareCollection.all', function() {
    return shareCollection.find();
  });
}