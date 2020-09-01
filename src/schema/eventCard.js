import { gql } from 'apollo-server-express';

export default gql`
	extend type Mutation {
		createEventCard(eventId: ID!, sortOrder: Int!): EventCard!
		deleteEventCard(id: ID!): Boolean!
		updateEventCard(id: ID!, sortOrder: Int): EventCard!
	}

	type EventCard {
		id: ID!
		sortOrder: Int!
		cardItems: [CardItem]
	}
`;
