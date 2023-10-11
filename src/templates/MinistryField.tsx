import { meetingSchedule } from "../constants/schedule";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormValuesProps } from "../types/meetingSchedule";
import Button from "../components/button/Button";
import { Fragment } from "react";
import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";
import HeadingTimer from "../components/heading/Heading";
import ModalTemplate from "../components/modal-template/ModalTemplate";

const templates = Object.values(meetingSchedule.ministryField.templates)

const MinistryField = () => {
	const { control } = useFormContext<FormValuesProps>();
	const { fields, append,  remove } = useFieldArray({
		control,
		name: "ministryField.fields",
	});

	function chooseTemplate(selectIndex: number ) {
		append(templates[selectIndex]);
	}

	return (
		<Fieldset title="Faça seu melhor no ministério">
			{fields.map((item, i) => {
				const { id, placeholder, pdfText,advice } = item;

				return (
					<Fragment key={id}>
						<h3 className="heading border-top pt-3">{pdfText}</h3>

						<section className="d-flex align-items-center">
							<InputTimer
								name={`ministryField.fields[${i}].name`}
								placeholder={placeholder}
								disabled={advice === undefined}
								timerName={`ministryField.fields[${i}].time`}
							/>
							<Timer name={`ministryField.fields[${i}].time`} />
						</section>

						{advice !== undefined && 
							<HeadingTimer
								type="advice"
								name={`ministryField.fields[${i}].advice`}
							>
								Conselho
							</HeadingTimer>}

						{i > 0 && <Button 
							type="button" 
							onClick={() => remove(i)}
							className="btn btn-danger"
						>
							Remover
						</Button>}
					</Fragment>
				);
			})}

			<ModalTemplate chooseTemplate={chooseTemplate} />
		</Fieldset>
	);
};

export default MinistryField;
