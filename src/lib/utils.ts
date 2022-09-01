const check_ok = async (res: Response) => {
	if (!res.ok) {
		const { status, statusText } = res,
			text = await res.text();
		throw new Error(JSON.stringify({ status, statusText, text }));
	}
	return res;
};

export { check_ok };
