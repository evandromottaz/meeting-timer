import { Context, createContext, useEffect, useState } from "react";

const fixTimeUnits = (units: number) => (units < 10 ? `0${units}` : units);

function formatTime(timeInSeconds: number) {
	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = timeInSeconds % 60;
	const labelMinutes = fixTimeUnits(minutes);

	return `${labelMinutes}:${fixTimeUnits(seconds)}`;
}

const useTimer = () => {
	const [start, setStart] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const label = formatTime(seconds);

	useEffect(() => {
		if (!start) return;
		formatTime(seconds);

		const interval = setInterval(() => {
			setSeconds((prev) => prev + 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [seconds, start]);

	return {
		label,
		setStart,
		start,
	};
};

export default useTimer;
