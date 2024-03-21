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
		},
		end: {
			pdfText: "Comentários Finais",
			time: "",
		},
	},
	treasures: {
		treasure: {
			pdfText: "Orador",
			name: "",
			time: "",
		},
		findTreasures: {
			pdfText: "Encontre Joias Espirituais",
			name: "",
			time: "",
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
			},
		],
	},
	christianLife: {
		templates: {
			time: "",
			name: "",
		},
		fields: [],
	},
};
