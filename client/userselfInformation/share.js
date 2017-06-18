import files from '/lib/collections/collection.js';
import './share.html';

Template.share.helpers({
	file: function() {
		let userId = Meteor.userId();
		let shareObject = shareCollection.find({userId: userId});
		const shareVideoIdList = shareObject.map(doc => doc.videoId);
		return files.find({_id: {$in: shareVideoIdList}}, {sort: {'meta.created_at': -1}});
	}
});