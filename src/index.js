import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();

app.use(cors());

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context: {
		models,
		//me: models.users[1],
	},
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
	if (eraseDatabaseOnSync) {
		createUsersWithMessages();
	}

	app.listen(process.env.PORT, () =>
		console.log(`Example app listening on port ${process.env.PORT}!`)
	);
});

const createUsersWithMessages = async () => {
	await models.User.create(
		{
			username: 'rwieruch',
			messages: [
				{
					text: 'Published the Road to learn React',
				},
			],
		},
		{
			include: [models.Message],
		}
	);

	await models.User.create(
		{
			username: 'ddavids',
			messages: [
				{
					text: 'Happy to release ...',
				},
				{
					text: 'Published a complete ...',
				},
			],
		},
		{
			include: [models.Message],
		}
	);
};
