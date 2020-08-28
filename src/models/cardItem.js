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
		options: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		sortOrder: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	CardItem.associate = (models) => {
		CardItem.belongsTo(models.EventCard);
	};

	return CardItem;
};

export default cardItem;
