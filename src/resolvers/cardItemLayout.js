import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
	Mutation: {
		updateCardItemLayout: combineResolvers(
			isAuthenticated,
			// isCardItemOwner,
			async (parent, { layouts }, { models, sequelize }) => {
				console.log(layouts);
				const arr = await models.CardItemLayout.bulkCreate(
					layouts,
					{
						updateOnDuplicate: ['x', 'y', 'w', 'h'],
					} //can maybe do cardItemId and screen
				);
				return arr;
			}
		),
	},
};
