import { isFirstIndex } from "../utils/validations";
import { ministryField } from "../constants/schedule";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormValues } from "../types/meetingSchedule";
import Button from "../components/button/Button";
import { Fragment } from "react";
import Input from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";

const MinistryField = () => {
	const { register, control } = useFormContext<FormValues>();
	const { fields, insert, remove } = useFieldArray({
		control,
		name: `ministryField` as const,
	});

	return (
		<Fieldset title="Faça seu melhor no ministério">
			{fields.map(({ id }, i) => {
				return (
					<Fragment key={id}>
						<section className="row">
							<Input
								name={`ministryField.${i}.name`}
								placeholder="Nome"
							/>
						</section>

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
