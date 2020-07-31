import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		landingTexts: [LandingText!]!
		landingText(id: ID!): LandingText!
	}

	extend type Mutation {
		createLandingText(
			title: String!
			question: String!
			answer: String!
		): LandingText!
		deleteLandingText(id: ID!): Boolean!
		updateLandingText(
			id: ID!
			title: String!
			question: String!
			answer: String!
		): LandingText!
	}

	type LandingText {
		id: ID!
		title: String!
		question: String!
		answer: String!
	}
`;
