import { FormValuesProps } from "../types/meetingSchedule";
import AbstractMeeting from "./AbstractMeeting";

export default class LastComments extends AbstractMeeting {
	data: FormValuesProps;

	constructor(data: FormValuesProps) {
		super(data);
		this.data = data;
	}

	getData(): string {
		const { time, pdfText, limitTime } = this.data.comments.end;
		return `${pdfText} (${limitTime}min): ${time}`;
	}

	getTitle(): string {
		return " ";
	}
}
