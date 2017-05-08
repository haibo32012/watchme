import {Mongo} from 'meteor/mongo';

replyLikeComment = new Mongo.Collection('replylikecomment');

const schema = {
	userId: {
		type: String
	},
	videoId: {
		type: String
	},
	replyCommentId: {
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
  Meteor.subscribe('replyLikeComment.all');
}

if (Meteor.isServer) {
  

  Meteor.publish('replyLikeComment.all', function() {
    return replyLikeComment.find();
  });
}