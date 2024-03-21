import { XCircle } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import "./modal-template.css";
import { useFormContext } from "react-hook-form";
import { FormValuesProps } from "../../types/meetingSchedule";

interface ModalChristianLifeProps {
	addSection: () => void;
}

const ModalTemplate = ({ addSection }: ModalChristianLifeProps) => {
	const { register } = useFormContext<FormValuesProps>();

	return (
		<Dialog.Root>
			<Dialog.Trigger
				className="btn btn-success button"
				style={{ fontWeight: "bold" }}
			>
				Adicionar parte
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="dialog__overlay" />

				<Dialog.Content className="dialog__content">
					<Dialog.Title className="heading p-0 mb-4">Configure a parte</Dialog.Title>

					<div>
						<input
							{...register("ministryField.template.pdfText")}
							className="form-control text-dark border-0 ps-3 mt-3 fs-5"
							placeholder="Nome da parte"
						/>

						<input
							{...register("ministryField.template.name")}
							className="form-control text-dark border-0 ps-3 mt-3 fs-5"
							placeholder="Nome do estudante"
						/>

						<input
							{...register("ministryField.template.limitTime")}
							className="form-control border-0 ps-3 mt-3 text-dark fs-5 "
							type="number"
							placeholder="Tempo da parte"
						/>

						<label className="text-white mt-3 fs-5">
							<input
								{...register("ministryField.template.hasAdvice")}
								defaultChecked={true}
								type="checkbox"
							/>{" "}
							Tem conselho?
						</label>
					</div>

					<Dialog.Close className="btn btn-success mt-5 button" onClick={addSection}>
						Adicionar
					</Dialog.Close>

					<Dialog.Close
						className="btn position-absolute p-0"
						style={{ top: "-15px", right: "-15px" }}
					>
						<XCircle size={32} color="#ffffff" />
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default ModalTemplate;
