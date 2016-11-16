const keystone = require('keystone');

const queryUsers = () => {
		const User = keystone.list('User').model;
		const userQuery = User.find();
		userQuery.exec(createNewAdmin);
};

const createNewAdmin = (err, users) => {
	const User = keystone.list('User').model;

	if (err) console.error('Error creating admin user');
	else if (users.length === 0) {
		const user = new User({
			name: {
				first: 'Tom',
				last: 'Hardman'
			},
			email: 'tomhardman0@gmail.com',
			password: 'password',
			isAdmin: true
		});

		user.save(function (err) {
			if (err) console.log(err);
			else console.log(user);
		});
	}
}

exports = module.exports = {
	newAdmin: queryUsers
}
