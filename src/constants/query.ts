export const QUERY = {
	MEETING: {
		START: "meeting.start.time",
		END: "meeting.end.time",
	},
	PRESIDENT: "president.name",
	COMMENTS: {
		INITIAL: "comments.initial.time",
		END: "comments.end.time",
	},
	TREASURES: {
		TREASURE: {
			NAME: "treasures.treasure.name",
			TIME: "treasures.treasure.time",
		},
		FIND_TREASURES: {
			NAME: "treasures.findTreasures.name",
			TIME: "treasures.findTreasures.time",
		},
	},
	MINISTRY_FIELD: {
		BIBLE_READ: {
			NAME: "ministryField.bibleRead.name",
			TIME: "ministryField.bibleRead.time",
			ADVICE: "ministryField.bibleRead.advice.time",
		},
		STUDIES: {
			NAME: (index: number) => `ministryField.study.${index}.name`,
			TIME: (index: number) => `ministryField.study.${index}.time`,
			ADVICE: (index: number) => `ministryField.study.${index}.advice`,
		},
	},
	CHRISTIAN_LIFE: {
		NAME: (index: number) => `christianLife.${index}.name`,
		TIME: (index: number) => `christianLife.${index}.time`,
	},
};
