import { useFieldArray, useFormContext } from "react-hook-form";
import { FormValuesProps } from "../types/meetingSchedule";
import Button from "../components/button/Button";
import { Fragment } from "react";
import Input, { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";
import HeadingTimer from "../components/heading/Heading";
import ModalTemplate from "../components/modal-template/ModalTemplate";
import PartFields from "../components/part-fields/PartFields";
import { meetingSections } from "../constants/meetingSections";

const MinistryField = ({ updated }: { updated: boolean }) => {
	const { control, getValues, setValue, watch } = useFormContext<FormValuesProps>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "ministryField.fields",
	});

	function addInlinePart() {
		append(
			{ time: "", name: "", pdfText: "", limitTime: "" },
			{ focusName: `ministryField.fields.${fields.length}.pdfText` }
		);
	}

	function addLegacyPart() {
		const { hasAdvice, limitTime, pdfText, name } = getValues("ministryField.template");
		const advice = hasAdvice ? { advice: "" } : {};

		append({
			time: "",
			name,
			pdfText,
			limitTime,
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
		<Fieldset title={updated ? meetingSections.ministry : "Faça seu melhor no ministério"}>
			{fields.map((item, i) => {
				const { id, time, name = "", placeholder } = item;
				const partName = `ministryField.fields.${i}` as const;
				const adviceName = `${partName}.advice` as const;
				const hasAdvice = updated || typeof watch(adviceName) === "string";
				const inline = updated && i > 0;

				return (
					<Fragment key={id}>
						{inline ? (
							<PartFields name={partName} onRemove={() => remove(i)} />
						) : (
							<h3 className="heading border-top pt-3">{watch(`${partName}.pdfText`)}</h3>
						)}

						<section className="d-flex align-items-center">
							<InputTimer
								defaultValue={updated ? undefined : name}
								name={`${partName}.name`}
								placeholder={placeholder ?? (updated ? "Nome do estudante" : "Nome")}
								aria-label={updated ? placeholder ?? "Nome do estudante" : undefined}
								disabled={!updated && !hasAdvice}
								required={!updated}
								timerName={`${partName}.time`}
							/>
							<Timer name={`${partName}.time`} defaultTime={time} />
						</section>

						{inline && (
							<Input
								name={`${partName}.assistantName`}
								aria-label="Nome do ajudante"
								placeholder="Nome do ajudante"
								required={false}
							/>
					)}

						{hasAdvice && (
							<HeadingTimer type="advice" name={adviceName} recordZero={!updated}>
								Conselho
							</HeadingTimer>
						)}

						{!updated && i > 0 && (
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

			{updated ? (
				<Button className="btn btn-section" onClick={addInlinePart}>Adicionar parte</Button>
			) : (
				<ModalTemplate addSection={addLegacyPart} />
			)}
		</Fieldset>
	);
};

export default MinistryField;
