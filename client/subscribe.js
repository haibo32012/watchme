import { Meteor } from 'meteor/meteor';
import './subscribe.html';

Template.subscribe.events({
'click #subscribe_button':function() {
		let userId = Meteor.userId();
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		let subscribed = file.userId;
		let subscribedId;
		console.log(userId);
		console.log(subscribed);
		if (userId !== subscribed) {
			subscribedId = subscribeCollection.findOne(
				{userId: userId},
				{subscribedUserId: subscribed}
			);
			if (subscribedId) {
				subscribeCollection.remove(subscribedId);
			} else {
				subscribeCollection.insert(
					{userId: userId},
					{subscribedUserId: subscribed}
				);
			}
		} else {
			return;
		}
	}
});