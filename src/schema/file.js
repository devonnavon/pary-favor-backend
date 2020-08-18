import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		getFile: Boolean
	}

	extend type Mutation {
		singleUploadStream(file: Upload!): File!
	}

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}
`;
