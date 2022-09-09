const kv = (record: Record<string, string>) => ({
		get: (key: string) =>
			Promise.resolve(record[key] ? JSON.parse(record[key]) : undefined),
		put: (key: string, value: any) => {
			record[key] = value;
			Promise.resolve();
		}
	}),
	get = <T>(kv: KVNamespace, table: string, key: string) =>
		kv.get<T>(`${table}-${key}`, 'json'),
	put = (kv: KVNamespace, table: string, key: string, value: any) =>
		kv.put(`${table}-${key}`, JSON.stringify(value)),
	SSH_KEYS = 'ssh_keys',
	get_ssh_keys = async (kv: KVNamespace, key: string) =>
		(await get<Podie.SshKeys>(kv, SSH_KEYS, key)) || {},
	put_ssh_keys = (kv: KVNamespace, key: string, value: Podie.SshKeys) =>
		put(kv, SSH_KEYS, key, value),
	INSTANCES = 'instances',
	get_instances = async (kv: KVNamespace, key: string) =>
		(await get<Podie.Instances>(kv, INSTANCES, key)) || {},
	put_instances = (kv: KVNamespace, key: string, value: Podie.Instances) =>
		put(kv, INSTANCES, key, value),
	LET_US_KNOW = 'let_us_know',
	put_let_us_know = (kv: KVNamespace, key: string, value: string) =>
		put(kv, LET_US_KNOW, key, value);
export {
	kv,
	get_ssh_keys,
	put_ssh_keys,
	get_instances,
	put_instances,
	put_let_us_know
};
