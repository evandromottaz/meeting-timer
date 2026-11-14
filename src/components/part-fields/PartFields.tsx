import { Trash } from "@phosphor-icons/react";
import { useFormContext } from "react-hook-form";
import { FormValuesProps } from "../../types/meetingSchedule";
import "./part-fields.css";

type PartFieldsProps = {
	name: `ministryField.fields.${number}` | `christianLife.fields.${number}`;
	onRemove: () => void;
	required?: boolean;
};

export default function PartFields({ name, onRemove, required }: PartFieldsProps) {
	const { register } = useFormContext<FormValuesProps>();

	return (
		<div className="part-fields border-top pt-3">
			<label className="form-label mb-0">
				Nome da parte
				<input className="form-control" required={required} {...register(`${name}.pdfText`)} />
			</label>
			<label className="form-label mb-0">
				Minutos
				<input
					className="form-control"
					type="number"
					step="any"
					required={required}
					{...register(`${name}.limitTime`)}
				/>
			</label>
			<button type="button" className="btn btn-danger" aria-label="Excluir parte" onClick={onRemove}>
				<Trash size={20} aria-hidden="true" />
			</button>
		</div>
	);
}
