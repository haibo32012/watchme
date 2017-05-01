import { Meteor } from 'meteor/meteor';

var myPostLogout = function() {
    console.log('logout');
    FlowRouter.go('/login');
};

var mySubmit = function(error, state) {
    if(!error) {
        if (state === "signIn") {
            FlowRouter.go('/user');
        }
        if (state === "signUp") {
            let userId = Meteor.userId();
            Meteor.users.update(userId,
                {$set: 
                    {'profile.picture': "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCkbGBYWGDIkJh4pOzQ+PTo0OThBSV5QQUVZRjg5Um9TWWFkaWppP09ze3Jmel5naWX/2wBDARESEhgVGDAbGzBlQzlDZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWX/wAARCAAeACgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDJi1g/8tY8+4q7DqFvIcb9p/2uK5oOPpUgbNBTOuUq4yrA/Q04LXKRzvGfkcj6GrsOrzx4DHcPekSzbYYoqgmrxSDDoVPtRSEcwKcDimUtUWyQSEU8SA9eKhozQSThvSioM0UhH//Z"}
                }
            );
            FlowRouter.go('/user');
        }
    }
};

AccountsTemplates.configure({
	confirmPassword: true,
    enablePasswordChange: true,
    showForgotPasswordLink: true,
    showPlaceholders: true,
    lowercaseUsername: true,
    homeRoutePath: '/',
    redirectTimeout: 4000,
    onLogoutHook: myPostLogout,
    onSubmitHook: mySubmit,
    showLabels: true,
});

AccountsTemplates.addField({
	_id: 'username',
	type: 'text',
	displayName: "Name",
    minLength: 6,
	required: true,
    placeholder: {
        signUp: "This is unique name, can't change"
    },
    func: function(value){
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", value, function(err, userExists) {
                if (!userExists)
                    self.setSuccess();
                else
                    alert("user exist");
                self.setValidating(false);
            });
            return ;
        }
        // server
        return Meteor.call("userExists", value);
    },
    //errStr: 'User has exist already!',
});