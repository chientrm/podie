const check_ok = async (res: Response) => {
	if (!res.ok) {
		const { status, statusText } = res,
			text = await res.text();
		throw new Error(JSON.stringify({ status, statusText, text }));
	}
	return res;
};

// https://dev.to/jsmccrumb/asynchronous-setinterval-4j69
const asyncIntervals: boolean[] = [];

const runAsyncInterval = async (
	cb: () => Promise<void>,
	interval: number,
	intervalIndex: number
) => {
	await cb();
	if (asyncIntervals[intervalIndex]) {
		setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval);
	}
};

const setAsyncInterval = (cb: () => Promise<void>, interval: number) => {
	if (cb && typeof cb === 'function') {
		const intervalIndex = asyncIntervals.length;
		asyncIntervals.push(true);
		runAsyncInterval(cb, interval, intervalIndex);
		return intervalIndex;
	} else {
		throw new Error('Callback must be a function');
	}
};

const clearAsyncInterval = (intervalIndex: number) => {
	if (asyncIntervals[intervalIndex]) {
		asyncIntervals[intervalIndex] = false;
	}
};

export { check_ok, setAsyncInterval, clearAsyncInterval };
