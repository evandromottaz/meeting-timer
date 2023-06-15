type placeholderType = { placeholder: string };
type pdfTextType = { pdfText: string };
type nameType = { name: string };
type timeType = { time: string };

interface FormValueProps extends placeholderType, nameType, timeType {}

interface PresidentProps extends pdfTextType, nameType, placeholderType {}

interface CommentsProps extends pdfTextType, nameType, timeType {}

interface ChristianLifeProps extends FormValueProps {}

interface BibleStudyProps extends FormValueProps {}

interface TreasuresProps {
	primary: FormValueProps & pdfTextType;
	secondary: FormValueProps & pdfTextType;
}

interface MinistryFieldProps extends pdfTextType {
	fields: [FormValueProps];
}

export interface FormValuesProps {
	president: PresidentProps;
	initialComments: CommentsProps;
	treasures: TreasuresProps;
	ministryField: MinistryFieldProps;
	christianLife: ChristianLifeProps[];
	bibleStudy: BibleStudyProps;
	finalComments: CommentsProps;
}

export type FormValueType =
	| FormValueProps
	| TreasuresProps
	| MinistryFieldProps
	| FormValueProps[]
	| PresidentProps
	| CommentsProps;
