const cardItem = (sequelize, DataTypes) => {
	const CardItem = sequelize.define('cardItem', {
		type: {
			type: DataTypes.STRING,
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
	});

	CardItem.associate = (models) => {
		CardItem.belongsTo(models.EventCard);
	};

	CardItem.associate = (models) => {
		CardItem.hasMany(models.CardItemLayout, { onDelete: 'CASCADE' });
	};

	return CardItem;
};

export default cardItem;
