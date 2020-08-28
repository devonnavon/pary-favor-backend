import { gql } from 'apollo-server-express';

export default gql`
	extend type Mutation {
		createCardItem(
			eventCardId: ID!
			type: String!
			options: String
			url: String
			text: String
			sortOrder: Int!
		): CardItem!
		deleteCardItem(id: ID!): Boolean!
		updateCardItem(
			id: ID!
			type: String
			options: String
			url: String
			text: String
			sortOrder: Int
		): CardItem!
	}

	type CardItem {
		id: ID!
		type: String!
		options: String
		url: String
		text: String
		sortOrder: Int!
	}
`;
