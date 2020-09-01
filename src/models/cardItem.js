const cardItem = (sequelize, DataTypes) => {
	const CardItem = sequelize.define('cardItem', {
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Empty type',
				},
			},
		},
		url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	});

	CardItem.associate = (models) => {
		CardItem.belongsTo(models.EventCard);
	};

	return CardItem;
};

export default cardItem;
