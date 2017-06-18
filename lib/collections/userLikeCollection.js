import {Mongo} from 'meteor/mongo';

const UserLikeCollection = new Mongo.Collection('userlikecollection');

export default UserLikeCollection;

let schema = {
	userId: {
		type: String,
		label: "userId"
	},
	videoId: {
		type: String,
		label: "videoId"
	},
	isLike: {
		type: Boolean,
		label: "isLike",
		optional: true
	},
	isDisLike: {
		type: Boolean,
		label: "isDisLike",
		optional: true
	}
};

if (Meteor.isClient) {
  Meteor.subscribe('userlike.all');
}

if (Meteor.isServer) {
  

  Meteor.publish('userlike.all', function() {
    return UserLikeCollection.find();
  });
}