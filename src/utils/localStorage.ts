import { MeetingSchedule } from "../types/meetingSchedule";

const sharedMeetingKey = "meeting-timer-shared";
const updatedMeetingKey = "meeting-timer-updated";
const legacyMeetingKey = "meeting-timer";
const weekendMeetingKey = "meeting-timer-weekend";

export function cacheMeetingTimer(data: MeetingSchedule, weekend: boolean) {
	localStorage.setItem(weekend ? weekendMeetingKey : sharedMeetingKey, JSON.stringify(data));
}

export function loadMeetingTimer(updated: boolean, weekend: boolean): MeetingSchedule | null {
	const previousKeys = updated ? [updatedMeetingKey, legacyMeetingKey] : [legacyMeetingKey, updatedMeetingKey];
	const keys = weekend ? [weekendMeetingKey] : [sharedMeetingKey, ...previousKeys];
	for (const key of keys) {
		const savedMeeting = localStorage.getItem(key);
		if (savedMeeting) return JSON.parse(savedMeeting);
	}
	return null;
}
