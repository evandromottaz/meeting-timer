import { FormValues } from "../types/meetingSchedule";
import { isFirstIndex } from "../utils/validations";
import { values } from "../constants/schedule";
import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "../components/button/Button";
import { Fragment } from "react";
import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";

const ChristianLife = () => {
	const { control, watch } = useFormContext<FormValues>();
	const { fields, insert, remove } = useFieldArray({
		control,
		name: `christianLife` as const,
	});

	return (
		<Fieldset title="Nossa Vida Cristã">
			{fields.map(({ id }, i) => {
				return (
					<Fragment key={id}>
						<section
							className={`row ${
								!isFirstIndex(i) ? "row--border" : ""
							}`}
						>
							<InputTimer
								timeName={watch(`christianLife.${i}.time`)}
								name={`christianLife.${i}.name`}
								placeholder="Nome"
							/>
							<Timer name={`christianLife.${i}.time`} />
						</section>

						<section className="row">
							<Button
								style={{ flex: 1 }}
								onClick={() =>
									insert(i + 1, values, {
										shouldFocus: false,
									})
								}
							>
								Adicionar
							</Button>

							{!isFirstIndex(i) && (
								<Button
									style={{ flex: 1 }}
									onClick={() => remove(i)}
								>
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

export default ChristianLife;
