import {Mongo} from 'meteor/mongo';

const likeComment = new Mongo.Collection('likecomment');

export default likeComment;

const schema = {
	userId: {
		type: String
	},
	videoId: {
		type: String
	},
	commentId: {
		type: String
	},
	isLike: {
		type: Boolean,
		optional: true
	},
	isDislike: {
		type: Boolean,
		optional: true
	}
};

if (Meteor.isClient) {
  Meteor.subscribe('likeComment.all');
}

if (Meteor.isServer) {
  

  Meteor.publish('likeComment.all', function() {
    return likeComment.find();
  });
}