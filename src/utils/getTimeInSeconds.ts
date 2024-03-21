export function getTimeInSeconds(time?: string | null) {
	if (typeof time !== "string") return 0;

	const [minutes = "0", seconds = "0"] = time.split(":");
	return +minutes * 60 + +seconds;
}
