import files from '/lib/collections/collection.js';
import Comments from '/lib/collections/commentCollection.js';
import Notifications from '/lib/collections/notifications.js';
import replyComment from '/lib/collections/replyComment.js';
import replyLikeComment from '/lib/collections/replyLikeComment.js';
import shareCollection from '/lib/collections/sharecollection.js';
import subscribeCollection from '/lib/collections/subscribeCollection.js';
import UserLikeCollection from '/lib/collections/userLikeCollection.js';
import likeComment from '/lib/collections/userLikeComment.js';
import userWatchedCollection from '/lib/collections/userWatchedCollection.js';

Meteor.methods({
	userPictureUpdate(data) {
		let userId = Meteor.userId();
		Meteor.users.update(userId,
			{$set: {
				'profile.picture': data
			}}
		);
	},
	userAgeAdultUpdate() {
		let userId = Meteor.userId();
		Meteor.users.update(userId,
			{$set: {
				'profile.isAdult': true
			}}
		);
	},
	userAgeChildUpdate() {
		let userId = Meteor.userId();
		Meteor.users.update(userId,
			{$set: {
				'profile.isAdult': false
			}}
		);
	},
	userIntroductionUpdate(userIntroduction) {
		let userId = Meteor.userId();
		Meteor.users.update(userId,
			{$set: {
				'profile.introduction': userIntroduction
			}}
		);
	},
	videoUserPicture(userId, data) {
		//console.log(userId);
		//console.log(data);
		var test = files.update({userId: userId},
			{$set: {
				'meta.userPicture': data
			}},
			{multi: true}
		);
		//console.log(test);
	},
	videoViewCountUpdate(id) {
		files.update(id,
			{$inc: {
				'meta.view_count': 1
			}},
		);
	},
	videoLikeCountAddUpdate(id) {
		files.update(id,
			{$inc: {
				'meta.like_count': 1
			}},
			//{validate: false},
			{validate: false, filter: false}
		);
	},
	videoLikeCountMinusUpdate(id) {
		files.update(id,
			{$inc: {
				'meta.like_count': -1
			}},
			//{validate: false},
			{validate: false, filter: false}

		);
	},
	videoLikeCollectionRemove(id) {
		UserLikeCollection.remove(id);
	},
	videoLikeRemove(object) {
		UserLikeCollection.remove(object);
	},
	videoDislikeCountAddUpdate(id) {
		files.update(id,
			{$inc: {
				'meta.dislike_count': 1
			}},
			//{validate: false},
			{validate: false, filter: false}
		);
	},
	videoDislikeCountMinusUpdate(id) {
		files.update(id,
			{$inc: {
				'meta.dislike_count': -1
			}},
			//{validate: false},
			{validate: false, filter: false}
		);
	},
	videoShareCountMinusUpdate(id) {
		files.update(id,
			{$inc: {
				'meta.share_count': -1
			}},
			//{validate: false},
			{validate: false, filter: false}
		);
	},
	videoShareCollectionRemove(id) {
		shareCollection.remove(id);
	},
	videoShareRemove(object) {
		shareCollection.remove(object);
	},
	videoShareCountAddUpdate(id) {
		files.update(id,
			{$inc: {
				'meta.share_count': 1
			}},
			//{validate: false},
			{validate: false, filter: false}
		);
	},
	videoViewTypeUpdate(id, viewType) {
		files.update(id,
			{$set: {
				'meta.viewType': viewType
			}}
		);
	},
	videoIntroductionUpdate(id, videoIntroduction) {
		files.update(id,
			{$set: {
				'meta.introduction': videoIntroduction
			}}
		);
	},
	videoPriceTypeUpdate(id, priceType) {
		files.update(id,
			{$set: {
				'meta.priceType': priceType
			}}
		);
	},
	publishVideo(id) {
		files.update(id,
			{$set: {
				'meta.publish': true
			}}
		);
	},

	videoRemove(id) {
		files.remove(id);
	},
	
	userLikeVideoInsert(userLikeObject) {
		UserLikeCollection.insert(userLikeObject);
	},

	userShareVideoInsert(userShareObject) {
		shareCollection.insert(userShareObject);
	},

	userExists(username) {
		return !!Meteor.users.findOne({username: username});
	},

	// notification
	notificationInsert(notificationObject) {
		Notifications.insert(notificationObject);
	},
	notificationUpdate(id) {
		Notifications.update(id,
			{$set: {
				read: true
			}}
		);
	},

	// comment
	commentRemove(object) {
		Comments.remove(object);
	},
	commentInsert(commentObject) {
		Comments.insert(commentObject);
	},
	likeCommentInsert(likeCommentObject) {
		likeComment.insert(likeCommentObject);
	},
	likeCommentRemove(id) {
		likeComment.remove(id);
	},
	likeCommentObjectRemove(object) {
		likeComment.remove(object);
	},
	commentUpdateAddLikeCount(commentId) {
		Comments.update(commentId,
			{$inc: {
				likeCount: 1
			}}
		);
	},
	commentUpdateMinusLikeCount(commentId) {
		Comments.update(commentId,
			{$inc: {
				likeCount: -1
			}}
		);
	},
	commentUpdateAdddislikeCount(commentId) {
		Comments.update(commentId,
			{$inc: {
				dislikeCount: 1
			}}
		);
	},
	commentUpdateMinusdislikeCount(commentId) {
		Comments.update(commentId,
			{$inc: {
				dislikeCount: -1
			}}
		);
	},

	// reply comment
	replyCommentInsert(replyCommentObject) {
		replyComment.insert(replyCommentObject);
	},
	replyCommentMinusLikeCount(replyCommentId) {
		replyComment.update(replyCommentId,
			{$inc: {
				likeCount: -1
			}}
		);
	},
	replyCommentAddLikeCount(replyCommentId) {
		replyComment.update(replyCommentId,
			{$inc: {
				likeCount: 1
			}}
		);
	},
	replyCommentMinusdislikeCount(replyCommentId) {
		replyComment.update(replyCommentId,
			{$inc: {
				dislikeCount: -1
			}}
		);
	},
	replyCommentAdddislikeCount(replyCommentId) {
		replyComment.update(replyCommentId,
			{$inc: {
				dislikeCount: 1
			}}
		);
	},
	replyLikeCommentInsert(replyLikeCommentObject) {
		replyLikeComment.insert(replyLikeCommentObject);
	},
	replyLikeCommentRemove(id) {
		replyLikeComment.remove(id);
	},

	// subscribe
	subscribeUserInsert(subscribedObject) {
		subscribeCollection.insert(subscribedObject);
	},
	subscribeUserRemove(id) {
		subscribeCollection.remove(id);
	},
	userSubscribedAddCount(subscribed) {
		Meteor.users.update(subscribed,
			{$inc: {
				'profile.subscribe_count': 1
			}},
		);
	},
	userSubscribedMinusCount(subscribed) {
		Meteor.users.update(subscribed,
			{$inc: {
				'profile.subscribe_count': -1
			}},
		);
	},
	userWatchedVideoList(object) {
		userWatchedCollection.insert(object);
	},
	userWatchedVideoRemove(object) {
		userWatchedCollection.remove(object);
	},
});