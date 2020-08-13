import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isEventOwner } from './authorization';

export default {
	Query: {
		eventCard: combineResolvers(
			isAuthenticated,
			// isEventCardOwner,
			async (parent, { id }, { models }) => {
				return await models.EventCard.findByPk(id);
			}
		),
	},

	Mutation: {
		createEventCard: combineResolvers(
			isAuthenticated,
			// isEventCardOwner,
			async (parent, { type, sortOrder }, { me, models }) => {
				return await models.EventCard.create({
					type,
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

		//how to we deal with optional arguments? what if we only want to update one thing?
		updateEvent: combineResolvers(
			isAuthenticated,
			// isEventCardOwner,
			async (parent, { id, type, sortOrder }, { models }) => {
				let eventCard = await models.EventCard.findByPk(id);
				return await eventCard.update({
					type,
					sortOrder,
				});
			}
		),
	},

	// Event: {
	// 	user: async (event, args, { loaders }) => {
	// 		return await loaders.user.load(event.userId);
	// 	},
	// },
};
