var myPostLogout = function() {
    console.log('logout');
    FlowRouter.go('/');
};

var mySubmit = function(error, state) {
    if(!error) {
        if (state === "signIn") {
            FlowRouter.go('/user');
        }
        if (state === "signUp") {
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
});

AccountsTemplates.addField({
	_id: 'username',
	type: 'text',
	displayName: "Name",
	required: true,
});