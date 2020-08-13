import Sequelize from 'sequelize';
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
			async (parent, { id }, { models }) => {
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
