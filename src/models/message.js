const message = (sequelize, DataTypes) => {
	const Message = sequelize.define('message', {
		text: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Empty Message',
				},
			},
		},
	});

	Message.associate = (models) => {
		Message.belongsTo(models.User);
	};

	return Message;
};

export default message;
