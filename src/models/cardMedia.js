const cardMedia = (sequelize, DataTypes) => {
	const CardMedia = sequelize.define('cardMedia', {
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Empty size',
				},
			},
			options: {
				type: DataTypes.JSON,
				allowNull: true,
			},
			url: {
				type: DataTypes.INTEGER,
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
		},
	});

	CardMedia.associate = (models) => {
		CardMedia.belongsTo(models.EventCard);
	};

	return CardMedia;
};

export default cardMedia;
