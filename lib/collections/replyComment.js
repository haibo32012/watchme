import {Mongo} from 'meteor/mongo';

const replyComment = new Mongo.Collection('replycomment');

export default replyComment;

let schema = {
	userId: {
		type: String
	},
	userName: {
		type: String
	},
	userPicture: {
		type: String
	},
	commentId: {
		type: String
	},
	likeCount: {
		type: Number
	},
	dislikeCount: {
		type: Number
	},
	submitted: {
		type: Date()
	}
};

if (Meteor.isClient) {
  Meteor.subscribe('replyComment.all');
}

if (Meteor.isServer) {
  Meteor.publish('replyComment.all', function() {
    return replyComment.find();
  });
}