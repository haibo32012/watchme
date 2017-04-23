import {Meteor} from 'meteor/meteor';
import './subscribePage.html';

Template.subscribePage.helpers({
	file: function() {
		let subscribeUserId = [];
		let userId = Meteor.userId();
		let subscribeObject = subscribeCollection.find({}, {userId: userId});
		
		
		console.log(subscribeObject.count());
		return;
	}
});