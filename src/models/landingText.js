const landingText = (sequelize, DataTypes) => {
	const LandingText = sequelize.define('landingText', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Empty Title',
				},
			},
		},
		question: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Empty Question',
				},
			},
		},
		answer: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Empty Answer',
				},
			},
		},
	});

	return LandingText;
};

export default landingText;
