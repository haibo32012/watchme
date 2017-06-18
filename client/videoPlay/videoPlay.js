import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import files from '/lib/collections/collection.js';
import shareCollection from '/lib/collections/sharecollection.js';
import UserLikeCollection from '/lib/collections/userLikeCollection.js';
import userWatchedCollection from '/lib/collections/userWatchedCollection.js';
import './videoPlay.html';
import './comment.js';

import './subscribe.js';


Template.videoPlay.onCreated(function() {
	let instance = this;
	let id;

	//instance.loaded = new ReactiveVar(0);
	//instance.limit = new ReactiveVar(5);
	instance.autorun(function() {
		id = FlowRouter.getParam('_id');
		instance.subscribe('userWatchedCollection.all');
		instance.subscribe('shareCollection.all');
		// get the limit
		//var limit = instance.limit.get();
		//console.log("Asking for " + limit + " post...");
		//subscribe to the posts publication
		instance.subscribe('files', id);
		// if subscription is ready, set limit to newLimit
		//if (subscription.ready()) {
		//	console.log("> Received " + limit + " posts. \n\n");
		//	instance.loaded.set(limit);
		//} else {
		//	console.log("> subscription is not ready yet. \n\n");
		//}
	});

	// cursor
	//instance.posts = function() {
		//return files.findOne({_id: id},{limit: instance.loaded.get()});
	//}
});

Template.videoPlay.onRendered(function() {
	let userId = Meteor.userId();
	let id = FlowRouter.getParam('_id');
	// Insert viewCount into the files collection
	Meteor.call('videoViewCountUpdate', id, (err) => {
		if (err) {
			alert(err);
		} else {
			console.log('video view count add one success!');
		}
	});

	// If watched, insert into the userwatchedcollection
	let userWatchedObject = userWatchedCollection.findOne({
		userId: userId,
		videoId: id
	});
	console.log(userWatchedObject);
	if (userWatchedObject !== undefined) {
		return;
	} else {
		let object = {
			userId: userId,
			videoId: id,
		};
		Meteor.call('userWatchedVideoList', object, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('user watched video insert success!');
			}
		});
	}
	
});

Template.videoPlay.helpers({

	isTypeForAll: function() {
		let id = FlowRouter.getParam('_id');
		let user = Meteor.user();
		let file = files.findOne({_id: id}) || {};
		if (file.meta.viewType === 'all') {
			return true;
		} else {
			if (user.profile.isAdult) {
					return true;
			} else {
					return false;
			}
		}
		
	},
	file: function() {
		let id = FlowRouter.getParam('_id');
		return files.findOne({_id: id});
	}
});

Template.videoPlay.events({
	'click #goodToggleButton': function() {
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			alert("Please login");
			return;
		}
		let userpicture = user.profile.picture;
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		let subscribed = file.userId;

		let userLikeObject = UserLikeCollection.findOne({
			userId: userId,
			videoId: id
		});
		console.log(userLikeObject);
		if (userLikeObject !== undefined) {
			if (userLikeObject.isDislike === true) {
				return;
			} else {
				//UserLikeCollection.remove(userLikeObject._id);
				Meteor.call('videoLikeCollectionRemove', userLikeObject._id, (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('like video operation remove success!');
					}
				});
				Meteor.call('videoLikeCountMinusUpdate', id, (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('video like count minus success!');
					}
				});
			}
			
		} else {
			let userLike = {
				userId: userId,
				videoId: id,
				isLike: true
			};
			Meteor.call('userLikeVideoInsert', userLike, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('user like video insert success!');
				}
			});
			
			Meteor.call('videoLikeCountAddUpdate', id, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('vide like count add success!');
				}
			});
			let videoLikeObject = {
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					userpicture: userpicture,
					videoId: id,
					message: " like your video, congratulations!",
					submitted: new Date(),
					read: false
			};
			Meteor.call('notificationInsert', videoLikeObject, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('like video notification insert success!');
				}
			});
		}
	},
	'click #badToggleButton': function() {
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			alert("Please login");
			return ;
		}
		let userpicture = user.profile.picture;
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		let subscribed = file.userId;
		let userLikeObject = UserLikeCollection.findOne({
			userId: userId,
			videoId: id
		});
		console.log(userLikeObject);
		if (userLikeObject !== undefined) {
			if (userLikeObject.isLike === true) {
				return;
			} else {
				//UserLikeCollection.remove(userLikeObject._id);
				Meteor.call('videoLikeCollectionRemove', userLikeObject._id, (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('like video operation remove success!');
					}
				});
				Meteor.call('videoDislikeCountMinusUpdate', id, (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('video dislike count minus success!');
					}
				});
			}
		} else {
			let userDislike = {
				userId: userId,
				videoId: id,
				isDislike: true
			};
			Meteor.call('userLikeVideoInsert', userDislike, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('user dislike video insert success!');
				}
			});
			
			Meteor.call('videoDislikeCountAddUpdate', id, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('video dislike count add success!');
				}
			});

			let videoDislikeObject = {
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					userpicture: userpicture,
					videoId: id,
					message: " dislike your video, sorry!",
					submitted: new Date(),
					read: false
			};
			Meteor.call('notificationInsert', videoDislikeObject, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('dislike video notification insert success!');
				}
			});
		}
	},
	'click #share': function() {
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			alert("Please login");
			return ;
		}
		let userpicture = user.profile.picture;
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		let subscribed = file.userId;
		console.log(userId);
		console.log(id);
		let userShareObject = shareCollection.findOne({
			userId: userId,
			videoId: id
		});
		console.log(userShareObject);
		if (userShareObject !== undefined) {
			//shareCollection.remove(userShareObject._id);
			Meteor.call('videoShareCollectionRemove', userShareObject._id, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('video share operation remove success!');
				}
			});
			Meteor.call('videoShareCountMinusUpdate', id, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('video share count minus success!');
				}
			});
		} else {
			let userShare = {
				userId: userId,
				videoId: id
			};
			Meteor.call('userShareVideoInsert', userShare, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('user share vide list insert success!');
				}
			});
			Meteor.call('videoShareCountAddUpdate', id, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('video share count add success!');
				}
			});
			let shareNotificationObject = {
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					userpicture: userpicture,
					videoId: id,
					message: " share you video, congratulations!",
					submitted: new Date(),
					read: false
			};
			Meteor.call('notificationInsert', shareNotificationObject, (err) => {
				if (err) {
					alert(err);
				} else {
					console.log('share video notification insert success!');
				}
			});
		}
	}
});