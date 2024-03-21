import {
	FormValuesProps,
	limitTimeType,
	pdfTextType,
} from "../types/meetingSchedule";
import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "../components/button/Button";
import { Fragment } from "react";
import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";
import ModalChristianLife from "../components/modal-template/ModalChristianLife";

const ChristianLife = () => {
	const { control } = useFormContext<FormValuesProps>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "christianLife.fields",
	});

	function chooseTemplate(options: limitTimeType & pdfTextType) {
		const { limitTime = "30", pdfText = "Estudo Bíblico" } = options;
		append({
			time: "",
			name: "",
			placeholder: "Nome do orador",
			limitTime,
			pdfText,
		});
	}

	return (
		<Fieldset title="Nossa Vida Cristã">
			{fields.map((item, i) => {
				const { id, placeholder, pdfText, limitTime, time } = item;

				return (
					<Fragment key={id}>
						<h3 className="heading border-top pt-3">
							{pdfText} - ({limitTime}min)
						</h3>

						<section className="d-flex align-items-center">
							<InputTimer
								name={`christianLife.fields[${i}].name`}
								placeholder={placeholder}
								timerName={`christianLife.fields[${i}].time`}
							/>
							<Timer name={`christianLife.fields[${i}].time`} defaultTime={time} />
						</section>

						<Button
							type="button"
							onClick={() => remove(i)}
							className="btn btn-danger"
						>
							Remover
						</Button>
					</Fragment>
				);
			})}

			<ModalChristianLife chooseTemplate={chooseTemplate} />
		</Fieldset>
	);
};

export default ChristianLife;
