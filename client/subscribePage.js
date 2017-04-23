import {Meteor} from 'meteor/meteor';
import './subscribePage.html';

Template.subscribePage.helpers({
	file: function() {
		let userId = Meteor.userId();
		let subscribeObject = subscribeCollection.find({userId: userId});
		
		console.log(subscribeObject);
		return;
	}
});