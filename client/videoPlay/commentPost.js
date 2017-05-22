import { Meteor } from 'meteor/meteor';
import {check} from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var';
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

Template.commentItem.onCreated(function() {
	this.showReply = new ReactiveVar(true);
})

Template.commentItem.helpers({
	showReplyForm: function() {
		return Template.instance().showReply.get();
	},
	haveReplyComment: function() {
		let commentId = this._id;
		return replyComment.findOne({commentId: commentId});
	},
	replyComments: function() {

		return replyComment.find({commentId: this._id}, {sort: {submitted: -1}});
	}
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
		let userpicture = user.profile.picture;
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
			Meteor.call('commentUpdateAddLikeCount', commentId, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('comment update success');
				}
			});
			let notificationObject = {
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					userpicture: userpicture,
					videoId: id,
					message: " like you comment, congratulations!",
					submitted: new Date(),
					read: false
			};
			Meteor.call('notificationInsert', notificationObject, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('success insert notification');
				}
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
		let userpicture = user.profile.picture;
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
				Meteor.call('commentUpdateMinusLikeCount', commentId, (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('comment like count minus success!');
					}
				});
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
					userpicture: userpicture,
					videoId: id,
					message: " dislike you comment, sorry!",
					submitted: new Date(),
					read: false
			});
		}
	},
	'click #replyButtom': function(e, template) {
		e.preventDefault();
		template.showReply.set(false);
	},
	'submit #replyForm': function(e, template) {
		e.preventDefault();
		template.showReply.set(true);
		let replyText = e.target.replyCommentText.value;
		check(replyText, String);
		console.log(replyText);

		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		let commentId = this._id;
		let userpicture = user.profile.picture;
		let replycomment = replyComment.insert({
			userId: userId,
			userName: username,
			commentId: commentId,
			userPicture: userpicture,
			body: replyText,
			submitted: new Date()
		});
		console.log(replycomment);
		let commentObject = Comments.findOne({_id: commentId}) || {};
		let id = FlowRouter.getParam('_id');
		Notifications.insert({
			notificationUserId: commentObject.userId,
			userId: userId,
			username: username,
			userpicture: userpicture,
			videoId: id,
			commentId: commentId,
			message: " reply your comment: " + replyText,
			submitted: new Date(),
			read: false
		});
	}
});

Template.replyCommentItem.events({
	'click #replyLikeComment': function() {
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			alert("Please login");
			return ;
		}
		let userpicture = user.profile.picture;
		let id = FlowRouter.getParam('_id');

		let replyCommentId = this._id;
		let replyCommentObject = replyComment.findOne({_id: replyCommentId}) || {};
		let subscribed = replyCommentObject.userId;

		let cursor = replyLikeComment.findOne({
			userId: userId,
			replyCommentId: replyCommentId
		});
		if (cursor !== undefined) {
			if (cursor.isDislike === true) {
				return ;
			} else {
				replyLikeComment.remove(cursor._id);
				replyComment.update(replyCommentId,
					{$inc: {
						likeCount: -1
					}}
				);
			}
		} else {
			replyLikeComment.insert({
				userId: userId,
				videoId: id,
				replyCommentId: replyCommentId,
				isLike: true
			});
			replyComment.update(replyCommentId,
				{$inc: {
					likeCount: 1
				}}
			);
			Notifications.insert({
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					userpicture: userpicture,
					videoId: id,
					message: " like you comment, congratulations!",
					submitted: new Date(),
					read: false
			});
		}
	},
	'click #replyDislikeComment': function() {
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			alert("Please login");
			return ;
		}
		let userpicture = user.profile.picture;
		let id = FlowRouter.getParam('_id');

		let replyCommentId = this._id;
		let replyCommentObject = replyComment.findOne({_id: replyCommentId}) || {};
		let subscribed = replyCommentObject.userId;

		let cursor = replyLikeComment.findOne({
			userId: userId,
			replyCommentId: replyCommentId
		});
		if (cursor !== undefined) {
			if (cursor.isLike === true) {
				return ;
			} else {
				replyLikeComment.remove(cursor._id);
				replyComment.update(replyCommentId,
					{$inc: {
						dislikeCount: -1
					}}
				);
			}
		} else {
			replyLikeComment.insert({
				userId: userId,
				videoId: id,
				replyCommentId: replyCommentId,
				isDislike: true
			});
			replyComment.update(replyCommentId,
				{$inc: {
					dislikeCount: 1
				}}
			);
			Notifications.insert({
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					userpicture: userpicture,
					videoId: id,
					message: " dislike you comment, sorry!",
					submitted: new Date(),
					read: false
			});
		}
	}
})

