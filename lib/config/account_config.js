AccountsTemplates.configure({
	confirmPassword: true,
    enablePasswordChange: true,
    showForgotPasswordLink: true,
    showPlaceholders: true,
    lowercaseUsername: true,
    homeRoutePath: '/',
    redirectTimeout: 4000,
});

AccountsTemplates.addField({
	_id: 'username',
	type: 'text',
	displayName: "Name",
	required: true,
});