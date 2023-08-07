import { isFirstIndex } from "../utils/validations";
import { meetingSchedule } from "../constants/schedule";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormValuesProps } from "../types/meetingSchedule";
import Button from "../components/button/Button";
import { Fragment, useState } from "react";
import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";
import HeadingTimer from "../components/heading/Heading";
import { QUERY } from "../constants/query";
import ModalTemplate from "../components/modal-template/ModalTemplate";

const MinistryField = () => {
	const { control } = useFormContext<FormValuesProps>();
	const { fields, insert, remove } = useFieldArray({
		control,
		name: `ministryField` as const,
	});
	const [template, setTemplate] = useState(null);

	function chooseTemplate({ target }) {
		console.dir(target);
		// insert(1, meetingSchedule.ministryFields.fields, {
		// 	shouldFocus: false,
		// });
	}

	return (
		<Fieldset title={meetingSchedule.ministryFields.title}>
			<section className="row">
				<InputTimer
					name={QUERY.MINISTRY_FIELD.BIBLE_READ.NAME}
					placeholder={
						meetingSchedule.ministryFields.bibleRead.placeholder
					}
					timerName={QUERY.MINISTRY_FIELD.BIBLE_READ.TIME}
				/>
				<Timer name={QUERY.MINISTRY_FIELD.BIBLE_READ.TIME} />
			</section>

			<HeadingTimer
				type="advice"
				name={QUERY.MINISTRY_FIELD.BIBLE_READ.ADVICE}
			>
				{meetingSchedule.ministryFields.bibleRead.advice.placeholder}
			</HeadingTimer>

			<ModalTemplate onChange={chooseTemplate} />

			{fields.map(({ id }, i) => {
				return (
					<Fragment key={id}>
						<section
							className={`row ${
								!isFirstIndex(i) ? "row--border" : ""
							}`}
						></section>

						<section className="row">
							<Button
								onClick={() =>
									insert(
										i + 1,
										meetingSchedule.ministryFields.fields,
										{
											shouldFocus: false,
										}
									)
								}
							>
								Adicionar
							</Button>

							{!isFirstIndex(i) && (
								<Button type="button" onClick={() => remove(i)}>
									Remover
								</Button>
							)}
						</section>
					</Fragment>
				);
			})}
		</Fieldset>
	);
};

export default MinistryField;
