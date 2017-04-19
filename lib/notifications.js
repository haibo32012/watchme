import {Mongo} from 'meteor/mongo';

Notifications = new Mongo.Collection('notifications');

Notifications.allow({
	update: function(userId, doc, fieldNames) {
		return ownsDocument(userId, doc) && fieldNames.length === 1 && fieldNames[0] === 'read';
	}
});

createCommentNotification = function(comment) {
	let file = files.findOne(comment.videoId);
	if (comment.userId !== file.userId) {
		Notifications.insert({
			userId: file.userId,
			fileId: file._id,
			commentId: comment._id,
			commentUserId: comment.userId,
			read: false
		});
	}
};