import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		eventCard(id: ID!): EventCard!
	}

	extend type Mutation {
		createEventCard(eventId: ID!, type: String!, sortOrder: Int!): EventCard!
		deleteEventCard(id: ID!): Boolean!
		updateEventCard(id: ID!, type: String, sortOrder: Int): EventCard!
	}

	type EventCard {
		id: ID!
		type: String!
		sordOrder: Int!
	}
`;
