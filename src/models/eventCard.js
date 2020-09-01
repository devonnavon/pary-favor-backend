const eventCard = (sequelize, DataTypes) => {
	const EventCard = sequelize.define('eventCard', {
		sortOrder: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	EventCard.associate = (models) => {
		EventCard.belongsTo(models.Event);
	};

	EventCard.associate = (models) => {
		EventCard.hasMany(models.CardItem, { onDelete: 'CASCADE' });
	};

	return EventCard;
};

export default eventCard;
