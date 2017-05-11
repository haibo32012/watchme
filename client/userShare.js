import './userShare.html';

Template.userShare.helpers({
	file: function() {
		let userId = FlowRouter.getParam('_id');
		let shareObject = shareCollection.find({userId: userId});
		const shareVideoIdList = shareObject.map(doc => doc.videoId);
		return files.find({_id: {$in: shareVideoIdList}}, {sort: {'meta.created_at': -1}});
	},
	user: function() {
		let userId = FlowRouter.getParam('_id');
		return Meteor.users.findOne({_id: userId});
	}
});