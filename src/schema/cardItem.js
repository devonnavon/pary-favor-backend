import { gql } from 'apollo-server-express';

export default gql`
	extend type Mutation {
		createCardItem(
			eventCardId: ID!
			type: String
			url: String
			text: String
			layouts: [layoutInput]
		): CardItem!
		deleteCardItem(id: ID!): Boolean!
		updateCardItem(id: ID!, type: String, url: String, text: String): CardItem!
	}

	input layoutInput {
		screen: String
		x: Int
		y: Int
		w: Int
		h: Int
	}

	type CardItem {
		id: ID!
		type: String
		url: String
		text: String
		layout: [CardItemLayout]
	}
`;
