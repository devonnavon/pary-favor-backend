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
			async (parent, { id }, { models, sequelize }) => {
				let card = await models.CardMedia.findByPk(id);
				console.log(card);
				if (!card) return 0;
				await sequelize.query(
					`
					update "cardMedia"
					set "sortOrder" = "sortOrder" - 1
					where "eventCardId"=${card.dataValues.eventCardId}
					and "sortOrder" > ${card.dataValues.sortOrder}
					`
				);
				return await models.CardMedia.destroy({ where: { id } });
			}
		),

		updateCardMedia: combineResolvers(
			isAuthenticated,
			// isCardMediaOwner,
			async (
				parent,
				{ id, type, options, url, text, sortOrder },
				{ models, sequelize }
			) => {
				let cardMedia = await models.CardMedia.findByPk(id);
				if (!sortOrder) {
					return await cardMedia.update({
						id,
						type,
						options,
						url,
						text,
					});
				}
				if (sortOrder > cardMedia.dataValues.sortOrder) {
					let q = await sequelize.query(
						`
						update "cardMedia"
						set "sortOrder" = "sortOrder" - 1
						where "eventCardId"=${cardMedia.dataValues.eventCardId}
						and "sortOrder" <= ${sortOrder}
						and "sortOrder" > ${cardMedia.dataValues.sortOrder}
						`
					);
				} else if (sortOrder < cardMedia.dataValues.sortOrder) {
					console.log('yoyoyo');
					await sequelize.query(
						`
						update "cardMedia"
						set "sortOrder" = "sortOrder" + 1
						where "eventCardId"=${cardMedia.dataValues.eventCardId}
						and "sortOrder" >= ${sortOrder}
						and "sortOrder" < ${cardMedia.dataValues.sortOrder}
						`
					);
				}
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
