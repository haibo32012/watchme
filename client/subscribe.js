import { Meteor } from 'meteor/meteor';
import './subscribe.html';

Template.subscribe.events({
'click #subscribe_button':function() {
		let userId = Meteor.userId();
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
			} else {
				let subscribedObject = {
					userId: userId,
					subscribedUserId: subscribed
				};
				subscribeCollection.insert(subscribedObject);
			}
		} else {
			return;
		}
	}
});