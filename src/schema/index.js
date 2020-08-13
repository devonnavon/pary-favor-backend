import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';
import eventSchema from './event';
import eventCardSchema from './eventCard';
import cardMediaSchema from './cardMedia';

import landingTextSchema from './landingText';

const linkSchema = gql`
	scalar Date

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}
`;

export default [
	linkSchema,
	userSchema,
	messageSchema,
	eventSchema,
	eventCardSchema,
	landingTextSchema,
	cardMediaSchema,
];
