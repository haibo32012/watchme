import {Mongo} from 'meteor/mongo';
Comments = new Mongo.Collection('comments');

//export default Comments;

const schema = {
	videoId: {
		type: String
	},
	userId: {
		type: String
	},
	body: {
		type: String
	},
	submitted: {
		type: Date
	},
	likeCount: {
		type: Number,
		optional: true
	},
	dislikeCount: {
		type: Number,
		optional: true
	},
	replyComment: {
		type: Object,
		optional: true
	}
};

if (Meteor.isClient) {
  Meteor.subscribe('comments.all');
}

if (Meteor.isServer) {
  

  Meteor.publish('comments.all', function() {
    return Comments.find();
  });
}