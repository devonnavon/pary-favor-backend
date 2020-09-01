const cardItemLayout = (sequelize, DataTypes) => {
	const CardItemLayout = sequelize.define('cardItemLayout', {
		x: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		y: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		w: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		h: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	CardItemLayout.associate = (models) => {
		CardItemLayout.belongsTo(models.CardItem);
	};

	return CardItemLayout;
};

export default cardItemLayout;
