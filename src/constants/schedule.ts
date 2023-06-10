const name = { name: "" };
const time = { time: "" };
const advice = { advice: "" };
export const values = { ...name, ...time };
export const ministryField = { ...values, ...advice };

export const meetingSchedule = {
	president: "",
	initialComments: "",
	treasures: [
		{ placeholder: "Orador", ...values },
		{ placeholder: "Dirigente", ...values },
	],
	ministryField: [ministryField],
	christianLife: [values],
	bibleStudy: values,
	finalComments: "",
};
