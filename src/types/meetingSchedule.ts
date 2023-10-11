export type placeholderType = { placeholder?: string };
export type pdfTextType = { pdfText?: string };
export type nameType = { name: string };
export type timeType = { time: string };
export type adviceType = { advice?: string }
export type limitTimeType = { limitTime?: string }

type commonInputType = pdfTextType & timeType & nameType
type studiesType = commonInputType & placeholderType & adviceType

interface FormValueProps extends placeholderType, nameType, timeType { }

export interface MeetingProps {
	start: pdfTextType & timeType;
	end: pdfTextType & timeType
}

interface PresidentProps extends pdfTextType, nameType { }

interface CommentsProps {
	initial: pdfTextType & timeType,
	end: pdfTextType & timeType,
}

interface TreasuresProps {
	treasure: commonInputType;
	findTreasures: commonInputType;
}

export interface MinistryFieldProps {
	templates: {
		video: commonInputType
		firstMeeting: studiesType
		secondMeeting: studiesType
		bibleStudy: studiesType
	};
	fields: (FormValueProps & pdfTextType & adviceType)[]
}

interface ChristianLifeProps {
	templates: nameType & timeType,
	fields: (FormValueProps & limitTimeType & pdfTextType)[]
}

export interface FormValuesProps {
	meeting: MeetingProps;
	president: PresidentProps;
	comments: CommentsProps
	treasures: TreasuresProps;
	ministryField: MinistryFieldProps;
	christianLife: ChristianLifeProps;
}
