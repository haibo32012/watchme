import { Meteor } from 'meteor/meteor';
import subscribeCollection from '/lib/collections/subscribeCollection.js';
import './userProfileForOthers.html';
import './userVideoList.js';

Template.userabout.helpers({
	user: function() {
		let userId = FlowRouter.getParam('_id');
		return Meteor.users.findOne({_id: userId});
	}
});

Template.userProfileForOthers.helpers({
	user: function() {
		let userId = FlowRouter.getParam('_id');
		return Meteor.users.findOne({_id: userId});
	}
});

Template.userProfileForOthers.events({
	'click #subscribe_button':function() {
		if (Meteor.user() === null) {
			console.log('please login');
			//alert('please login');
			return ;
		}
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		
		let userpicture = user.profile.picture;
		let subscribed = FlowRouter.getParam('_id');
		let subscribedUser = Meteor.users.findOne({_id: subscribed});
		let subscribedUsername = subscribedUser.username;
		let subscribedPicture = subscribedUser.profile.picture;
		//let subscribedId;
		console.log(userId);
		console.log(subscribed);
		if (userId !== subscribed) {
			let subscribedObject = subscribeCollection.findOne({
				userId: userId,
				subscribedUserId: subscribed
			});
			console.log(subscribedObject);

			if (subscribedObject !== undefined) {
				//subscribeCollection.remove(subscribedObject._id);
				Meteor.call('subscribeUserRemove', subscribedObject._id, (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('unsubscribe user remove success!');
					}
				});
				Meteor.call('userSubscribedMinusCount', subscribed, (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('user subscribed count minus success!');
					}
				});
			} else {
				let subscribedObject = {
					userId: userId,
					username: username,
					userpicture: userpicture,
					subscribedUserId: subscribed,
					subscribedUserName: subscribedUsername,
					subscribedPicture: subscribedPicture
				};
				Meteor.call('subscribeUserInsert', subscribedObject, (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('subscribe user insert success!');
					}
				});
				Meteor.call('userSubscribedAddCount', subscribed, (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('user subscribed count add success!');
					}
				});
				let subscribedUserNotificationObject = {
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					userpicture: userpicture,
					videoId: id,
					message: " subscribed you, congratulations",
					submitted: new Date(),
					read: false
				};
				Meteor.call('notificationInsert', subscribedUserNotificationObject, (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('subscribed user insert notification success!');
					}
				});
			}
		} else {
			return;
		}
	}
})