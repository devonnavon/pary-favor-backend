import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		getFile(file: String!): Boolean
	}

	extend type Mutation {
		upload(file: Upload!): File!
	}

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}
`;
