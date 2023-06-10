type time = { time: string };
type name = { name: string };
type placeholder = { placeholder: string };
type advice = { advice: string };

type valuesTypes = time & name;
type treasuresTypes = valuesTypes & placeholder;
type ministryFieldTypes = valuesTypes & advice;

export interface FormValues {
	president: "";
	initialComments: "";
	treasures: treasuresTypes[];
	ministryField: ministryFieldTypes[];
	christianLife: valuesTypes[];
	bibleStudy: valuesTypes;
	finalComments: "";
}
