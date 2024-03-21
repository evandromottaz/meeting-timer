import AbstractMeeting from "./AbstractMeeting";

export default class Treasures extends AbstractMeeting {
	getData(): string | string[] {
		const treasures = Object.values(this.data.treasures);
		return treasures.map(({ pdfText = "", name = "", time = "", limitTime }) => {
			return `${pdfText} (${limitTime}min): ${
				name ? `${name} - ` : ""
			}Tempo: ${time}`;
		});
	}

	getTitle(): string {
		return "Tesouros da Palavra de Deus";
	}
}
