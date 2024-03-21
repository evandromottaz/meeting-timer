import { FormValuesProps } from "../types/meetingSchedule";

export const meetingSchedule: FormValuesProps = {
	meeting: {
		start: {
			pdfText: "Horário que a reunião começou",
			time: "",
		},
		end: {
			pdfText: "Horário que a reunião acabou",
			time: "",
		},
	},
	president: { pdfText: "Presidente", name: "" },
	comments: {
		initial: {
			pdfText: "Comentários Iniciais",
			time: "",
			limitTime: "1",
		},
		end: {
			pdfText: "Comentários Finais",
			time: "",
			limitTime: "3",
		},
	},
	treasures: {
		treasure: {
			pdfText: "Orador",
			name: "",
			time: "",
			limitTime: "10",
		},
		findTreasures: {
			pdfText: "Encontre Joias Espirituais",
			name: "",
			time: "",
			limitTime: "10",
		},
	},
	ministryField: {
		template: {
			pdfText: "",
			name: "",
			limitTime: "",
			hasAdvice: false,
		},
		fields: [
			{
				pdfText: "Leitura da bíblia",
				name: "",
				time: "",
				advice: "",
				placeholder: "Nome do leitor",
				limitTime: "4",
			},
		],
	},
	christianLife: {
		templates: {
			time: "",
			name: "",
			limitTime: "",
		},
		fields: [],
	},
};
