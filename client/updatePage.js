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
		let id = FlowRouter.getParam('_id');
		// view type of the video
		let viewType = document.querySelector('input[name="viewTypeOfVideo"]:checked').value;
		files.update({_id: id},
			{$set: {
				'meta.viewType': viewType
			}}
		);

		// type of the video price
		let videoIntroduction = e.target.videoIntro.value;
		console.log(videoIntroduction);
		let priceType = document.querySelector('input[name="priceTypeOfVideo"]:checked').value;
		console.log(priceType);
		let priceValue = e.target.videoPrice.value;
		console.log(priceValue);
		
		files.update({_id: id},
			{$set: {
				'meta.introduction': videoIntroduction
			}}
		);
		switch(priceType) {
			case 'freeVideo':
				files.update({_id: id},
					{$set: {
						'meta.priceType': 'freeVideo'
					}}
				);
				break;
			case 'donateVideo':
				files.update({_id: id},
					{$set: {
						'meta.priceType': 'donateVideo'
					}}
				);
				break;
			case 'bargainVideo':
				files.update({_id: id},
					{$set: {
						'meta.priceType': 'bargainVideo',
						'meta.price': priceValue
					}}
				);
				break;
		}
	}
});