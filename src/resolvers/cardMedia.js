import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
	Mutation: {
		createCardMedia: combineResolvers(
			isAuthenticated,
			// isCardMediaOwner,
			async (
				parent,
				{ eventCardId, type, options, url, text, sortOrder },
				{ models }
			) => {
				return await models.CardMedia.create({
					eventCardId,
					type,
					options,
					url,
					text,
					sortOrder,
				});
			}
		),

		deleteCardMedia: combineResolvers(
			isAuthenticated,
			// isCardMediaOwner,
			async (parent, { id }, { models }) => {
				return await models.CardMedia.destroy({ where: { id } });
			}
		),

		updateCardMedia: combineResolvers(
			// isAuthenticated,
			// isCardMediaOwner,
			async (
				parent,
				{ id, type, options, url, text, sortOrder },
				{ models }
			) => {
				let cardMedia = await models.CardMedia.findByPk(id);
				return await cardMedia.update({
					id,
					type,
					options,
					url,
					text,
					sortOrder,
				});
			}
		),
	},
};
