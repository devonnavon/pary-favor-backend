import models, { sequelize } from '../models';

const createLandingPageContent = async () => {
	await models.LandingText.create({
		title: 'the space',
		question: 'The space? A unique environment to associate it to?',
		answer:
			'Curate your post event space just as you would the event itself. Choose fonts, colors, background images, layouts, and more!',
	});
	await models.LandingText.create({
		title: 'the artifacts',
		question:
			'Is it social? Seeing expected and unexpected people, making friends, and having side conversations.',
		answer:
			'A place to hold all “things” related to your event. Further readings, slides, songs, recordings, pictures, merch, it’s up to you.',
	});
	await models.LandingText.create({
		title: 'the social',
		question: 'Or is it simply the intimacy of gathering collectively.',
		answer:
			'Encourage connections within your audience. Facilitate further discussion, exchanging of contact info, and hopefully the creation of smaller, tighter knit communities.',
	});
	await models.LandingText.create({
		title: 'the host connection',
		question: 'Artifacts? Whether it be pictures, merch, wristbands, and etc.',
		answer:
			'Engagement with your audience doesn’t have to end when the event does. Share thoughts, have conversations, make friends!',
	});
	await models.LandingText.create({
		title: 'the collective intimacy',
		question: 'Connection to the artist or organizer?',
		answer:
			'Ultimately, sorekara aims to provide a space where you can revel in the post event glow with your community of like-minded folks.',
	});
};

const createUsersWithMessages = async (date) => {
	await models.User.create(
		{
			username: 'len',
			email: 'len@noshi.globe',
			password: 'qqqqqqq',
			role: 'ADMIN',
			messages: [
				{
					text: 'yo yo yo',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
		},
		{
			include: [models.Message],
		}
	);

	await models.User.create(
		{
			username: 'dev',
			email: 'dev@noshi.world',
			password: 'qqqqqqq',
			role: 'ADMIN',
			messages: [
				{
					text: 'sharks scare me',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
				{
					text: 'but imma still shred',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
		},
		{
			include: [models.Message],
		}
	);

	await models.User.create(
		{
			username: 'loser',
			email: 'some@loser.whoihate',
			password: 'qqqqqqq',
			messages: [
				{
					text: 'delete me',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
				{
					text: 'I dont want to be here',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
		},
		{
			include: [models.Message],
		}
	);
};

export default { createUsersWithMessages, createLandingPageContent };
