import { useFieldArray, useFormContext } from "react-hook-form";
import { FormValuesProps } from "../types/meetingSchedule";
import Button from "../components/button/Button";
import { Fragment } from "react";
import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";
import HeadingTimer from "../components/heading/Heading";
import ModalTemplate from "../components/modal-template/ModalTemplate";

const MinistryField = () => {
	const { control, getValues, setValue } = useFormContext<FormValuesProps>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "ministryField.fields",
	});

	function addSection() {
		const { hasAdvice, limitTime, pdfText, name } = getValues(
			"ministryField.template"
		);
		const advice = hasAdvice ? { advice: "" } : {};

		append({
			time: "",
			name,
			pdfText: `${pdfText} (${limitTime}min)`,
			...advice,
		});

		setValue("ministryField.template", {
			hasAdvice: true,
			name: "",
			limitTime: "",
			pdfText: "",
		});
	}

	return (
		<Fieldset title="Faça seu melhor no ministério">
			{fields.map((item, i) => {
				const { id, pdfText, advice, time, name = "", placeholder = "Nome" } = item;

				return (
					<Fragment key={id}>
						<h3 className="heading border-top pt-3">{pdfText}</h3>

						<section className="d-flex align-items-center">
							<InputTimer
								defaultValue={name}
								name={`ministryField.fields[${i}].name`}
								placeholder={placeholder}
								disabled={advice === undefined}
								timerName={`ministryField.fields[${i}].time`}
							/>
							<Timer name={`ministryField.fields[${i}].time`} defaultTime={time} />
						</section>

						{typeof advice === "string" && (
							<HeadingTimer type="advice" name={`ministryField.fields[${i}].advice`}>
								Conselho
							</HeadingTimer>
						)}

						{i > 0 && (
							<Button
								type="button"
								onClick={() => remove(i)}
								className="btn btn-danger"
							>
								Remover
							</Button>
						)}
					</Fragment>
				);
			})}

			<ModalTemplate addSection={addSection} />
		</Fieldset>
	);
};

export default MinistryField;
