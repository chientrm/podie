const check_ok = (res: Response) => {
	if (!res.ok) {
		throw res;
	}
	return res;
};

export { check_ok };
