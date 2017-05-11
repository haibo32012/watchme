import { Meteor } from 'meteor/meteor';
import './watchedVideos.html';

Template.watchedVideos.helpers({
	file: function() {
		let userId = Meteor.userId();
		return userWatchedCollection.find({userId: userId});
	}
});