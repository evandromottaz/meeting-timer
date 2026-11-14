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
import PartFields from "../components/part-fields/PartFields";
import { meetingSections } from "../constants/meetingSections";

const ChristianLife = ({ updated }: { updated: boolean }) => {
	const { control, watch } = useFormContext<FormValuesProps>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "christianLife.fields",
	});

	function chooseTemplate(options: limitTimeType & pdfTextType) {
		const { limitTime = "30", pdfText = "Estudo Bíblico" } = options;
		append({ time: "", name: "", placeholder: "Nome do orador", limitTime, pdfText });
	}

	function addInlinePart() {
		append(
			{ time: "", name: "", limitTime: "", pdfText: "" },
			{ focusName: `christianLife.fields.${fields.length}.pdfText` }
		);
	}

	return (
		<Fieldset title={updated ? meetingSections.christianLife : "Nossa Vida Cristã"}>
			{fields.map((item, i) => {
				const { id, placeholder, time } = item;
				const partName = `christianLife.fields.${i}` as const;

				return (
					<Fragment key={id}>
						{updated ? (
							<PartFields name={partName} onRemove={() => remove(i)} required />
						) : (
							<h3 className="heading border-top pt-3">
								{watch(`${partName}.pdfText`)} - ({watch(`${partName}.limitTime`)}min)
							</h3>
						)}

						<section className="d-flex align-items-center">
							<InputTimer
								name={`${partName}.name`}
								placeholder={updated ? "Nome" : placeholder ?? "Nome do orador"}
								aria-label={updated ? "Nome" : undefined}
								timerName={`${partName}.time`}
							/>
							<Timer name={`${partName}.time`} defaultTime={time} />
						</section>

						{!updated && (
							<Button type="button" onClick={() => remove(i)} className="btn btn-danger">
								Remover
							</Button>
						)}
					</Fragment>
				);
			})}

			{updated ? (
				<Button className="btn btn-section" onClick={addInlinePart}>Adicionar parte</Button>
			) : (
				<ModalChristianLife chooseTemplate={chooseTemplate} />
			)}
		</Fieldset>
	);
};

export default ChristianLife;
