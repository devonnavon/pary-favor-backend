import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
	Mutation: {
		createCardItem: combineResolvers(
			isAuthenticated,
			// isCardItemOwner,
			async (
				parent,
				{ eventCardId, type, options, url, text, sortOrder },
				{ models }
			) => {
				return await models.CardItem.create({
					eventCardId,
					type,
					options,
					url,
					text,
					sortOrder,
				});
			}
		),

		deleteCardItem: combineResolvers(
			isAuthenticated,
			// isCardItemOwner,
			async (parent, { id }, { models, sequelize }) => {
				let card = await models.CardItem.findByPk(id);
				if (!card) return 0;
				await sequelize.query(
					`
					update "cardItem"
					set "sortOrder" = "sortOrder" - 1
					where "eventCardId"=${card.dataValues.eventCardId}
					and "sortOrder" > ${card.dataValues.sortOrder}
					`
				);
				return await models.CardItem.destroy({ where: { id } });
			}
		),

		updateCardItem: combineResolvers(
			isAuthenticated,
			// isCardItemOwner,
			async (
				parent,
				{ id, type, options, url, text, sortOrder },
				{ models, sequelize }
			) => {
				let cardItem = await models.CardItem.findByPk(id);
				if (!sortOrder) {
					return await cardItem.update({
						id,
						type,
						options,
						url,
						text,
					});
				} else if (sortOrder > cardItem.dataValues.sortOrder) {
					await sequelize.query(
						`
						update "cardItem"
						set "sortOrder" = "sortOrder" - 1
						where "eventCardId"=${cardItem.dataValues.eventCardId}
						and "sortOrder" <= ${sortOrder}
						and "sortOrder" > ${cardItem.dataValues.sortOrder}
						`
					);
				} else if (sortOrder < cardItem.dataValues.sortOrder) {
					await sequelize.query(
						`
						update "cardItem"
						set "sortOrder" = "sortOrder" + 1
						where "eventCardId"=${cardItem.dataValues.eventCardId}
						and "sortOrder" >= ${sortOrder}
						and "sortOrder" < ${cardItem.dataValues.sortOrder}
						`
					);
				}
				return await cardItem.update({
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
