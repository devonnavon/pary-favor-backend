import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		eventCard(id: ID!): EventCard!
	}

	extend type Mutation {
		createEventCard(eventId: ID!, size: String!, sortOrder: Int!): EventCard!
		deleteEventCard(id: ID!): Boolean!
		updateEventCard(id: ID!, size: String, sortOrder: Int): EventCard!
	}

	type EventCard {
		id: ID!
		size: String!
		sortOrder: Int!
	}
`;
