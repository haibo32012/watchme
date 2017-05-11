import { Meteor } from 'meteor/meteor';
import './userLike.html';


Template.userLike.helpers({
	file: function() {
		
		let userId = FlowRouter.getParam('_id');
		let userLikeVideoList = UserLikeCollection.find({userId: userId, isLike: true});
		const userLikeVideoIdList = userLikeVideoList.map(doc => doc.videoId);
		return files.find({_id: {$in: userLikeVideoIdList}}, {sort: {'meta.created_at': -1}});
	},
	user: function() {
		let userId = FlowRouter.getParam('_id');
		return Meteor.users.findOne({_id: userId});
	}
});