import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import http from 'http'; //for subscription setup

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import loaders from './loaders';

const app = express();

app.use(cors());

const getMe = async (req) => {
	const token = req.headers['x-token'];

	if (token) {
		try {
			return await jwt.verify(token, process.env.SECRET);
		} catch (e) {
			throw new AuthenticationError('Your session expired. Sign in again.');
		}
	}
};

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	formatError: (error) => {
		// remove the internal sequelize error message
		// leave only the important validation error
		const message = error.message
			.replace('SequelizeValidationError: ', '')
			.replace('Validation error: ', '');

		return {
			...error,
			message,
		};
	},
	context: async ({ req, connection }) => {
		if (connection) {
			return {
				models,
				loaders: {
					user: new DataLoader((keys) => loaders.user.batchUsers(keys, models)),
				},
			};
		}

		if (req) {
			const me = await getMe(req);
			return {
				models,
				me,
				secret: process.env.SECRET,
				loaders: {
					user: new DataLoader((keys) => loaders.user.batchUsers(keys, models)),
				},
			};
		}
	},
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// const eraseDatabaseOnSync = true;

// sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {

const isTest = !!process.env.TEST_DATABASE;

sequelize.sync({ force: isTest }).then(async () => {
	if (isTest) {
		// if (eraseDatabaseOnSync) {
		createUsersWithMessages(new Date());
	}

	httpServer.listen(process.env.PORT, () =>
		console.log(`Example app listening on port ${process.env.PORT}!`)
	);
});

//DATABASE SEED FUNCITON (CAN REMOVE IN PROD)
const createUsersWithMessages = async (date) => {
	await models.User.create(
		{
			username: 'len',
			email: 'len@noshi.globe',
			password: 'qqqqqqq',
			role: 'ADMIN',
			messages: [
				{
					text: 'yo yo yo',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
		},
		{
			include: [models.Message],
		}
	);

	await models.User.create(
		{
			username: 'dev',
			email: 'dev@noshi.world',
			password: 'qqqqqqq',
			role: 'ADMIN',
			messages: [
				{
					text: 'sharks scare me',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
				{
					text: 'but imma still shred',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
		},
		{
			include: [models.Message],
		}
	);

	await models.User.create(
		{
			username: 'loser',
			email: 'some@loser.whoihate',
			password: 'qqqqqqq',
			messages: [
				{
					text: 'delete me',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
				{
					text: 'I dont want to be here',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
		},
		{
			include: [models.Message],
		}
	);
};
