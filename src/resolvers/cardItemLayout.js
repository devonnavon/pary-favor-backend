import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
	Mutation: {
		createCardItemLayout: combineResolvers(
			isAuthenticated,
			// isCardItemOwner,
			async (parent, { cardItemId, screen, x, y, w, h }, { models }) => {
				return await models.CardItemLayout.create({
					cardItemId,
					screen,
					x,
					y,
					w,
					h,
				});
			}
		),

		deleteCardItemLayout: combineResolvers(
			isAuthenticated,
			// isCardItemOwner,
			async (parent, { cardItemId }, { models, sequelize }) => {
				//will delete both screen size records
				return await models.CardItemLayout.destroy({ where: { cardItemId } });
			}
		),

		updateCardItemLayout: combineResolvers(
			isAuthenticated,
			// isCardItemOwner,
			async (parent, { layouts }, { models, sequelize }) => {
				return await updateCardItemLayout.bulkCreate(
					{
						layouts,
					},
					{ updateOnDuplicate: ['id'] } //can maybe do cardItemId and screen
				);
			}
		),
	},
};
