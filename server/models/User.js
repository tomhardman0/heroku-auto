const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    appName: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.BOOLEAN
    }
}, {
  freezeTableName: true
});

User.sync({force: true}).then(function () {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});
