import AbstractMeeting from "./AbstractMeeting";

export default class FirstComments extends AbstractMeeting {
	getData(): string {
		const { time, pdfText, limitTime } = this.data.comments.initial;
		return `${pdfText} (${limitTime}min): ${time}`;
	}
}
