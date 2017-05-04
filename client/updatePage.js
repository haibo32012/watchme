import { Meteor } from 'meteor/meteor';
import './updatePage.html';

Template.updatePage.helpers({
	file: function() {
		let id = FlowRouter.getParam('_id');
		return files.findOne({_id: id}) || {};
	},
	canShow: function() {
		let id = FlowRouter.getParam('_id');
		let video = files.findOne({_id: id}) || {};
		if (video.userId === Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	}
});

Template.updatePage.events({
	'submit #videoUpdate': function(e) {
		e.preventDefault();
		let videoIntroduction = e.target.videoIntro.value;
		console.log(videoIntroduction);
		let priceType = document.querySelector('input[name="priceTypeOfVideo"]:checked').value;
		console.log(priceType);
		let priceValue = e.target.videoPrice.value;
		console.log(priceValue);
	}
});