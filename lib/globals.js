

if (Meteor.isClient) {
	Template.registerHelper('DateToISO', (time = 0) => {
   		if (_.isString(time) || _.isNumber(time)) {
      		time = new Date(time);
    	}
    return time.toLocaleDateString();
  	});
}