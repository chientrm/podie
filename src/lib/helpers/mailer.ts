import config from '$lib/configs/mailer.json';
import { getAuth } from './cloud';

export const send = (to: string, subject: string, text: string) =>
	getAuth([
		'https://mail.google.com/',
		'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
		'https://www.googleapis.com/auth/gmail.modify',
		'https://www.googleapis.com/auth/gmail.compose',
		'https://www.googleapis.com/auth/gmail.send'
	]).then((auth) =>
		fetch('https://gmail.googleapis.com/gmail/v1/users/chientrm%40gmail.com/messages/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...auth
			},
			body: JSON.stringify({
				raw: Buffer.from(
					`From: ${config.email}
To: ${to}
Subject: ${subject} 
Date: ${new Date().toISOString()}

${text}
		`,
					'utf-8'
				).toString('base64')
			})
		})
	);
