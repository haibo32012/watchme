import { Meteor } from 'meteor/meteor';
import files from '/lib/collections/collection.js';
import UserLikeCollection from '/lib/collections/userLikeCollection.js';
import './userLikeVideos.html';


Template.userLikeVideos.helpers({
	file: function() {
		
		let userId = Meteor.userId();
		let userLikeVideoList = UserLikeCollection.find({userId: userId, isLike: true});
		const userLikeVideoIdList = userLikeVideoList.map(doc => doc.videoId);
		return files.find({_id: {$in: userLikeVideoIdList}}, {sort: {'meta.created_at': -1}});
	}
});

