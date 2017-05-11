import { Meteor } from 'meteor/meteor';
import './userLikeVideos.html';


Template.userLikeVideos.helpers({
	file: function() {
		
		let userId = Meteor.userId();
		let userLikeVideoList = UserLikeCollection.find({userId: userId, isLike: true});
		const userLikeVideoIdList = userLikeVideoList.map(doc => doc.videoId);
		return files.find({_id: {$in: userLikeVideoIdList}}, {sort: {'meta.created_at': -1}});
	}
});
