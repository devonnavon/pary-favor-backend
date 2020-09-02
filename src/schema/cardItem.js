import { gql } from 'apollo-server-express';

export default gql`
	extend type Mutation {
		createCardItem(
			eventCardId: ID!
			type: String!
			url: String
			text: String
		): CardItem!
		deleteCardItem(id: ID!): Boolean!
		updateCardItem(id: ID!, type: String, url: String, text: String): CardItem!
	}

	type CardItem {
		id: ID!
		type: String
		url: String
		text: String
		layout: [CardItemLayout]
	}
`;
