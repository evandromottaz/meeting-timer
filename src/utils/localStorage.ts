import { FormValuesProps } from "../types/meetingSchedule";

export function cacheMeetingTimer(data: object) {
	if (!data) return;

	localStorage.setItem("meeting-timer", JSON.stringify(data));
}

export function loadMeetingTimer(): FormValuesProps | null {
	const strMeetingTimer = localStorage.getItem("meeting-timer");
	if (!strMeetingTimer) return null;

	return JSON.parse(strMeetingTimer);
}

export function removeCacheMeetingTimer() {
	localStorage.removeItem("meeting-timer");
}
