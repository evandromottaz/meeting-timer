export type placeholderType = { placeholder: string };
export type pdfTextType = { pdfText: string };
export type nameType = { name: string };
export type timeType = { time: string };

interface FormValueProps extends placeholderType, nameType, timeType {}

interface PresidentProps extends pdfTextType, nameType {}

interface CommentsProps extends pdfTextType, nameType, timeType {}

interface ChristianLifeProps extends FormValueProps {}

interface BibleStudyProps extends FormValueProps {}

interface TreasuresProps {
	primary: FormValueProps & pdfTextType;
	secondary: FormValueProps & pdfTextType;
}

interface MinistryFieldProps extends FormValueProps, pdfTextType {}

export interface FormValuesProps {
	president: PresidentProps;
	initialComments: CommentsProps;
	treasures: TreasuresProps;
	ministryField: [MinistryFieldProps];
	christianLife: ChristianLifeProps[];
	bibleStudy: BibleStudyProps;
	finalComments: CommentsProps;
}
