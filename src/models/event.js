const event = (sequelize, DataTypes) => {
	const Event = sequelize.define('event', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Empty title',
				},
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		eventDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.NOW,
		},
		published: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			// defaultValue: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});

	Event.associate = (models) => {
		Event.belongsTo(models.User);
	};

	return Event;
};

export default event;
