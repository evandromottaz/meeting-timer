import {
	FormValueType as FormValue,
	FormValuesProps,
} from "../types/meetingSchedule";

const name = { name: "" };
const time = { time: "" };
const advice = { advice: "" };
export const values = { ...name, ...time };
export const ministryField = { ...values, ...advice, placeholder: "" };

type KeyofValues = keyof FormValuesProps;
const KEYS: [KeyofValues, FormValue][] = [
	["president", { pdfText: "Presidente", placeholder: "Nome", ...name }],
	["initialComments", { pdfText: "Comentários Iniciais", ...values }],
	[
		"treasures",
		{
			primary: {
				pdfText: "Tesouros da Palavra de Deus",
				placeholder: "Orador",
				...values,
			},
			secondary: {
				pdfText: "Encontre Joias Espirituais",
				placeholder: "Dirigente",
				...values,
			},
		},
	],
	[
		"ministryField",
		{
			pdfText: "Faça seu melhor no ministério",
			fields: [{ ...ministryField }],
		},
	],
	["bibleStudy", { pdfText: "Estudo Bíblico", ...values }],
	["finalComments", { pdfText: "Comentários Finais", ...values }],
];

export function CreateMeetings() {
	const map = new Map(KEYS);

	return {
		getKey: (key: KeyofValues) => map.get(key),
		setValue: (key: KeyofValues, value: FormValue) => map.set(key, value),
		hasKey: (key: KeyofValues) => map.has(key),
	};
}
