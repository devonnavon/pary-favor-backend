import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isEventOwner } from './authorization';
// import pubsub, { EVENTS } from '../subscription';

export default {
	Query: {
		events: combineResolvers(
			isAuthenticated,
			async (parent, args, { models, me }) => {
				return await models.Event.findAll({
					order: [['eventDate', 'DESC']],
					where: {
						userId: {
							[Sequelize.Op.eq]: me.id,
						},
					},
				});
			}
		),

		event: combineResolvers(
			isAuthenticated,
			isEventOwner,
			async (parent, { id }, { models }) => {
				return await models.Event.findByPk(id);
			}
		),
	},

	Mutation: {
		createEvent: combineResolvers(
			isAuthenticated,
			async (
				parent,
				{ title, description, eventDate, published, password },
				{ me, models }
			) => {
				return await models.Event.create({
					title,
					description,
					eventDate,
					published,
					password,
					userId: me.id,
				});
			}
		),

		deleteEvent: combineResolvers(
			isAuthenticated,
			isEventOwner,
			async (parent, { id }, { models }) => {
				return await models.Event.destroy({ where: { id } });
			}
		),

		//how to we deal with optional arguments? what if we only want to update one thing?
		updateEvent: combineResolvers(
			isAuthenticated,
			isEventOwner,
			async (
				parent,
				{ id, title, description, eventDate, published, password },
				{ models }
			) => {
				let event = await models.Event.findByPk(id);
				return await event.update({
					title,
					description,
					eventDate,
					published,
					password,
				});
			}
		),
	},

	Event: {
		user: async (event, args, { loaders }) => {
			return await loaders.user.load(event.userId);
		},
		eventCards: async (event, args, { models }) => {
			return await models.EventCard.findAll({
				where: {
					eventId: event.id,
				},
			});
		},
	},
};
