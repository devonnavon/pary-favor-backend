import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';
import eventSchema from './event';
import eventCardSchema from './eventCard';
import cardItemSchema from './cardItem';
import cardItemLayoutSchema from './cardItemLayout';

import landingTextSchema from './landingText';

import fileSchema from './file';

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
	cardItemSchema,
	cardItemLayoutSchema,
	landingTextSchema,
	fileSchema,
];
