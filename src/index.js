import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { v4 as uuid } from 'uuid';

const app = express();

app.use(cors());

const schema = gql`
	type Query {
		users: [User!]
		me: User
		user(id: ID!): User

		messages: [Message!]!
		message(id: ID!): Message!
	}
	type Mutation {
		createMessage(text: String!): Message!
	}
	type User {
		id: ID!
		username: String!
		messages: [Message!]
	}

	type Message {
		id: ID!
		text: String!
		user: User!
	}
`;

let messages = {
	1: {
		id: '1',
		text: 'Hello World',
		userId: '1',
	},
	2: {
		id: '2',
		text: 'By World',
		userId: '2',
	},
};

let users = {
	1: {
		id: '1',
		username: 'Robin Wieruch',
		messageIds: [1],
	},
	2: {
		id: '2',
		username: 'Dave Davids',
		messageIds: [2],
	},
};

const me = users[1];

const resolvers = {
	Query: {
		users: () => {
			return Object.values(users);
		},
		user: (parent, { id }) => {
			return users[id];
		},
		me: (parent, args, { me }) => {
			return me;
		},
		messages: () => {
			return Object.values(messages);
		},
		message: (parent, { id }) => {
			return messages[id];
		},
	},
	Mutation: {
		createMessage: (parent, { text }, { me }) => {
			const id = uuid();
			const message = {
				id,
				text,
				userId: me.id,
			};
			messages[id] = message;
			users[me.id].messageIds.push(id);
			return message;
		},
	},
	User: {
		messages: (user) => {
			return Object.values(messages).filter(
				(message) => message.userId === user.id
			);
		},
	},
	Message: {
		user: (parent) => {
			return users[parent.userId];
		},
	},
	// User: {
	// 	username: (user) => `${user.firstname} ${user.lastname}`,
	// },
};

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context: {
		me: users[1],
	},
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
	console.log('Apollo Server on http://localhost:8000/graphql');
});
