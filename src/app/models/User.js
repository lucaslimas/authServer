const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      telephone: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 8);
          }
        },
      },
    },
  );

  User.prototype.checkPassword = function (pwd) {
    return bcrypt.compare(pwd, this.password);
  };

  User.associate = (models) => {
    User.belongsToMany(models.App, {
      through: 'AppUser',
      foreingKey: 'app_id',
      as: 'apps',
    });
  };

  return User;
};
