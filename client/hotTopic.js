import './hotTopic.html';

Template.hotTopic.onCreated(function() {
	let self = this;
	self.autorun(function() {
		
		self.subscribe('files.all');
	});
});

Template.hotTopic.helpers({
	file: function() {
		return files.find({"meta.view_count": {"$gte": 30}}, {sort: {"meta.created_at": -1}});
	}
});