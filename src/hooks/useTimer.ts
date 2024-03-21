import { Context, createContext, useEffect, useState } from "react";
import { getTimeInSeconds } from "../utils/getTimeInSeconds";

const fixTimeUnits = (units: number) => (units < 10 ? `0${units}` : units);

function formatTime(timeInSeconds: number) {
	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = timeInSeconds % 60;
	const labelMinutes = fixTimeUnits(minutes);

	return `${labelMinutes}:${fixTimeUnits(seconds)}`;
}

interface useTimerProps {
	defaultTime?: string;
}

const useTimer = ({ defaultTime = "" }: useTimerProps) => {
	const [start, setStart] = useState(false);
	const [seconds, setSeconds] = useState(getTimeInSeconds(defaultTime));
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
