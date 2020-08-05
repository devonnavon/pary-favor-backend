import { GraphQLDateTime } from 'graphql-iso-date';
import userResolvers from './user';
import messageResolvers from './message';
import eventResolvers from './event';
import landingTextResolvers from './landingText';

const customScalarResolver = {
	Date: GraphQLDateTime,
};

export default [
	customScalarResolver,
	userResolvers,
	messageResolvers,
	eventResolvers,
	landingTextResolvers,
];
