import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

export default {
	Query: {
		getFile: combineResolvers(
			isAuthenticated,
			async (parent, { file }, { s3 }) => {
				const params = {
					Bucket: 'sorekara',
					Key: file,
				};
				return await s3.getObject(params);
			}
		),
	},
	Mutation: {
		upload: combineResolvers(
			isAuthenticated,
			async (parent, { file }, { s3 }) => {
				const { createReadStream, filename, mimetype } = await file;
				const fileStream = createReadStream();

				const params = {
					Bucket: 'sorekara',
					Key: filename,
					Body: fileStream,
				};
				const result = await s3.upload(params); //.promise();

				console.log(result);

				return file;
			}
		),
	},
};
