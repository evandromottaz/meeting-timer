import { isFirstIndex } from "../utils/validations";
import { ministryField } from "../constants/schedule";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormValues } from "../types/meetingSchedule";
import Button from "../components/button/Button";
import { Fragment } from "react";
import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";
import HeadingTimer from "../components/heading/Heading";

const MinistryField = () => {
	const { control, watch } = useFormContext<FormValues>();
	const { fields, insert, remove } = useFieldArray({
		control,
		name: `ministryField` as const,
	});

	return (
		<Fieldset title="Faça seu melhor no ministério">
			{fields.map(({ id }, i) => {
				const adviceWatched = watch(`ministryField.${i}.advice`);

				return (
					<Fragment key={id}>
						<section className="row">
							<InputTimer
								name={`ministryField.${i}.name`}
								timeName={watch(`ministryField.${i}.time`)}
								placeholder="Nome"
							/>
							<Timer name={`ministryField.${i}.time`} />
						</section>

						<HeadingTimer
							type="advice"
							timeName={adviceWatched}
							name={`ministryField.${i}.advice`}
						>
							Conselho
						</HeadingTimer>

						<section className="row">
							<Button
								onClick={() =>
									insert(i + 1, ministryField, {
										shouldFocus: false,
									})
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
