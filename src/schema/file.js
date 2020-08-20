import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		getFile(file: String!): Boolean
	}

	extend type Mutation {
		upload(file: Upload!): File!
		signS3(filename: String!, filetype: String!): S3Payload!
	}

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type S3Payload {
		signedRequest: String!
		url: String!
	}
`;
