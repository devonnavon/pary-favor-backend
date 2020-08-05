import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		events: [Event!]!
		event(id: ID!): Event!
	}

	extend type Mutation {
		createEvent(
			title: String!
			description: String
			eventDate: Date
			published: Boolean
			password: String
		): Event!
		deleteEvent(id: ID!): Boolean!
		updateEvent(
			id: ID!
			title: String!
			description: String
			eventDate: Date
			published: Boolean
			password: String
		): Event!
	}

	type Event {
		id: ID!
		title: String!
		description: String
		eventDate: Date
		published: Boolean
		password: String
		user: User!
	}
`;
