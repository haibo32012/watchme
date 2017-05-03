import { Meteor } from 'meteor/meteor';
import './commentPost.html';


Template.commentPost.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam('_id');
		self.subscribe('comments.all', id);
	});
});

Template.commentPost.helpers({
	comments: function() {
		let id = FlowRouter.getParam('_id');
		console.log(Comments.find({videoId: id}));
		return Comments.find({videoId: id}, {sort: {submitted: -1}});
	}
});

Template.commentItem.helpers({

});

Template.commentItem.events({
	'click #likeComment': function() {
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			alert("Please login");
			return ;
		}
		let id = FlowRouter.getParam('_id');

		let commentId = this._id;
		let comment = Comments.findOne({_id: commentId}) || {};
		let subscribed = comment.userId;

		let cursor = likeComment.findOne({
			userId: userId,
			commentId: commentId
		});
		if (cursor !== undefined) {
			if (cursor.isDislike === true) {
				return ;
			} else {
				likeComment.remove(cursor._id);
				Comments.update(commentId,
					{$inc: {
						likeCount: -1
					}}
				);
			}
		} else {
			likeComment.insert({
				userId: userId,
				videoId: id,
				commentId: commentId,
				isLike: true
			});
			Comments.update(commentId,
				{$inc: {
					likeCount: 1
				}}
			);
			Notifications.insert({
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					videoId: id,
					message: "like you comment, congratulations!",
					read: false
			});
		}
	},
	'click #dislikeComment': function() {
		let user = Meteor.user()
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			alert("Please login");
			return ;
		}
		let id = FlowRouter.getParam('_id');

		let commentId = this._id;
		let comment = Comments.findOne({_id: commentId}) || {};
		let subscribed = comment.userId;

		let cursor = likeComment.findOne({
			userId: userId,
			commentId: commentId
		});
		if (cursor !== undefined) {
			if (cursor.isLike === true) {
				return ;
			} else {
				likeComment.remove(cursor._id);
				Comments.update(commentId,
					{$inc: {
						dislikeCount: -1
					}}
				);
			}
		} else {
			likeComment.insert({
				userId: userId,
				commentId: commentId,
				videoId: id,
				isDislike: true
			});
			Comments.update(commentId,
				{$inc: {
					dislikeCount: 1
				}}
			);
			Notifications.insert({
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					videoId: id,
					message: "dislike you comment, sorry!",
					read: false
			});
		}
	}
});

