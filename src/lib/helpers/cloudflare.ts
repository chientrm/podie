const kv = (record: Record<string, string>) => ({
	get: (key: string) =>
		Promise.resolve(record[key] ? JSON.parse(record[key]) : undefined),
	put: (key: string, value: any) => {
		record[key] = value;
		Promise.resolve();
	}
});

export { kv };
