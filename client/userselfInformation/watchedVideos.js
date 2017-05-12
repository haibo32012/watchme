import { Meteor } from 'meteor/meteor';
import './watchedVideos.html';

Template.watchedVideos.helpers({
	file: function() {
		let userId = Meteor.userId();
		const userWatchedList = userWatchedCollection.find({userId: userId});
		const watchedVideoIdList = userWatchedList.map(doc => doc.videoId);
		return files.find({_id: {$in: watchedVideoIdList}});
	}
});