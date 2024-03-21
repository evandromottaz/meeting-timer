import AbstractMeeting from "./AbstractMeeting";

export default class ChristianLife extends AbstractMeeting {
	getData(): string | string[] {
		return this.data.christianLife.fields.map(
			({ name, time, pdfText = "", limitTime }) => {
				return `${pdfText} (${limitTime}min): ${name} - Tempo: ${time}`;
			}
		);
	}

	getTitle(): string {
		return "Nossa Vida Cristã";
	}
}
