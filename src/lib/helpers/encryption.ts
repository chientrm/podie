import { secret } from '$lib/configs/podie.json';
import { EncryptJWT, jwtDecrypt } from 'jose';
import { Buffer } from 'buffer';

const key = Buffer.from(secret, 'base64'),
	encrypt = (data: any) =>
		new EncryptJWT(data)
			.setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
			.encrypt(key),
	decrypt = (jwe: string) => jwtDecrypt(jwe, key).then((res) => res.payload);

export { encrypt, decrypt };
