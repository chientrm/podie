import {
	client_email as email,
	private_key,
	token_uri
} from '$lib/configs/cloud.json';
import { importPKCS8, SignJWT } from 'jose';

const grant_type = 'urn:ietf:params:oauth:grant-type:jwt-bearer';

export const getAuth = (scopes: string[]) =>
	importPKCS8(private_key, 'RS256')
		.then((key) =>
			new SignJWT({ scope: scopes.join(' ') })
				.setProtectedHeader({ alg: 'RS256' })
				.setIssuedAt()
				.setIssuer(email)
				.setAudience(token_uri)
				.setExpirationTime('5s')
				.sign(key)
		)
		.then((assertion) =>
			fetch(token_uri, {
				method: 'post',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({ grant_type, assertion })
			})
		)
		.then((res) => res.json())
		.then((data) => data.access_token as string)
		.then((token) => ({ Authorization: `Bearer ${token}` }));
