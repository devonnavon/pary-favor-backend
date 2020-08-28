import { GraphQLDateTime } from 'graphql-iso-date';
import userResolvers from './user';
import messageResolvers from './message';
import eventResolvers from './event';
import eventCardResolvers from './eventCard';
import cardItemResolvers from './cardItem';

import landingTextResolvers from './landingText';

import fileResolvers from './file';

const customScalarResolver = {
	Date: GraphQLDateTime,
};

export default [
	customScalarResolver,
	userResolvers,
	messageResolvers,
	eventResolvers,
	eventCardResolvers,
	cardItemResolvers,
	landingTextResolvers,
	fileResolvers,
];
