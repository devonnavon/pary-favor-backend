import Sequelize from 'sequelize';
import user from './user';
import message from './message';

const sequelize = new Sequelize(
	process.env.DATABASE,
	process.env.DATABASE_USER,
	process.env.DATABASE_PASSWORD,
	{
		dialect: 'postgres',
	}
);

const models = {
	User: user(sequelize, Sequelize.DataTypes), //require('./user').default(sequelize, Sequelize), //sequelize.import('./user'),
	Message: message(sequelize, Sequelize.DataTypes), //require('./message').default(sequelize, Sequelize), //sequelize.import('./message'),
};

Object.keys(models).forEach((key) => {
	if ('associate' in models[key]) {
		models[key].associate(models);
	}
});

export { sequelize };

export default models;
