import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

import { isAdmin } from './authorization';

export default {
	Query: {
		landingTexts: async (parent, args, { models }) => {
			return await models.LandingText.findAll();
		},
		landingText: async (parent, { id }, { models }) => {
			return await models.LandingText.findByPk(id);
		},
	},
	Mutation: {
		createLandingText: combineResolvers(
			isAdmin,
			async (parent, { title, question, answer }, { models }) => {
				return await models.LandingText.create({ title, question, answer });
			}
		),
		deleteLandingText: combineResolvers(
			isAdmin,
			async (parent, { id }, { models }) => {
				return await models.LandingText.destroy({ where: { id } });
			}
		),
		updateLandingText: combineResolvers(
			isAdmin,
			async (parent, { id, title, question, answer }, { models }) => {
				let landingText = await models.LandingText.findByPk(id);
				return await landingText.update({ title, question, answer });
			}
		),
	},
};
