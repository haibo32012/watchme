import files from '/lib/collections/collection.js';
import './videoList.html';

Template.videoList.helpers({
	file: function() {
		return files.find({});
	},
	videoCount: function() {
		return files.find().count();
	},
	canshow: function() {
		let user = Meteor.user();
		if (user.profile.role === 'admin') {
			return true;
		} else {
			return false;
		}
	}
});