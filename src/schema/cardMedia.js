import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		cardMedia(id: ID!): CardMedia!
	}

	extend type Mutation {
		createCardMedia(
			eventCardId: ID!
			type: String!
			options: String
			url: String
			text: String
			sortOrder: Int!
		): CardMedia!
		deleteCardMedia(id: ID!): Boolean!
		updateCardMedia(
			id: ID!
			type: String!
			options: String
			url: String
			text: String
			sortOrder: Int!
		): CardMedia!
	}

	type CardMedia {
		id: ID!
		type: String!
		options: String
		url: String
		text: String
		sortOrder: Int!
	}
`;
