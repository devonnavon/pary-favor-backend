// import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
	Mutation: {
		createEventCard: combineResolvers(
			isAuthenticated,
			// isEventCardOwner,
			async (parent, { eventId, size, sortOrder }, { models }) => {
				return await models.EventCard.create({
					eventId,
					size,
					sortOrder,
				});
			}
		),

		deleteEventCard: combineResolvers(
			isAuthenticated,
			// isEventCardOwner,
			async (parent, { id }, { models, sequelize }) => {
				let card = await models.EventCard.findByPk(id);
				if (!card) return 0;
				let q = await sequelize.query(
					`
					update "eventCards"
					set "sortOrder" = "sortOrder" - 1
					where "eventId"=${card.dataValues.eventId}
					and "sortOrder" > ${card.dataValues.sortOrder}
					`
				);
				return await models.EventCard.destroy({ where: { id } });
			}
		),

		updateEventCard: combineResolvers(
			isAuthenticated,
			// isEventCardOwner,
			async (parent, { id, size, sortOrder }, { models }) => {
				let eventCard = await models.EventCard.findByPk(id);
				return await eventCard.update({
					size,
					sortOrder,
				});
			}
		),
	},

	EventCard: {
		cardMedia: async (eventCard, args, { models }) => {
			return await models.CardMedia.findAll({
				where: {
					eventCardId: eventCard.id,
				},
			});
		},
	},
};
