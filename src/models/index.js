import Sequelize, { DataTypes } from 'sequelize';
import user from './user';
import message from './message';
import event from './event';
import eventCard from './eventCard';
import cardItem from './cardItem';

import landingText from './landingText';

let sequelize;
if (process.env.DATABASE_URL) {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
	});
} else {
	sequelize = new Sequelize(
		process.env.TEST_DATABASE || process.env.DATABASE,
		process.env.DATABASE_USER,
		process.env.DATABASE_PASSWORD,
		{
			dialect: 'postgres',
			operatorsAliases: 0,
		}
	);
}

const models = {
	User: user(sequelize, DataTypes),
	Message: message(sequelize, DataTypes),
	Event: event(sequelize, DataTypes),
	EventCard: eventCard(sequelize, DataTypes),
	CardItem: cardItem(sequelize, DataTypes),
	LandingText: landingText(sequelize, DataTypes),
};

Object.keys(models).forEach((key) => {
	if ('associate' in models[key]) {
		models[key].associate(models);
	}
});

export { sequelize };
export const Op = Sequelize.Op;

export default models;
