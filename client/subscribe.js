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
		let userId = Meteor.userId();
		if (userId === null) {
			alert("Please login");
			return ;
		}
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		let subscribed = file.userId;
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
					subscribedUserId: subscribed
				};
				subscribeCollection.insert(subscribedObject);
				Meteor.users.update(subscribed,
					{$inc: {
						'profile.subscribe_count': 1
					}},
				);
			}
		} else {
			return;
		}
	}
});