import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
	Mutation: {
		createCardItem: combineResolvers(
			isAuthenticated,
			// isCardItemOwner,
			async (parent, { eventCardId, type, url, text }, { models }) => {
				return await models.CardItem.create({
					eventCardId,
					type,
					url,
					text,
				});
			}
		),

		deleteCardItem: combineResolvers(
			isAuthenticated,
			// isCardItemOwner,
			async (parent, { id }, { models, sequelize }) => {
				return await models.CardItem.destroy({ where: { id } });
			}
		),

		updateCardItem: combineResolvers(
			isAuthenticated,
			// isCardItemOwner,
			async (parent, { id, type, url, text }, { models, sequelize }) => {
				let cardItem = await models.CardItem.findByPk(id);
				return await cardItem.update({
					id,
					type,

					url,
					text,
				});
			}
		),
	},
};
