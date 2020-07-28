import { v4 as uuidv4 } from 'uuid';

export default {
	Query: {
		messages: async (parent, args, { models }) => {
			return await models.Message.findAll();
		},
		message: async (parent, { id }, { models }) => {
			return await models.Message.findByPk(id);
		},
	},

	Mutation: {
		createMessage: async (parent, { text }, { me, models }) => {
			try {
				return await models.Message.create({
					text,
					userId: me.id,
				});
			} catch (error) {
				throw new Error(error);
			}
		},

		deleteMessage: async (parent, { id }, { models }) => {
			return await models.Message.destroy({ where: { id } });
		},

		updateMessage: async (parent, { id, text }, { models }) => {
			let message = await models.Message.findByPk(id);
			return await message.update({ text });
		},
	},

	Message: {
		user: async (message, args, { models }) => {
			return await models.User.findByPk(message.userId);
		},
	},
};
