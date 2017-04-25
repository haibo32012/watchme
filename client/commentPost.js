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
		let userId = Meteor.userId();
		let commentId = this._id;
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
				commentId: commentId,
				isLike: true
			});
			Comments.update(commentId,
				{$inc: {
					likeCount: 1
				}}
			);
		}
	},
	'click #dislikeComment': function() {
		let userId = Meteor.userId();
		let commentId = this._id;
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
				isDislike: true
			});
			Comments.update(commentId,
				{$inc: {
					dislikeCount: 1
				}}
			);
		}
	}
});

