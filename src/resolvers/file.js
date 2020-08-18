import { combindResolvers } from 'graphql-resolvers';

export default {
	Mutation: {
		singleUploadStream: async (parent, args, { s3 }) => {
			const file = await args.file;
			const { createReadStream, filename, mimetype } = file;
			const fileStream = createReadStream();

			//Here stream it to S3
			// Enter your bucket name here next to "Bucket: "
			const uploadParams = {
				Bucket: 'apollo-file-upload-test',
				Key: filename,
				Body: fileStream,
			};
			const result = await s3.upload(uploadParams).promise();

			console.log(result);

			return file;
		},
	},
};
