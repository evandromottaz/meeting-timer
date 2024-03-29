export type placeholderType = { placeholder?: string };
export type pdfTextType = { pdfText?: string };
export type nameType = { name: string };
export type timeType = { time: string };
export type adviceType = { advice?: string };
export type limitTimeType = { limitTime?: string };

type commonInputType = pdfTextType & timeType & nameType;

interface FormValueProps extends placeholderType, nameType, timeType {}

export interface MeetingProps {
	start: pdfTextType & timeType;
	end: pdfTextType & timeType;
}

interface PresidentProps extends pdfTextType, nameType {}

interface CommentsProps {
	initial: pdfTextType & timeType & limitTimeType;
	end: pdfTextType & timeType & limitTimeType;
}

interface TreasuresProps {
	treasure: commonInputType & limitTimeType;
	findTreasures: commonInputType & limitTimeType;
}

export interface MinistryFieldProps {
	template: {
		pdfText: string;
		name: string;
		limitTime: string;
		hasAdvice: boolean;
	};
	fields: (nameType &
		timeType &
		pdfTextType &
		adviceType &
		placeholderType &
		limitTimeType)[];
}

interface ChristianLifeProps {
	templates: nameType & timeType & limitTimeType;
	fields: (FormValueProps & limitTimeType & pdfTextType & limitTimeType)[];
}

export interface FormValuesProps {
	meeting: MeetingProps;
	president: PresidentProps;
	comments: CommentsProps;
	treasures: TreasuresProps;
	ministryField: MinistryFieldProps;
	christianLife: ChristianLifeProps;
}
