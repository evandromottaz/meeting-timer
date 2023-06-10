import { useFieldArray, useFormContext } from "react-hook-form";
import { FormValues } from "../types/meetingSchedule";
import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";

const Treasures = () => {
	const { control, watch } = useFormContext<FormValues>();
	const { fields } = useFieldArray({
		control,
		name: `treasures` as const,
	});

	return (
		<Fieldset title="Tesouros da Palavra de Deus">
			{fields.map(({ placeholder, id }, i) => {
				return (
					<section key={id} className="row">
						<InputTimer
							name={`treasures.${i}.name`}
							timeName={watch(`treasures.${i}.time`)}
							placeholder={placeholder}
						/>
						<Timer name={`treasures.${i}.time`} />
					</section>
				);
			})}
		</Fieldset>
	);
};

export default Treasures;
