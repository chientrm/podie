import secret from '$lib/configs/podie.pem?raw';
import { EncryptJWT, importPKCS8, jwtDecrypt } from 'jose';

const check_ok = (res: Response) => {
		if (!res.ok) {
			throw res;
		}
		return res;
	},
	alg = 'RSA-OAEP',
	key = importPKCS8(secret, alg),
	encrypt = async (data: any) =>
		new EncryptJWT(data)
			.setProtectedHeader({ alg, enc: 'A256GCM' })
			.encrypt(await key),
	decrypt = async (jwt: string) =>
		jwtDecrypt(jwt, await key).then((res) => res.payload);

export { check_ok, encrypt, decrypt };
