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
		templates: {
			video: {
				pdfText: "Vídeo da primeira conversa",
				time: "",
				name: "",
			},
			firstMeeting: {
				pdfText: "Primeira conversa",
				placeholder: "Nome do estudante",
				name: "",
				time: "",
				advice: "",
			},
			secondMeeting: {
				pdfText: "Revisita",
				placeholder: "Nome do estudante",
				name: "",
				time: "",
				advice: "",
			},
			bibleStudy: {
				pdfText: "Estudo bíblico",
				placeholder: "Nome do estudante",
				name: "",
				time: "",
				advice: "",
			},
		},
		fields: [
			{
				pdfText: "Leitura da bíblia",
				placeholder: "Nome do estudante",
				name: "",
				time: "",
				advice: "",
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
