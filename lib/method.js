

Meteor.methods({
	videoUserPicture(userId, data) {
		//console.log(userId);
		//console.log(data);
		var test = files.update({userId: userId},
			{$set: {
				'meta.userPicture': data
			}},
			{multi: true}
		);
		//console.log(test);
	},
	userExists(username) {
		return !!Meteor.users.findOne({username: username});
	}
});