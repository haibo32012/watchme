

if (Meteor.isClient) {
	Template.registerHelper('DateToISO', (time = 0) => {
   		if (_.isString(time) || _.isNumber(time)) {
      		time = new Date(time);
    	}
    return time.toLocaleDateString();
  	});

  	Template.registerHelper('extless', (filename = '') => {
    const parts = filename.split('.');
    if (parts.length > 1) {
      parts.pop();
    }
    return parts.join('.');
  });
}