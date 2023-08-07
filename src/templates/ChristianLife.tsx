import { FormValuesProps } from "../types/meetingSchedule";
import { isFirstIndex } from "../utils/validations";
import { meetingSchedule } from "../constants/schedule";
import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "../components/button/Button";
import { Fragment } from "react";
import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";
import { QUERY } from "../constants/query";

const { christianLife } = meetingSchedule;

const ChristianLife = () => {
	const { control } = useFormContext<FormValuesProps>();
	const { fields, insert, remove } = useFieldArray({
		control,
		name: `christianLife` as const,
	});

	return (
		<Fieldset title={christianLife.title}>
			{fields.map(({ id }, i) => (
				<Fragment key={id}>
					<section
						className={`row ${
							!isFirstIndex(i) ? "row--border" : ""
						}`}
					>
						<InputTimer
							name={QUERY.CHRISTIAN_LIFE.NAME(i)}
							timerName={QUERY.CHRISTIAN_LIFE.TIME(i)}
							placeholder={christianLife.placeholder}
						/>
						<Timer name={QUERY.CHRISTIAN_LIFE.TIME(i)} />
					</section>

					<section className="row">
						<Button
							style={{
								...christianLife.addButton.style,
							}}
							onClick={() =>
								insert(i + 1, values, {
									shouldFocus: false,
								})
							}
						>
							{christianLife.addButton.placeholder}
						</Button>

						{!isFirstIndex(i) && (
							<Button
								style={{
									...christianLife.addButton.style,
								}}
								onClick={() => remove(i)}
							>
								{christianLife.removeButton.placeholder}
							</Button>
						)}
					</section>
				</Fragment>
			))}
		</Fieldset>
	);
};

export default ChristianLife;
