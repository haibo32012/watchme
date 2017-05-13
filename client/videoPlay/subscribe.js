import { Meteor } from 'meteor/meteor';
import './subscribe.html';

Template.subscribe.helpers({
	user: function() {
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		let subscribed = file.userId;
		console.log(Meteor.users.findOne({_id: subscribed}));
		return Meteor.users.findOne({_id: subscribed});
	}
});

Template.subscribe.events({
'click #subscribe_button':function() {
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
		let subscribedUsername = file.meta.username;
		let subscribedPicture = file.meta.userPicture;
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
				subscribeCollection.remove(subscribedObject._id);
				Meteor.users.update(subscribed,
					{$inc: {
						'profile.subscribe_count': -1
					}},
				);
			} else {
				let subscribedObject = {
					userId: userId,
					username: username,
					userpicture: userpicture,
					subscribedUserId: subscribed,
					subscribedUserName: subscribedUsername,
					subscribedPicture: subscribedPicture
				};
				subscribeCollection.insert(subscribedObject);
				Meteor.users.update(subscribed,
					{$inc: {
						'profile.subscribe_count': 1
					}},
				);
				Notifications.insert({
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					userpicture: userpicture,
					videoId: id,
					message: " subscribed you, congratulations",
					submitted: new Date(),
					read: false
				});
				console.log("notification insert success!");
			}
		} else {
			return;
		}
	}
});