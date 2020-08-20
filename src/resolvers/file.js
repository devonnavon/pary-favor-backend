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
		signS3: combineResolvers(
			isAuthenticated,
			async (parent, { filename, filetype }, { s3 }) => {
				const s3bucket = 'sorekara';
				const params = {
					Bucket: s3bucket,
					Key: filename,
					Expires: 60,
					ContentType: filetype,
					ACL: 'public-read',
				};
				const signedRequest = await s3.getSignedUrl('putObject', params);
				const url = `https://${s3bucket}.s3.amazonaws.com/${filename}`;

				return {
					signedRequest,
					url,
				};
			}
		),

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
